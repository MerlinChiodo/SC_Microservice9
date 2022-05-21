import React from 'react';
import Link from 'next/link';
import { useAuth } from 'context/auth';
import {
  Avatar,
  Burger,
  Group,
  Header,
  Paper,
  Title,
  Transition,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import HeaderLogo from './logo';
import { useStyles } from './styles';
import ThemeToggle from 'components/buttons/theme';
import LoginButton from 'components/buttons/login';
import LogoutButton from 'components/buttons/logout';

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const auth = useAuth();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Link href={link.link} passHref key={link.label}>
      <a key={link.label} className={classes.link}>
        {link.label}
      </a>
    </Link>
  ));

  return (
    <Header height={60} mb={40} className={classes.root}>
      <Group className={classes.logo}>
        <HeaderLogo />
        <Title className={classes.logoText} order={4}>
          Amt für Integration
        </Title>
      </Group>
      <Group spacing={5} className={classes.links}>
        {items}
      </Group>
      <Group className={classes.themeToggle}>
        {auth.user ? (
          <>
            <Avatar size={36} radius="xl" />
            <LogoutButton handleLogout={auth.logout} />
          </>
        ) : (
          <LoginButton handleLogin={auth.login} />
        )}
        <ThemeToggle />
      </Group>
      <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            {items}
            <div className={classes.dropdownButton}>
              {auth.user ? (
                <Avatar size={36} radius="xl"></Avatar>
              ) : (
                <LoginButton handleLogin={auth.login} />
              )}
              <ThemeToggle />
            </div>
          </Paper>
        )}
      </Transition>
    </Header>
  );
}

export default HeaderResponsive;
