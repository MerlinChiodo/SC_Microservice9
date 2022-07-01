import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppShell,
  Avatar,
  Divider,
  Group,
  Navbar,
  Header,
  SimpleGrid,
  Title,
  Text,
} from '@mantine/core';
import HeaderLogo from 'components/header/logo';
import ThemeToggle from 'components/buttons/theme';
import LogoutButton from 'components/buttons/logout';
import { useStyles } from './styles';
import { useAuthEmployee } from 'context/auth/employee';

const links = [
  {
    link: '/employee/register',
    label: 'Registration',
  },
  {
    link: '/employee/register/family',
    label: 'Registration Family',
  },
  {
    link: '/employee/housing',
    label: 'Housing',
  },
  {
    link: '/employee/post',
    label: 'New Post',
  },
  {
    link: '/employee/post/publish',
    label: 'Publish Post to Forum',
  },
  {
    link: '/employee/aboutus',
    label: 'About Us',
  },
  {
    link: '/employee/donation',
    label: 'Donation',
  },
];

export function EmployeeLayout({ children }: any) {
  const auth = useAuthEmployee();
  const router = useRouter();
  const { classes } = useStyles();
  const navItems = links.map((link) => (
    <Link href={link.link} passHref key={link.label}>
      <a key={link.label} className={classes.link}>
        {link.label}
      </a>
    </Link>
  ));
  return (
    <AppShell
      className={classes.root}
      padding="md"
      fixed
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section grow mt="md">
            {navItems}
          </Navbar.Section>
          <Navbar.Section>
            <Divider mb="sm" />
            <Group position="apart">
              <Avatar
                src={
                  auth.user
                    ? '/avatar/' +
                      auth.user.firstname.toLowerCase() +
                      '_' +
                      auth.user.lastname.toLowerCase() +
                      '.jpg'
                    : ''
                }
                radius="xl"
              />
              <SimpleGrid spacing={0}>
                <Text>{auth.user ? auth.user.firstname + ' ' + auth.user.lastname : ''}</Text>
              </SimpleGrid>
            </Group>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs" className={classes.header}>
          <Group>
            <HeaderLogo />
            <Title order={4}>Amt für Integration</Title>
          </Group>
          <Group position="right">
            <LogoutButton
              handleLogout={() => {
                auth.logout();
                router.push('/');
              }}
            />
            <ThemeToggle />
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default EmployeeLayout;
