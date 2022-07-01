import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  paper: {
    width: '800px',
    [theme.fn.smallerThan('md')]: {
      width: '768px',
    },
    [theme.fn.smallerThan('sm')]: {
      width: '550px',
    },
    [theme.fn.smallerThan('xs')]: {
      width: 'auto',
    },
  },
}));
