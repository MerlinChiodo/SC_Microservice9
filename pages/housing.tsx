import Layout from 'components/layout';
import { useAuth } from 'context/auth';
import { Space, Text } from '@mantine/core';

export default function Housing() {
  const auth = useAuth();

  return (
    <Layout>
      {auth.user ? (
        <h1>Housing</h1>
      ) : (
        <>
          <Text align="center" weight={700} size="xl" color="dimmed">403 - Forbidden</Text>
          <Space h="md" />
          <Text align="center" weight={700} size="xl" color="dimmed">Please Login</Text>
        </>
      )}
    </Layout>
  );
}
