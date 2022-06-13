import { useState } from 'react';
import { Button, Center, Text, Title, Paper } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { fetchPostJSON } from 'util/api/fetch';
import { Refugee } from '@prisma/client';
import Layout from 'components/layout';
import RegisterForm from 'components/registerForm/familyForm';
import PersonalQRCode from 'components/qrcode';
import cuid from 'cuid';

export default function page() {
  const [familyTag, setFamilyTag] = useLocalStorage({key: 'familyTag', defaultValue: cuid()});
  const [error, setError] = useState(false);
  const [refugee, setRefugee] = useState<Refugee | null>();

  const fetchRefugee = async (values: any) => {
    await fetchPostJSON('/api/private/register', values)
      .then((res) => {
        console.log(res)
        setRefugee(res);
      })
      .catch((err) => {
        setError(true);
      });
  };

  const handleSubmit = async (values: any) => {
    // remove empty values
    values = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));

    // set Date to IsoString
    values.date_of_birth = values.date_of_birth.toISOString();

    // file to Buffer
    if (values.document) {
      var reader = new FileReader();
      reader.readAsBinaryString(values.document);
      reader.onload = function () {
        const result = reader.result;
        if (typeof result === 'string') {
          values = { ...values, document: Buffer.from(result) };
        }
        fetchRefugee(values);
      };
    } else {
      fetchRefugee(values);
    }
  };

  if (error) {
    return (
      <Layout>
        <Center>
          <Text size="xl" weight={600} color="dimmed" sx={{ letterSpacing: 3 }}>
            Error occure. Please contact support team or try later again.
          </Text>
        </Center>
      </Layout>
    );
  } else if (refugee) {
    return (
      <Layout>
        <Title sx={{ fontSize: '300%' }} m="xl" p="xl" align="center">
          Registration successful
        </Title>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text size="xl" transform="uppercase" sx={{ letterSpacing: 5 }}>
            {refugee.firstname + ' ' + refugee.lastname}
          </Text>
          <PersonalQRCode qrcode={refugee.qr_code!} />
          <Text color="dimmed">Your QR-Code will be active in 24 hours.</Text>
        </div>
        <Center>
        <Button mt="xl" onClick={() => setRefugee(null)}>Register Next Member</Button>
        </Center>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Title align="center">Register Family</Title>
        <Center>
          <Paper withBorder m="xl" shadow="md" sx={{ maxWidth: 1000 }}>
            <RegisterForm handleSubmit={handleSubmit} familyTag={familyTag}/>
          </Paper>
        </Center>
      </Layout>
    );
  }
}
