import React from 'react';
import { ActionIcon } from '@mantine/core';
import { Logout } from 'tabler-icons-react';

export default function LogoutButton({ handleLogout }: { handleLogout: Function }) {
  return (
    <ActionIcon
      onClick={() => handleLogout()}
      size="lg"
      radius="xl"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.blue[6],
      })}
    >
      <Logout size={18} />
    </ActionIcon>
  );
}
