import Link from 'next/link';
import Layout from 'components/layout';
import { Button, Center, Group } from '@mantine/core';

export default function Registration() {
  return (
    <Layout>
      <Center>
        <h1>Registration</h1>
      </Center>
      <Center m="xl" p="xl">
        <Group>
          <Link href="registration/refugee">
            <Button variant="outline">Single</Button>
          </Link>
          <Link href="registration/family">
            <Button variant="outline">Family</Button>
          </Link>
        </Group>
      </Center>
    </Layout>
  );
}
