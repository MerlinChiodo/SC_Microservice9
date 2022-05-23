import React from 'react';
import { ActionIcon } from '@mantine/core';
import { Login } from 'tabler-icons-react';

export default function LoginButton({ handleLogin }: { handleLogin: Function }) {
  return (
    <ActionIcon
      onClick={() => handleLogin()}
      size="lg"
      radius="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.blue[6],
      })}
    >
      <Login size={18} />
    </ActionIcon>
  );
}
