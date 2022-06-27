import Layout from 'components/layout';
import { Center, Text } from '@mantine/core';

export default function page() {
  return (
    <Layout>
      <Center>
        <Text align="center" weight={700} size="xl" color="dimmed" sx={{ maxWidth: '800px' }}>
          Diese Website ist ein studentisches Projekt der FH Bielefeld im Rahmen des Moduls
          Softwareprojekt des Informatikstudiengangs am Campus Minden. Diese Website ist nicht für
          einen echten Einsatz gedacht. Keine Daten sind echt, sondern Musterdaten, um die
          Funktionalität zu testen und zu präsentieren.
        </Text>
      </Center>
      <Center m="xl">
        <Text align="center" weight={700} size="xl" color="dimmed" sx={{ maxWidth: '800px' }}>
          Nur für private Zwecke nutzbar.
        </Text>
      </Center>
    </Layout>
  );
}
