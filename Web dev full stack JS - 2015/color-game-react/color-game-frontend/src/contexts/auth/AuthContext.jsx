import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export default AuthContext;
