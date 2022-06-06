import React from 'react';
import { Button, useMantineTheme } from '@mantine/core';
import QRCode from 'react-qr-code';
import { Download, Printer } from 'tabler-icons-react';

const handleDownload = () => {
  const svg = document.getElementById('QRCode');
  const svgData = new XMLSerializer().serializeToString(svg!);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx!.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = 'QRCode';
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
};

const handlePrint = () => {
  const downloadButton = document.getElementById('download');
  const printButton = document.getElementById('print');
  downloadButton!.style.display = 'none';
  printButton!.style.display = 'none';
  window.print();
  downloadButton!.style.display = 'unset';
  printButton!.style.display = 'unset';
}

export default function PersonalQRCode({ qrcode }: { qrcode: string }) {
  const theme = useMantineTheme();
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          width: '100%',
        }}
      >
        <QRCode
          id="QRCode"
          title="Personal QR-Code"
          value={qrcode}
          size={256}
          bgColor={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[9]}
          fgColor={theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'white'}
        />
      </div>
      <Button
        id="download"
        mt="2rem"
        ml="1rem"
        mr="1rem"
        leftIcon={<Download />}
        value={qrcode}
        uppercase
        onClick={handleDownload}
        radius="lg"
      >
        Download
      </Button>
      <Button mt="1rem" mb="3rem" ml="1rem" mr="1rem" id="print" leftIcon={<Printer />} value={qrcode} uppercase onClick={handlePrint} radius="lg">
        Print
      </Button>
    </div>
  );
}
