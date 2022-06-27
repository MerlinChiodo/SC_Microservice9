import { useState, useEffect } from 'react';
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
import { CITIZEN_OFFICE_URL } from 'util/server';

export default function Kita() {
  const auth = useAuth();
  const [error, setError] = useState(false);
  const [id, setId] = useState('');
  const [children, setChildren] = useState<any>([]);
  const [loading, setLoading] = useState(true);
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
  } else {
    return (
      <Layout>
        <Center>
          <Title>Kita Applikation</Title>
        </Center>
        <Center mt="xl">
          <Paper withBorder shadow="xs" sx={{ minWidth: '600px' }}>
            <Center mt={50}>
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
                sx={{ minWidth: '400px' }}
              />
            </Center>
            <Center m="xl">
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </Center>
          </Paper>
        </Center>
      </Layout>
    );
  }
}
