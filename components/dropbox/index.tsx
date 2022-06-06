import React, { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Center,
  Group,
  Text,
  useMantineTheme,
  MantineTheme,
} from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, PDF_MIME_TYPE } from '@mantine/dropzone';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 100, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      <Text size="xl" inline>
        Drag pdf here or click to select file
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        {status.accepted ? 'Accepted File' : 'Add a file'}
      </Text>
    </div>
  </Group>
);

const useForceUpdate = () => {
  const [, setState] = useState(0);
  return () => setState((v) => v + 1);
};

function Dropbox({ form }: { form: any }) {
  const theme = useMantineTheme();
  const forceUpdate = useForceUpdate();

  const removeButton = (
    <ActionIcon
      onClick={() => {
        form.setFieldValue('document', '');
        forceUpdate();
      }}
      size="xs"
      color="blue"
      radius="xl"
      variant="transparent"
    >
      <X size={10} />
    </ActionIcon>
  );

  return (
    <>
      <Dropzone
        id="dropbox"
        onDrop={(files) => {
          form.setFieldValue('document', files[0]);
          forceUpdate();
        }}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        multiple={false}
        accept={PDF_MIME_TYPE}
        {...form.getInputProps('document')}
      >
        {(status) => dropzoneChildren(status, theme)}
      </Dropzone>
      {form.values && form.values.document ? (
        <Center>
          <Badge size="lg" mt="sm" rightSection={removeButton}>
            {form.values.document.name}
          </Badge>
        </Center>
      ) : null}
    </>
  );
}

export default Dropbox;
