export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://vps2290194.fastwebserver.de:9790'
    : 'http://localhost:3000';

export const AUTH_URL = 'http://auth.smartcityproject.net:8080';

export const PORTAL_URL = 'http://supersmartcity.de';