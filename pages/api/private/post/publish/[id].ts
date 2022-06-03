import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { notAuthenticated, customError, notFound, success } from 'util/api/util';
import { eventHandler } from 'util/rabbitmq';
import auth from 'lib/auth';

const eventData = {
  event_id: 9004,
  event_name: 'newServicePost',
  service_name: 'integration',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(await auth(req.cookies.token))) return notAuthenticated(res);
  const postId = req.query.id as string | undefined;

  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    select: { title: true, short_description: true, long_description: true, picture_url: true },
  });
  if (post) {
    await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true, published_at: new Date().toISOString() },
    });

    const error = eventHandler({ ...eventData, ...post });
    if (error) return customError(res, error.code, error.message);
    return success(res);
  }
  return notFound(res);
}
