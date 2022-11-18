import { GetServerSideProps } from "next";
import Head from "next/head";
import { destroyCookie, parseCookies } from "nookies";
import { SignOut } from "phosphor-react";
import { useTheme } from "styled-components";

import { TransferenceSection } from "../components/Home/TransferenceSection";
import { TransactionsSection } from "../components/Home/TransactionsSection";
import { useAuth } from "../hooks/useAuth";
import { mascaraBRL } from "../utils/masks";

import {
  HomeContainer,
  Header,
  Content,
  Logo,
  GreetingsText,
  BalanceText,
} from "../styles/home";

export default function Home() {
  const theme = useTheme();
  const { user, signOut } = useAuth();

  return (
    <>
      <Head>
        <title>NG.CASH</title>
      </Head>
      <HomeContainer>
        <Header>
          <div className="content">
            <div className="wrapper">
              <Logo src="/logo.png" alt="Logo da NG.CASH" />
              <GreetingsText>
                Olá, <span>@{user?.username}</span>
              </GreetingsText>
              <BalanceText>{mascaraBRL(user?.balance)}</BalanceText>
            </div>
            <button onClick={signOut}>
              <SignOut size={32} weight="bold" color={theme.colors.white} />
            </button>
          </div>
        </Header>
        <Content>
          <TransferenceSection />
          <TransactionsSection />
        </Content>
      </HomeContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies["@ngcash:token"];

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
