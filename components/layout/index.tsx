import { useAuth } from 'context/auth';
import { Global } from '@mantine/core';
import HeaderResponsive from 'components/header';
import FooterResponsive from 'components/footer';

const dataLoggedOut = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/registration/refugee',
    label: 'Registration',
  },
  {
    link: '/donation',
    label: 'Donation',
  },
];
const dataLoggedIn = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/registration/refugee',
    label: 'Registration',
  },
  {
    link: '/kita',
    label: 'Kita',
  },
  {
    link: '/housing',
    label: 'Housing',
  },
  {
    link: '/donation',
    label: 'Donation',
  },
];

const dataFooter = [
  {
    link: '/legal_disclosure',
    label: 'Impressum – Legal Disclosure',
  },
  {
    link: '/privacy',
    label: 'Datenschutz - Privacy Policy',
  },
];

export default function Layout({ children }: any) {
  const auth = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: '1 0 auto' }}>
        <HeaderResponsive links={auth.user ? dataLoggedIn : dataLoggedOut} />
        {children}
      </div>
      <FooterResponsive links={dataFooter} />
    </div>
  );
}
