import React, { useState } from 'react';
import { useMantineColorScheme, ActionIcon, Tooltip } from '@mantine/core';
import { useOs } from '@mantine/hooks'; 
import { Sun, MoonStars } from 'tabler-icons-react';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const os = useOs();

  return (
      <Tooltip
        label={os === 'macos' ? '⌘ + J' : 'Ctrl + J'}
        transition="slide-left"
        transitionDuration={300}
        transitionTimingFunction="ease"
        position="bottom"
        placement="center"
        withArrow
        opened={opened}
      >
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size="lg"
          radius="xl"
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
          })}
        >
          {colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
        </ActionIcon>
      </Tooltip>
  );
}

export default ThemeToggle;
