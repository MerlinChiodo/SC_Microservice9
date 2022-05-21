import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import { Text } from '@mantine/core';

export default function Custom404() {
  const router = useRouter();
  const [pageName, setPageName] = useState('');
  useEffect(() => setPageName(router.asPath.charAt(1).toUpperCase() + router.asPath.slice(2)));
  return (
    <Layout>
      <Text align="center" weight={700} size="xl" color="dimmed">{pageName}</Text>
      <Text align="center" weight={700} size="xl" color="dimmed">
        404 - Page Not Found
      </Text>
    </Layout>
  );
}
