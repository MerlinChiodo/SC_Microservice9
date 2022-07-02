import React, { useState, useContext, useEffect, useMemo } from 'react';
import type { User } from 'util/interfaces/auth';
import { fetchPost, fetchGetJSON } from 'util/api/fetch';

interface AuthContext {
  user: User | null;
  logout: Function;
  login: Function;
}

const AuthContext = React.createContext<AuthContext>({
  user: null,
  logout: () => {},
  login: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    await fetchGetJSON('/api/private/user/logout');
    setUser(null);
  };

  const login = async (username: string, password: string) => {
    const res = await fetchPost('/api/private/user/login', {
      username: username,
      password: password,
    });
    if (res.status != 200) return;
    const user = await res.json();
    setUser(user);
  };

  useEffect(() => {
    fetchGetJSON('/api/private/user/checkAuth')
      .then((res) => {
        if (!res.verified) logout();
        setUser({ username: res.user.username, citizen_id: res.user.citizen_id, ...res.user.info });
      })
      .catch(() => logout());
  }, [setUser]);

  const state = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
