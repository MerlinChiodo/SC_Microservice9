import Layout from 'components/layout';
import { useState } from 'react';
import { useAuth } from 'context/auth';
import {
  Button,
  Center,
  Grid,
  NumberInput,
  Paper,
  Select,
  Space,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { fetchPostJSON } from 'util/api/fetch';

export default function Housing() {
  const auth = useAuth();
  const [error, setError] = useState(false);
  const form = useForm({
    initialValues: {
      people_limit: undefined,
      size: undefined,
      shared_bathroom: undefined,
      rooms: undefined,
      rent: undefined,
      house_number: undefined,
      street: '',
      city_code: undefined,
      info: '',
    },
  });

  const handleSubmit = async (values: any) => {
    // remove empty values
    values = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
    if (values.shared_bathroom)
      values.shared_bathroom = values.shared_bathroom === 'true' ? true : false;
    values = {
      housing: {
        ...values,
        people_assigned: 0,
        housing_type: 'private',
        citizen_id: auth.user!.citizen_id,
      },
      address: {
        house_number: values.house_number,
        street: values.street,
        city_code: values.city_code,
      },
    };
    delete values.housing.house_number;
    delete values.housing.street;
    delete values.housing.city_code;

    try {
      await fetchPostJSON('/api/private/housing', values);
      form.reset();
    } catch (e) {
      setError(true);
    }
  };

  if (!auth.user) {
    return (
      <Layout>
        <Text align="center" weight={700} size="xl" color="dimmed">
          403 - Forbidden
        </Text>
        <Space h="md" />
        <Text align="center" weight={700} size="xl" color="dimmed">
          Please Login
        </Text>
      </Layout>
    );
  } else if (error) {
    <Layout>
      <Center>
        <Text size="xl" weight={600} color="dimmed" sx={{ letterSpacing: 3 }}>
          Error occure. Please contact support team or try later again.
        </Text>
      </Center>
    </Layout>;
  } else {
    return (
      <Layout>
        <Title align="center">Provide Accommodation</Title>
        <Center>
          <Paper withBorder m="xl" shadow="md" sx={{ maxWidth: '800px' }}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Grid m="lg">
                <Grid.Col xs={12} sm={6}>
                  <NumberInput
                    id="people_limit"
                    label="Number of People"
                    placeholder="Enter number of people"
                    min={1}
                    required
                    mt="xs"
                    {...form.getInputProps('people_limit')}
                  />
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>
                  <NumberInput
                    id="size"
                    label="Size"
                    placeholder="Enter size of housing"
                    required
                    min={1}
                    max={300}
                    precision={1}
                    mt="xs"
                    {...form.getInputProps('size')}
                  />
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>
                  <Select
                    id="shared_bathroom"
                    label="Shared Bathroom"
                    placeholder="Yes or No"
                    mt="xs"
                    data={[
                      { value: 'true', label: 'Yes' },
                      { value: 'false', label: 'No' },
                    ]}
                    {...form.getInputProps('shared_bathroom')}
                  />
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>
                  <NumberInput
                    id="rooms"
                    label="Rooms"
                    placeholder="Enter number of rooms"
                    mt="xs"
                    min={1}
                    {...form.getInputProps('rooms')}
                  />
                </Grid.Col>
                <Grid.Col xs={12}>
                  <NumberInput
                    id="rent"
                    label="Rent"
                    placeholder="Enter rent, enter 0 for free"
                    mt="xs"
                    min={0}
                    max={3000}
                    precision={2}
                    required
                    {...form.getInputProps('rent')}
                  />
                </Grid.Col>
                <Grid.Col xs={12} sm={4}>
                  <NumberInput
                    id="house_number"
                    label="House Number"
                    placeholder="Enter house number"
                    mt="xs"
                    min={1}
                    required
                    {...form.getInputProps('house_number')}
                  />
                </Grid.Col>
                <Grid.Col xs={12} sm={4}>
                  <TextInput
                    id="street"
                    label="Street"
                    placeholder="Enter street"
                    required
                    mt="xs"
                    {...form.getInputProps('street')}
                  />
                </Grid.Col>
                <Grid.Col xs={12} sm={4}>
                  <NumberInput
                    id="city_code"
                    label="City Code"
                    placeholder="Enter city code"
                    mt="xs"
                    min={10000}
                    max={99999}
                    required
                    {...form.getInputProps('city_code')}
                  />
                </Grid.Col>
                <Grid.Col xs={12}>
                  <Textarea
                    id="info"
                    label="Addtional Information"
                    placeholder="Enter additional information"
                    mt="xs"
                    minRows={7}
                    {...form.getInputProps('info')}
                  />
                </Grid.Col>
                <Grid.Col>
                  <Center>
                    <Button type="submit" radius="md" size="md" mt="xl" uppercase>
                      Submit
                    </Button>
                  </Center>
                </Grid.Col>
              </Grid>
            </form>
          </Paper>
        </Center>
      </Layout>
    );
  }
}
