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
  balance: number;
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
  isAccountDataRefreshing: boolean;
  isLoginIn: boolean;
  signOut: () => void;
  refreshAccountData: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAccountDataRefreshing, setIsAccountDataRefreshing] = useState(false);
  const [isLoginIn, setIsLoginIn] = useState(false);

  async function signIn({ username, password }: SignInCredentials) {
    setIsLoginIn(true);

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
        balance: user.balance,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/");

      toast.success(`Bem vindo(a) @${user.username}`, toastOptions);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.log(error);
      toast.error(error.response?.data.error as string, toastOptions);
    } finally {
      setIsLoginIn(false);
    }
  }

  function signOut() {
    destroyCookie(undefined, "@ngcash:token");
    Router.push("/login");
  }

  useEffect(() => {
    const { "@ngcash:token": token } = parseCookies();

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      api
        .get("/account")
        .then((response) => {
          setUser({
            id: response.data.user.id,
            username: response.data.user.username,
            accountId: response.data.id,
            balance: response.data.balance,
          });
        })
        .catch(() => {
          signOut();
        });
    }

    setIsAccountDataRefreshing(false);
  }, [isAccountDataRefreshing]);

  function refreshAccountData() {
    setIsAccountDataRefreshing(true);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoginIn,
        isAccountDataRefreshing,
        refreshAccountData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
