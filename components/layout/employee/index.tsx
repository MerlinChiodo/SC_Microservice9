import React from 'react';
import Link from 'next/link';
import { AppShell, Avatar, Group, Navbar, Header, SimpleGrid, Title, Text } from '@mantine/core';
import HeaderLogo from 'components/header/logo';
import ThemeToggle from 'components/buttons/theme';
import { useStyles } from './styles';


const links = [
  {
    link: '/employee/register',
    label: 'Registration'
  },
  {
    link: '/employee/register/family',
    label: 'Registration Family'
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
              <Group position="apart">
                <Avatar />
                <SimpleGrid spacing={0}>
                  <Text>Hans Bauer</Text>
                  <Text size="xs" color="dimmed">hans@afi.de</Text>
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
            <ThemeToggle />
          </Header>
        }
      >
        {children}
      </AppShell>
  );
}

export default EmployeeLayout;
