import React, { useState, useContext, useEffect, useMemo } from 'react';
import type { Employee } from 'util/interfaces/auth';
import { fetchPost, fetchGetJSON } from 'util/api/fetch';

interface AuthContext {
  user: Employee | null;
  logout: Function;
  login: Function;
}

const AuthContext = React.createContext<AuthContext>({
  user: null,
  logout: () => {},
  login: () => {},
});

export const useAuthEmployee = () => useContext(AuthContext);

export function AuthProviderEmployee({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<Employee | null>(null);

  const logout = async () => {
    await fetchGetJSON('/api/private/employee/logout');
    setUser(null);
  };

  const login = async (username: string, password: string) => {
    const res = await fetchPost('/api/private/employee/login', {
      username: username,
      password: password,
    });
    if (res.status != 200) return;
    const user = await res.json();
    setUser(user);
  };

  useEffect(() => {
    fetchGetJSON('/api/private/employee/checkAuth')
      .then((res) => {
        if (!res.verified) logout();
        setUser({
          username: res.user.username,
          firstname: res.user.info.firstname,
          lastname: res.user.info.lastname,
        });
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
