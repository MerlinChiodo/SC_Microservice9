import type { Refugee } from '@prisma/client';
import useSWR from 'swr';
import Link from 'next/link';
import {
  Avatar,
  Button,
  Center,
  Container,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Title,
  Text,
} from '@mantine/core';
import { fetchPostJSON, fetcher } from 'util/api/fetch';
import Layout from 'components/layout/employee';
import { useAuthEmployee } from 'context/auth/employee';

const handleAccept = async (data: Refugee[], family_tag: string) => {
  const year = new Date().getFullYear() - 18;
  const parents: any = [];
  const children: any = [];
  data.forEach((r) => {
    if (r.family_tag === family_tag) {
      if (year < new Date(r.date_of_birth).getFullYear()) {
        children.push({
          firstname: r.firstname,
          lastname: r.lastname,
          date_of_birth: r.date_of_birth,
          email: r.email,
        });
      } else {
        parents.push({
          firstname: r.firstname,
          lastname: r.lastname,
          date_of_birth: r.date_of_birth,
          email: r.email,
        });
      }
    }
  });

  await fetchPostJSON(`/api/private/register/accept/family`, {
    parents: parents,
    children: children,
    family_tag: family_tag,
  });
  const item = document.getElementById(String(family_tag)) as HTMLInputElement | null;
  item!.disabled = true;
};

export default function page() {
  const auth = useAuthEmployee();
  const { data, error } = useSWR<Refugee[]>('/api/private/register/family', fetcher, {
    refreshInterval: 1000,
  });

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

  if (data.length < 1) {
    return (
      <Layout>
        <Title align="center" mt={40}>
          Registration Family
        </Title>
        <Center>
          <Text color="dimmed" mt="xl">
            No new family registrations
          </Text>
        </Center>
      </Layout>
    );
  }
  let tag = data[0].family_tag;
  const items = data.map((r: Refugee) => {
    if (tag === r.family_tag) {
      return (
        <Group noWrap key={r.id} id={String(r.id)}>
          <Avatar />
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {r.firstname + ' ' + r.lastname}
            </Text>
            <Text size="xs" color="dimmed" weight={400}>
              {new Date(r.date_of_birth).toString().slice(0, 16)}
            </Text>
          </div>
          <Text size="xs" color="dimmed" weight={400}>
            {r.email}
          </Text>
        </Group>
      );
    } else {
      const old_tag = tag;
      tag = r.family_tag;
      return (
        <>
          <Button
            id={String(old_tag)}
            key={r.family_tag}
            onClick={() => handleAccept(data, old_tag!)}
          >
            Accept
          </Button>
          <Group mt={50} noWrap key={r.id} id={String(r.id)}>
            <Avatar />
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {r.firstname + ' ' + r.lastname}
              </Text>
              <Text size="xs" color="dimmed" weight={400}>
                {new Date(r.date_of_birth).toString().slice(0, 16)}
              </Text>
            </div>
            <Text size="xs" color="dimmed" weight={400}>
              {r.email}
            </Text>
          </Group>
        </>
      );
    }
  });

  return (
    <Layout>
      <Container>
        <Title align="center" mt={40}>
          Registration Family
        </Title>
        <Center mt={40}>
          <SimpleGrid sx={{ width: '800px' }}>
            {items}
            <Button id={String(tag)} onClick={() => handleAccept(data, tag!)}>
              Accept
            </Button>
          </SimpleGrid>
        </Center>
      </Container>
    </Layout>
  );
}
