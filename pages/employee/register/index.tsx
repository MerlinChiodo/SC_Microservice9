import type { Refugee } from '@prisma/client';
import useSWR, { useSWRConfig } from 'swr';
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Group,
  Loader,
  SimpleGrid,
  Title,
  Text,
} from '@mantine/core';
import { fetchPostJSON, fetcher } from 'util/api/fetch';
import Layout from 'components/layout/employee';

const handleAccept = async (id: number) => {
  await fetchPostJSON(`/api/private/register/accept/${id}`);
  const item = document.getElementById(String(id)) as HTMLInputElement | null;
  item!.style.display = 'none';
};

export default function page() {
  const { data, error } = useSWR('/api/private/register', fetcher);
  const { mutate } = useSWRConfig();

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

  const items = data.map((r: Refugee) => (
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
      <Group noWrap key={r.id} id={String(r.id)}>
        <Avatar />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {r.firstname + ' ' + r.lastname}
          </Text>
          <Text size="xs" color="dimmed" weight={400}>
            {r.email}
          </Text>
        </div>
        <Button
          onClick={() => {
            handleAccept(r.id);
            mutate('/api/private/register');
          }}
        >
          Accept
        </Button>
      </Group>
    </Box>
  ));

  return (
    <Layout>
      <Container>
        <Title align="center" mt={40}>
          Registration
        </Title>
        <Center mt={40}>
          <SimpleGrid sx={{ width: '800px' }}>{items}</SimpleGrid>
        </Center>
      </Container>
    </Layout>
  );
}
