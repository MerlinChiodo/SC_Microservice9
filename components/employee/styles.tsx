import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 325,
    height: 450,
    border: theme.colorScheme === 'dark' ? `solid 1px ${theme.colors.dark[6]}` : 'None',
  },
  stack: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    height: 250,
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
    width: '100px',
    height: '100px',
  },
  email: {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
    },
  },
}));
