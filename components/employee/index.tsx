import type { Employee } from 'util/interfaces';
import React from 'react';
import Image from 'next/image';
import { Avatar, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { PhoneCall, Clock, Building, Mail } from 'tabler-icons-react';
import { useStyles } from './styles';

const imgstyle = {
  width: '350px',
  height: 'auto',
  borderRadius: '50%',
  border: '1px solid',
  overflow: 'hidden',
};

export default function Employee({ employee, key }: { employee: Employee; key: number }) {
  const { classes } = useStyles();
  return (
    <Paper shadow="xl" p="xl" key={key} className={classes.paper}>
      <Avatar
        src={employee.avatar_path}
        radius={150}
        size={150}
        mb="md"
        className={classes.avatar}
      />
      <Stack align="center" className={classes.stack}>
        <Title mt="xl" order={3}>
          {employee.firstname + ' ' + employee.lastname}
        </Title>
        <Group className={classes.group}>
          <PhoneCall />
          <Text>{employee.phone}</Text>
        </Group>
        <Group className={classes.group}>
          <Clock />
          <Text>{'9 a.m - 5 p.m'}</Text>
        </Group>
        <Group className={classes.group}>
          <Building />
          <Text>{employee.room}</Text>
        </Group>
        <Group className={classes.group}>
          <Mail />
          <Text>{employee.email}</Text>
        </Group>
      </Stack>
    </Paper>
  );
}
