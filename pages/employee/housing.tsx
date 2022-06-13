import { forwardRef } from 'react';
import Layout from 'components/layout/employee';
import useSWR, { mutate } from 'swr';
import {
  Avatar,
  Button,
  Center,
  Group,
  Loader,
  Select,
  SimpleGrid,
  Title,
  Text,
} from '@mantine/core';
import { fetchPutJSON, fetcher } from 'util/api/fetch';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image?: string;
  type: string;
  house_number: string;
  street: string;
  city_code: string;
  free: string;
  info: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, type, house_number, street, city_code, free, info, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{'Type: ' + type}</Text>
          <Text size="sm">{'Free: ' + free}</Text>
          <Text size="xs" color="dimmed">
            {'Address: ' + street + ' ' + house_number + ' , ' + city_code}
          </Text>
          <Text size="xs" color="dimmed">
            {info}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export default function page() {
  const { data, error } = useSWR('/api/private/housing/refugee', fetcher);
  const housing = useSWR('/api/private/housing', fetcher);
  const housingData = housing.data;
  const housingError = housing.error;

  if (error || housingError)
    return (
      <Layout>
        <Text color="dimmed">Error occured.</Text>
      </Layout>
    );
  if (!data || !housingData)
    return (
      <Layout>
        <Center>
          <Loader variant="dots" />
        </Center>
      </Layout>
    );

  console.log(housingData);

  const housingItems = housingData.map((h: any) => {
    return {
      key: h.id,
      value: h.id,
      image:
        'https://images.unsplash.com/photo-1571236673892-13d222da2019?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      id: String(h.id),
      type: h.housing_type,
      house_number: String(h.address.house_number),
      street: String(h.address.street),
      city_code: String(h.address.city_code),
      free: String(h.people_limit - h.people_assigned),
      info: h.info,
      label:
        String(h.id) +
        ' ; ' +
        h.housing_type +
        ' ; ' +
        h.address.street +
        ' ' +
        String(h.address.house_number) +
        ' ' +
        String(h.address.city_code),
    };
  });
  const handleAssignment = async (r: any) => {
    const housingSelect = document.getElementById(
      'select' + String(r.id)
    ) as HTMLInputElement | null;
    const h_id = Number(housingSelect!.value.split(' ')[0]);
    const item = document.getElementById(String(r.id)) as HTMLInputElement | null;
    await fetchPutJSON('/api/private/housing/assign', { refugee_id: r.id, housing_id: h_id });
    item!.style.display = 'none';
    mutate('/api/private/housing/assign');
    mutate('/api/private/housing');
  };

  const items = data.map((r: any) => {
    return (
      <Group noWrap key={r.id} id={String(r.id)}>
        <Avatar />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {r.firstname + ' ' + r.lastname}
          </Text>
          <Text size="xs" color="dimmed" weight={400}>
            {r.email}
          </Text>
          {r.family_tag ? (
            <Text size="xs" color="dimmed" weight={400}>
              {'Tag: ' + r.family_tag}
            </Text>
          ) : null}
        </div>
        <Select
          id={'select' + String(r.id)}
          sx={{ width: '400px' }}
          placeholder="SelectHousing"
          itemComponent={SelectItem}
          searchable
          clearable
          nothingFound="No options"
          maxDropdownHeight={280}
          data={housingItems}
          filter={(value, item) =>
            item.type.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.info.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.house_number.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.street.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.city_code.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.free.toLowerCase().includes(value.toLowerCase().trim())
          }
        />
        <Button
          onClick={() => {
            handleAssignment(r);
            mutate('api/private/housing/refugee');
            mutate('api/private/housing');
          }}
        >
          Assign
        </Button>
      </Group>
    );
  });

  return (
    <Layout>
      <Title align="center">Housing Administration</Title>
      <Center mt="xl">
        <SimpleGrid sx={{ width: '800px' }}>{items}</SimpleGrid>
      </Center>
    </Layout>
  );
}
