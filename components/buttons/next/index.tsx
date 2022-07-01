import React from 'react';
import { ActionIcon } from '@mantine/core';
import { CaretRight } from 'tabler-icons-react';

export function PrevButton({ onClick }: { onClick: Function }) {
  return (
    <ActionIcon
      onClick={() => onClick()}
      size="lg"
      sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.black,
        [theme.fn.smallerThan('lg')]: {
          display: 'none',
        }
      })}
    >
      <CaretRight size={50} />
    </ActionIcon>
  );
}

export default PrevButton;
