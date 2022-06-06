import { useAuth } from 'context/auth'
import HeaderResponsive from 'components/header';

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
    link: '/registration',
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

export default function Layout({ children }: any) {
  const auth = useAuth();

  return (
    <>
      <HeaderResponsive
        links= { auth.user ? dataLoggedIn : dataLoggedOut}
      />
      {children}
    </>
  );
}
