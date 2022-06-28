import type { NextApiRequest, NextApiResponse } from 'next';
import type { Post } from 'util/interfaces/events';
import { prisma } from 'lib/prisma';
import { badRequest, notAuthenticated, customError, notFound, success } from 'util/api/util';
import { eventHandler } from 'util/rabbitmq';
import auth from 'lib/auth/employee';

const eventData = {
  event_id: 9004,
  event_name: 'newServicePost',
  service: 'integration',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token_employee))) return notAuthenticated(res);
  const postId = Number(req.query.id) as number;
  if (postId === Number.NaN) return badRequest(res);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { title: true, short_description: true, long_description: true, picture_url: true },
  });
  if (post) {
    await prisma.post.update({
      where: { id: postId },
      data: { published: true, published_at: new Date().toISOString() },
    });

    const event: Post = { ...eventData, ...post };
    if (post.picture_url === null) {
      delete event.picture_url;
    }
    const error = eventHandler(event);
    if (error) return customError(res, error.code, error.message);
    return success(res);
  }
  return notFound(res);
}
