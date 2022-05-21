import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    Index: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '30px',
    paddingRight: '30px',
  },

  dropdown: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('lg')]: {
      display: 'none',
    },
  },

  dropdownButton: {
    display: 'flex',
    marginRight: '20px',
    marginBottom: '5px',
    justifyContent: 'flex-end',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('lg')]: {
      display: 'none',
    },
  },

  dropdownAvatar: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
  },



  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },

  burger: {
    position: 'absolute',
    right: '1rem',
    [theme.fn.largerThan('lg')]: {
      display: 'none',
    },
  },

  themeToggle: {
    position: 'absolute',
    right: '1rem',
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },

  logo: {
    position: 'absolute',
    left: '1rem',
    paddingLeft: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    paddingTop: '2.5px',
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[7],
    fontSize: theme.fontSizes.lg,
    letterSpacing: 0.5,
    fontWeight: 600,
    marginRigth: '25px',
    marginLeft: '25px',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));
