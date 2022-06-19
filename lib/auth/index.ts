import { AUTH_URL } from 'util/server';
import { fetchPostURLEncoded } from 'util/api/fetch';
import { isNotEmpty } from 'util/api/util';

export default async function auth(token: string) {
  if (isNotEmpty(process.env.NEXT_PUBLIC_E2E_TEST)) return true;
  try {
    await fetchPostURLEncoded(AUTH_URL + '/verify', { code: token });
    return true;
  } catch (e) {
    return false;
  }
}
