import Link from 'next/link';
import Layout from 'components/layout/employee';
import { useAuthEmployee } from 'context/auth/employee';
import { Button, Center, Text, Title, Space } from '@mantine/core';

export default function page() {
  const auth = useAuthEmployee();

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
  return (
    <Layout>
      <Center mt="xl">
        <Title>Hi {auth.user.firstname}!</Title>
      </Center>
    </Layout>
  );
}
