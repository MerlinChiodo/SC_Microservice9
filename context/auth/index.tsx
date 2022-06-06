import React, { useState, useContext, useEffect, useMemo } from 'react';
import type { User } from 'util/interfaces/auth';

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

  const logout = () => {
    setUser(null);
  };

  const login = () => {
    setUser({ firstname: 'Jooske', lastname: 'Burgman', email: 'jooske@afi.de' });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    //check token & get user infos
    if (token) {
      login();
    } else {
      logout();
    }
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
