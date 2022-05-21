import React, { useState, useEffect } from 'react';
import { Employee } from 'util/interfaces/';
import { Loader, Title, SimpleGrid } from '@mantine/core';
import Layout from 'components/layout';
import TeamShowcase from 'components/teamShowcase';
import { fetchGetJSON } from 'util/api-helpers';

const mockData = [
  {
    firstname: 'Townsend',
    lastname: 'Bygott',
    room: 'CU',
    phone: '(772) 4787969',
    email: 'tbygott0@yolasite.com',
    picture:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    firstname: 'Griselda',
    lastname: 'Readwood',
    room: 'BR',
    phone: '(600) 2216377',
    email: 'greadwood1@wikia.com',
    picture:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1522&q=80',
  },
  {
    firstname: 'Marlin',
    lastname: 'Paintain',
    room: 'VE',
    phone: '(603) 1628652',
    email: 'mpaintain2@va.gov',
    picture:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80',
  },
  {
    firstname: 'Kendrick',
    lastname: 'Jentges',
    room: 'PH',
    phone: '(292) 1817900',
    email: 'kjentges3@wikimedia.org',
    picture:
      'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2038&q=80',
  },
  {
    firstname: 'Blakeley',
    lastname: 'Strowther',
    room: 'CZ',
    phone: '(222) 4058688',
    email: 'bstrowther4@blogtalkradio.com',
    picture:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80',
  },
  {
    firstname: 'Fleming',
    lastname: 'Bending',
    room: 'AR',
    phone: '(838) 1115771',
    email: 'fbending5@who.int',
    picture:
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  },
  {
    firstname: 'Mala',
    lastname: 'Gallahar',
    room: 'CN',
    phone: '(820) 8074231',
    email: 'mgallahar6@sohu.com',
    picture:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  },
  {
    firstname: 'Gilberta',
    lastname: 'Sedgemond',
    room: 'FR',
    phone: '(467) 4958284',
    email: 'gsedgemond7@illinois.edu',
    picture:
      'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  },
  {
    firstname: 'Olivia',
    lastname: 'Fluin',
    room: 'RS',
    phone: '(416) 3538037',
    email: 'ofluin8@army.mil',
    picture:
      'https://images.unsplash.com/photo-1614436201459-156d322d38c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
  },
  {
    firstname: 'Garv',
    lastname: 'Buzin',
    room: 'CN',
    phone: '(603) 1609425',
    email: 'gbuzin9@nationalgeographic.com',
    picture:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80',
  },
];

export default function Home() {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  // TODO remove mock data
  useEffect(() => {
    fetchGetJSON('/api/private/employee')
      .then((data) => {
        setEmployees(mockData);
      })
      .catch(() => {
        setEmployees(mockData);
      });
  }, [setEmployees]);
  return (
    <Layout>
      <SimpleGrid cols={1}>
        <Title sx={{ fontSize: 120, fontWeight: 900, letterSpacing: -2 }} align="center" mt={300}>
          Welcome
        </Title>
        <Title
          sx={{ fontSize: 50, fontWeight: 500, letterSpacing: 7 }}
          align="center"
          mt={120}
          mb={120}
        >
          Our Team
        </Title>
        {employees ? (
          <TeamShowcase data={employees} />
        ) : (
          <Title
            sx={{ fontSize: 25, fontWeight: 500, letterSpacing: 7 }}
            align="center"
            mt={120}
            mb={120}
          >
            <Loader variant="dots" size="xl" />
          </Title>
        )}
      </SimpleGrid>
    </Layout>
  );
}
