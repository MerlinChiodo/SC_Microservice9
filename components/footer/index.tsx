import React from 'react';
import Link from 'next/link';
import { Anchor, Group, ActionIcon, Global, Grid } from '@mantine/core';
import { Lock } from 'tabler-icons-react';
import { useStyles } from './styles';
import { PORTAL_URL } from 'util/server';

interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

export default function FooterResponsive({ links }: FooterCenteredProps) {
  const { classes } = useStyles();
  const items = links.map((link, index: number) => (
    <Link key={index} href={link.link}>
      <Anchor
        color="dimmed"
        key={link.label}
        sx={{ lineHeight: 1 }}
        size="sm"
      >
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <>
      <div className={classes.footer}>
        <div className={classes.inner}>
          <Group spacing={0} position="right" noWrap>
            <Anchor<'a'>
              color="dimmed"
              key="SmartCity Portal"
              sx={{ lineHeight: 1 }}
              href={PORTAL_URL}
              size="sm"
            >
              SmartCity Portal
            </Anchor>
          </Group>
          <Group className={classes.links}>{items}</Group>
          <Group spacing={0} position="right" noWrap>
            <Link href="/employee/login">
              <ActionIcon size="lg">
                <Lock size={18} />
              </ActionIcon>
            </Link>
          </Group>
        </div>
      </div>
    </>
  );
}
