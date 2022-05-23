import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25rem',
    height: '36rem',
    border: theme.colorScheme === 'dark' ? `solid 1px ${theme.colors.dark[6]}` : 'None',
  },
  stack: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    height: 300,
    width: '100%',
  },
  group: {
    width: '100%',
    paddingLeft: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '30px',
  },
  avatar: {
    width: '150px',
    height: '150px',
  },
}));
