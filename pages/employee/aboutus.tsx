import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Center, Container, Space, Title, Text, TextInput, Textarea } from '@mantine/core';
import { fetchPostJSON } from 'util/api/fetch';
import Link from 'next/link';
import Layout from 'components/layout/employee';
import { useAuthEmployee } from 'context/auth/employee';

const handleDelete = async () => {
  await fetchPostJSON('/api/private/aboutus/delete', { date: new Date().toISOString() }).catch();
  const button = document.getElementById('delete') as HTMLInputElement | null;
  if (button) button.disabled = true;
};

export default function page() {
  const auth = useAuthEmployee();
  const [error, setError] = useState(false);
  const form = useForm({
    initialValues: { about_us: '', picture: '' },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
      await fetchPostJSON('/api/private/aboutus/publish', {
        ...data,
        date: new Date().toISOString(),
        url: window.location.origin,
      });
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
        <Title align="center">About Us</Title>
        <Container sx={{ width: '800px' }}>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Textarea
              m="sm"
              label="Text"
              {...form.getInputProps('about_us')}
              minRows={10}
              required
            />
            <TextInput m="sm" label="Picture" {...form.getInputProps('picture')} />
            <Button m="sm" type="submit">
              Submit
            </Button>
          </form>
          <Space mt={100} />
          <Button m="sm" id="delete" color="red" onClick={() => handleDelete()}>
            Delete Service
          </Button>
        </Container>
      </Layout>
    );
  }
}
