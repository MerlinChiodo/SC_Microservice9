import { useState } from 'react';
import Layout from 'components/layout';
import { useAuth } from 'context/auth';
import { Button, Center, NumberInput, Radio, RadioGroup, Space, Text, Title } from '@mantine/core';
import { fetchPostJSON } from 'util/api/fetch';

export default function Kita() {
  const auth = useAuth();
  const [error, setError] = useState(false);
  const [id, setId] = useState('');
  const [careTime, setCareTime] = useState<number | undefined>(20);

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
      <>
        <Text align="center" weight={700} size="xl" color="dimmed">
          403 - Forbidden
        </Text>
        <Space h="md" />
        <Text align="center" weight={700} size="xl" color="dimmed">
          Please Login
        </Text>
      </>
    );
  } else if (error) {
    return (
      <Center>
        <Text>Error occured. Please contact the support team or try it later again.</Text>
      </Center>
    );
  } else {
    return (
      <Layout>
        <Center>
          <Title>Kita Applikation</Title>
        </Center>
        <Center mt={50}>
          <RadioGroup
            value={id}
            onChange={setId}
            orientation="vertical"
            label="Select your child"
            description="Submitting notifies kita administration"
            required
          >
            <Radio value="2" label="Amy Burgman" />
            <Radio value="3" label="Jon Burgman" />
          </RadioGroup>
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
          />
        </Center>
        <Center m="xl">
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </Center>
      </Layout>
    );
  }
}
