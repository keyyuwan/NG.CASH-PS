import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Router from "next/router";
import { setCookie, destroyCookie, parseCookies } from "nookies";

import { api } from "../libs/api";
import { toastOptions } from "../utils/toastify";

interface User {
  id: string;
  username: string;
  accountId: string;
}

interface SignInResponse {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User | null;
  signIn: ({ username, password }: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const { data } = await api.post<SignInResponse>("/login", {
        username,
        password,
      });
      const { token, user } = data;

      setCookie(undefined, "@ngcash:token", token, {
        maxAge: 60 * 60 * 24, // 24h
        path: "/",
      });

      setUser({
        id: user.id,
        username: user.username,
        accountId: user.accountId,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.log(error);
      toast.error(error.response?.data.error as string, toastOptions);
    }
  }

  function signOut() {
    destroyCookie(undefined, "@ngcash:token");
    Router.push("/login");
  }

  //   useEffect(() => {
  //     const { "@ngcash:token": token } = parseCookies();

  //     if (token) {

  //     }

  //   }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
