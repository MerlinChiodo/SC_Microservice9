import { useState } from 'react';
import Link from 'next/link';
import Layout from 'components/layout/employee';
import {
  TextInput,
  PasswordInput,
  Center,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useAuthEmployee } from 'context/auth/employee';

export default function page() {
  const auth = useAuthEmployee();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await auth.login(username, password);
  };

  if (auth.user) {
    return (
      <Layout>
      <Center mt="xl">
        <Title>Hi {auth.user.firstname}!</Title>
      </Center>
      </Layout>
    );
  }

  return (
    <Container size={420} mt={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          placeholder="Your username"
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
        <Group position="right" mt="md">
          <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
