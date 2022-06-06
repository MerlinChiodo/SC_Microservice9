import type { Refugee } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { Avatar, Button, Center, Container, Group, SimpleGrid, Title, Text } from '@mantine/core';
import { fetchGetJSON, fetchPostJSON } from 'util/api/fetch';
import Layout from 'components/layout/employee';
import { BASE_URL } from 'util/server';

const handleAccept = async (id: number) => {
  await fetchPostJSON(`/api/private/register/accept/${id}`);
  const button = document.getElementById(String(id)) as HTMLInputElement | null;
  if (button) button.disabled = true;
};

export default function page({ refugeeList }: { refugeeList: Refugee[] }) {
  const items = refugeeList.map((r: Refugee) => (
    <Group noWrap key={r.id}>
      <Avatar />
      <div style={{ flex: 1 }}>
        <Text size="sm" weight={500}>
          {r.firstname + ' ' + r.lastname}
        </Text>
        <Text size="xs" color="dimmed" weight={400}>
          {r.email}
        </Text>
      </div>
      <Button id={String(r.id)} onClick={() => handleAccept(r.id)}>
        Accept
      </Button>
    </Group>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchGetJSON(BASE_URL + '/api/private/register');

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { refugeeList: data },
  };
};
