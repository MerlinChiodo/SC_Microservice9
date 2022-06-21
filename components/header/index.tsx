import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from 'context/auth';
import {
  Avatar,
  Button,
  Burger,
  Drawer,
  Group,
  Header,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Transition,
} from '@mantine/core';
import { useBooleanToggle, useMediaQuery } from '@mantine/hooks';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [openedAuth, toggleOpenedAuth] = useBooleanToggle(false);
  const { classes } = useStyles();
  const lgScreen = useMediaQuery('(min-width: 1200px)');
  const items = links.map((link) => (
    <Link href={link.link} passHref key={link.label}>
      <a key={link.label} className={classes.link}>
        {link.label}
      </a>
    </Link>
  ));

  const handleLogin = async () => {
    await auth.login(username, password);
    toggleOpenedAuth();
  };

  return (
    <>
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
            <>
              <LoginButton handleLogin={toggleOpenedAuth} />
            </>
          )}
          <ThemeToggle />
        </Group>
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              <div className={classes.dropdownButton}>
                {auth.user ? (
                  <>
                    <Avatar size={36} radius="xl"></Avatar>
                    <LogoutButton handleLogout={auth.logout} />
                  </>
                ) : (
                  <LoginButton handleLogin={toggleOpenedAuth} />
                )}
                <ThemeToggle />
              </div>
            </Paper>
          )}
        </Transition>
      </Header>
      <Drawer
        size={lgScreen ? '25%' : '100%'}
        position="right"
        opened={openedAuth}
        onClose={() => toggleOpenedAuth()}
      >
        <Paper p={30} radius="md">
          <Title mb="lg">Login</Title>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            required
            mt="md"
          />
          <Button fullWidth mt="xl" onClick={() => handleLogin()}>
            Sign in
          </Button>
        </Paper>
        <Image
          src="https://github.com/SmartCityProjectGroup/SmartCity/blob/main/Logo_4.png?raw=true"
          width="100%"
          height="100%"
          layout="responsive"
        />
      </Drawer>
    </>
  );
}

export default HeaderResponsive;
