import React from 'react';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { Button, Center, Grid, Text, TextInput } from '@mantine/core';
import { Checklist } from 'tabler-icons-react';
import Dropbox from 'components/dropbox';

export default function RegisterForm({
  handleSubmit,
  familyTag,
}: {
  handleSubmit: Function;
  familyTag: string;
}) {
  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      date_of_birth: undefined,
      email: '',
      phone: '',
      nationality: '',
      document: '',
      family_tag: familyTag,
    },
  });
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Grid m="xl">
        <Grid.Col xs={12} sm={6}>
          <TextInput
            id="firstname"
            label="Firstname"
            placeholder="Enter firstname"
            required
            mt="sm"
            autoComplete="nope"
            {...form.getInputProps('firstname')}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            id="lastname"
            label="Lastname"
            placeholder="Enter lastname"
            required
            mt="sm"
            {...form.getInputProps('lastname')}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <DatePicker
            id="date_of_birth"
            label="Date of birth"
            placeholder="Enter date of birth"
            required
            mt="sm"
            {...form.getInputProps('date_of_birth')}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            id="email"
            label="Email"
            placeholder="Enter email"
            type={'email'}
            required
            mt="sm"
            {...form.getInputProps('email')}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            id="phone"
            label="Phone"
            placeholder="Enter phone"
            type={'tel'}
            mt="sm"
            {...form.getInputProps('phone')}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            id="nationality"
            label="Nationality"
            placeholder="Enter nationality"
            mt="sm"
            {...form.getInputProps('nationality')}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            id="familyTag"
            label="Family Tag"
            mt="sm"
            disabled
            {...form.getInputProps('family_tag')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Text size="sm">
            Document{' '}
            <Text size="sm" component="span" color="red">
              *
            </Text>
          </Text>
          <Dropbox form={form} />
        </Grid.Col>
        <Grid.Col>
          <Center>
            <Button leftIcon={<Checklist />} type="submit" radius="md" size="md" m="xl" uppercase>
              Register
            </Button>
          </Center>
        </Grid.Col>
      </Grid>
    </form>
  );
}
