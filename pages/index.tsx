import type { NextPage } from 'next';
import type { Employee } from '@prisma/client';
import React, { useState, useEffect } from 'react';
import { Loader, Title, SimpleGrid } from '@mantine/core';
import Layout from 'components/layout';
import TeamShowcase from 'components/teamShowcase';
import { fetchGetJSON } from 'util/api/fetch';

const Page: NextPage = () => {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGetJSON('/api/private/employee')
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [setEmployees]);

  return (
    <Layout>
      <SimpleGrid cols={1}>
        <Title sx={{ fontSize: 60, fontWeight: 900, letterSpacing: -2 }} align="center" m="xl">
          Welcome
        </Title>
        <Title
          sx={{ fontSize: 30, fontWeight: 500, letterSpacing: 7 }}
          align="center"
          mt="xl"
          mb="xl"
        >
          Our Team
        </Title>
        {!loading && employees ? (
          <TeamShowcase data={employees} />
        ) : (
          <Title
            sx={{ fontSize: 25, fontWeight: 500, letterSpacing: 7 }}
            align="center"
            mt={120}
            mb={120}
          >
            {loading ? <Loader variant="dots" size="xl" /> : 'Currently unaviailable'}
          </Title>
        )}
      </SimpleGrid>
    </Layout>
  );
};

export default Page;
