import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Center, Grid, Group, Text } from '@mantine/core';
import Layout from 'components/layout';
import LabelInput from 'components/input/LabelInput';
import Dropbox from 'components/dropzone';

const handleSubmit = (values: any) => {
  // var reader = new FileReader();
  // reader.readAsText(values.document, 'base64');
  // reader.onload = function (file) {
  //   values.document = file.target!.result;
  // };
  console.log(values);
};

export default function Refugee() {
  const [documentFile, setDocumentFile] = useState();
  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      date_of_birth: '',
      email: '',
      phone: '',
      nationality: '',
      language: '',
    },
  });

  return (
    <Layout>
      <Center>
        <h1>Refugee</h1>
      </Center>
      <Center>
        <form
          onSubmit={form.onSubmit((values) => handleSubmit({ ...values, document: documentFile }))}
        >
          <Grid m="xl">
            <Grid.Col span={6}>
              <LabelInput
                label={'Firstname'}
                type={'text'}
                placeholder={'Enter firstname'}
                required={true}
                form={form}
                formLabel={'firstname'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <LabelInput
                label={'Lastname'}
                type={'text'}
                placeholder={'Enter lastname'}
                required={true}
                form={form}
                formLabel={'lastname'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <LabelInput
                label={'Date of birth'}
                type={'date'}
                placeholder={'Enter date of brith'}
                required={true}
                form={form}
                formLabel={'date_of_birth'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <LabelInput
                label={'Email'}
                type={'email'}
                placeholder={'Enter email'}
                required={true}
                form={form}
                formLabel={'email'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <LabelInput
                label={'Phone'}
                type={'Text'}
                placeholder={'Enter phone nubmer'}
                required={false}
                form={form}
                formLabel={'phone'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <LabelInput
                label={'Nationality'}
                type={'Text'}
                placeholder={'Enter nationality'}
                required={false}
                form={form}
                formLabel={'nationality'}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <LabelInput
                label={'Language'}
                type={'Text'}
                placeholder={'Enter language'}
                required={false}
                form={form}
                formLabel={'language'}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text size="sm">
                Document{' '}
                <Text size="sm" component="span" color="red">
                  *
                </Text>
              </Text>
              <Dropbox
                handleUpload={(file: any) => {
                  console.log(file[0]);
                  setDocumentFile(file[0]);
                }}
              />
            </Grid.Col>
          </Grid>
          <Center>
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Center>
        </form>
      </Center>
    </Layout>
  );
}
