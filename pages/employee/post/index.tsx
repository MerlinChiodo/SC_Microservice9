import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Center, Container, Space, Title, Text, TextInput, Textarea } from '@mantine/core';
import { fetchPostJSON } from 'util/api/fetch';
import Layout from 'components/layout/employee';
import Link from 'next/link';
import { useAuthEmployee } from 'context/auth/employee';

export default function page() {
  const auth = useAuthEmployee();
  const [error, setError] = useState(false);
  const form = useForm({
    initialValues: { title: '', short_description: '', long_description: '', picture_url: '' },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
      await fetchPostJSON('/api/private/post', { ...data, employee_id: 1 });
      form.reset();
    } catch (e) {
      setError(true);
    }
  };

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

  if (error) {
    return <Text>Error occured. Please contact the IT Support Team</Text>;
  } else {
    return (
      <Layout>
        <Title align="center">New Post</Title>
        <Container sx={{width: '800px'}}>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput m="sm" label="Title" {...form.getInputProps('title')} required />
            <TextInput
              m="sm"
              label="Description"
              {...form.getInputProps('short_description')}
              required
            />
            <Textarea
              m="sm"
              label="Text"
              {...form.getInputProps('long_description')}
              minRows={10}
              required
            />
            <TextInput m="sm" label="Picture" {...form.getInputProps('picture_url')} />
            <Button m="sm" type="submit">
              Create
            </Button>
          </form>
        </Container>
      </Layout>
    );
  }
}
