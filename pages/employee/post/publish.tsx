import type { Post } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Avatar, Button, Center, Group, Text, Space, Stack } from '@mantine/core';
import { fetchGetJSON, fetchPostJSON } from 'util/api/fetch';
import Layout from 'components/layout/employee';
import { useAuthEmployee } from 'context/auth/employee';
import Link from 'next/link';

const handlePublish = async (id: number) => {
  try {
    await fetchPostJSON(`/api/private/post/publish/${id}`);
    const button = document.getElementById(String(id)) as HTMLInputElement | null;
    if (button) button.disabled = true;
  } catch (e) {
    return;
  }
};

export default function page() {
  const auth = useAuthEmployee();
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetchGetJSON('/api/private/post/drafts')
      .then((data: Post[]) => setPosts(data))
      .catch();
  }, [setPosts]);

  if (!auth.user) {
    return (
      <Layout>
        <Text align="center" weight={700} size="xl" color="dimmed">
          403 - Forbidden
        </Text>
        <Space h="md" />
        <Text align="center" weight={700} size="xl" color="dimmed">
          Please Login
        </Text>
        <Center>
          <Link href="/employee/login">
            <Button mt="xl">Sign in</Button>
          </Link>
        </Center>
      </Layout>
    );
  }

  const items = posts.map((p: Post) => (
    <Group noWrap key={p.id}>
      <Avatar />
      <div style={{ flex: 1 }}>
        <Text size="sm" weight={500}>
          {p.title}
        </Text>
        <Text size="xs" color="dimmed" weight={400}>
          {p.short_description}
        </Text>
      </div>
      <Button id={String(p.id)} onClick={() => handlePublish(p.id)}>
        Post
      </Button>
    </Group>
  ));

  return (
    <Layout>
      <Center>
        <Stack sx={{ width: '800px' }}>{items}</Stack>
      </Center>
    </Layout>
  );
}
