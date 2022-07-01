import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from 'components/layout';
import { useAuth } from 'context/auth';
import {
  Button,
  Center,
  Chip,
  Chips,
  Loader,
  NumberInput,
  Paper,
  Space,
  Title,
  Text,
} from '@mantine/core';
import { fetchPostJSON, fetchGetJSON } from 'util/api/fetch';
import { CITIZEN_OFFICE_URL, KITA_URL } from 'util/server';
import picture from 'public/kita/successful_application.jpg';

export default function Kita() {
  const auth = useAuth();
  const [error, setError] = useState(false);
  const [id, setId] = useState('');
  const [children, setChildren] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [careTime, setCareTime] = useState<number | undefined>(20);

  useEffect(() => {
    if (!auth.user) {
    } else {
      fetchGetJSON(CITIZEN_OFFICE_URL + '/api/citizen/' + auth.user.citizen_id + '/children')
        .then(async (data) => {
          let list: any = [];
          for (let id of data.children) {
            const c = await fetchGetJSON(CITIZEN_OFFICE_URL + '/api/citizen/' + id);
            list.push(c);
          }
          setChildren(list);
          setLoading(false);
        })
        .catch(() => setError(true));
    }
  }, [setChildren, auth.user, setError, setLoading]);

  const items = children.map((c: any, index: number) => (
    <Chip key={index} value={c.citizen_id}>
      {c.firstname + ' ' + c.lastname}{' '}
    </Chip>
  ));

  const handleSubmit = async () => {
    try {
      await fetchPostJSON('/api/private/kita/publish', {
        care_time: careTime,
        child: { citizen_id: Number(id) },
        parent: { citizen_id: auth.user!.citizen_id },
      });
      setSuccess(true);
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
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Center>
          <Text>Error occured. Please contact the support team or try it later again.</Text>
        </Center>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Center>
        <Loader variant="dots" />
      </Center>
    );
  } else if (success) {
    return (
      <Layout>
        <Title align="center" m="xl">
          Application Successful
        </Title>
        <Text align="center">
          You will be notified by the kita administration service for further steps.
        </Text>
        <Center m="md">
          <div style={{ position: 'relative', width: '800px', height: '400px' }}>
            <Image
              src={picture}
              width={400}
              height={400}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
            />
          </div>
        </Center>
        <Title order={4} align="center" m="xl">
          For Question please visit
          <Text component="a" href={KITA_URL} color="blue" inherit>
            {' '}
            Kita Administration Service
          </Text>
        </Title>
        <Center>
          <Button onClick={() => setSuccess(false)}>Apply another child</Button>
        </Center>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Center>
          <Title>Kita Applikation</Title>
        </Center>
        <Center mt="xl">
          <Paper
            withBorder
            p="sm"
            m="md"
            shadow="xs"
            sx={{
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <Text align="center" mt="md" color="dimmed" weight={700}>
              Please select your child
            </Text>
            <Center mt="xl">
              <Chips multiple={false} value={id} onChange={setId} direction="column">
                {items}
              </Chips>
            </Center>
            <Center mt={40}>
              <NumberInput
                value={careTime}
                onChange={(v) => setCareTime(v)}
                label="Care Time"
                description="20 - 45 weekly hours"
                min={20}
                max={45}
                required
                sx={{
                  maxWidth: '400px',
                  width: '100%',
                }}
              />
            </Center>
            <Center m="xl">
              <Button radius="md" size="md" onClick={() => handleSubmit()} uppercase>Submit</Button>
            </Center>
          </Paper>
        </Center>
      </Layout>
    );
  }
}
