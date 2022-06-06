import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Space, Text, TextInput, Textarea } from '@mantine/core';
import { fetchPostJSON } from 'util/api/fetch';
import Layout from 'components/layout/employee';

const handleDelete = async () => {
  await fetchPostJSON('/api/private/aboutus/delete', { date: new Date().toISOString() }).catch();
  const button = document.getElementById('delete') as HTMLInputElement | null;
  if (button) button.disabled = true;
};

export default function page() {
  const [error, setError] = useState(false);
  const form = useForm({
    initialValues: { aboutus: '', picture: '' },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const data = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
      await fetchPostJSON('/api/private/aboutus/publish', {
        ...data,
        date: new Date().toISOString(),
        url: window.location.origin,
      });
      form.reset();
    } catch (e) {
      setError(true);
    }
  };

  if (error) {
    return <Text>Error occured. Please contact the IT Support Team</Text>;
  } else {
    return (
      <Layout>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Textarea m="sm" label="Text" {...form.getInputProps('aboutus')} minRows={10} required />
          <TextInput m="sm" label="Picture" {...form.getInputProps('picture')} />
          <Button m="sm" type="submit">
            Submit
          </Button>
        </form>
        <Space mt={100} />
        <Button m="sm" id="delete" color="red" onClick={() => handleDelete()}>
          Delete Service
        </Button>
      </Layout>
    );
  }
}
