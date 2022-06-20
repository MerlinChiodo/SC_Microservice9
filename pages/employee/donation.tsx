import useSWR from 'swr';
import Layout from 'components/layout/employee';
import { Box, Center, Badge, Group, Loader, SimpleGrid, Text, Title } from '@mantine/core';
import { fetcher } from 'util/api/fetch';
import { formatAmountFromStripe } from 'util/stripe';
import { Check } from 'tabler-icons-react';

const CURRENCY = 'eur';

export default function page() {
  const { data, error } = useSWR('/api/private/donation', fetcher);

  if (error)
    return (
      <Layout>
        <Text color="dimmed">Error occured.</Text>
      </Layout>
    );
  if (!data)
    return (
      <Layout>
        <Center>
          <Loader variant="dots" />
        </Center>
      </Layout>
    );

  const items = data.data.map((d: any) => (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })}
    >
      <Group position="apart" grow sx={{ minWidth: '600px' }}>
        <Text size="md" color="dimmed" weight={600}>
          {formatAmountFromStripe(d.amount, CURRENCY)},00 &euro;
        </Text>
        <Text size="md" color={d.billing_details.name ? 'black' : 'dimmed'}>
          {d.billing_details.name ? d.billing_details.name : 'Anonymous'}
        </Text>
        <Badge
          size="md"
          sx={{maxWidth: '100px'}}
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          rightSection={
            <div style={{ marginTop: '3px' }}>
              <Check size={15} />
            </div>
          }
        >
          Paid
        </Badge>
      </Group>
    </Box>
  ));

  return (
    <Layout>
      <Title align="center">Last Donations</Title>
      <Center>
        <SimpleGrid cols={1} mt="xl">
          {items}
        </SimpleGrid>
      </Center>
    </Layout>
  );
}
