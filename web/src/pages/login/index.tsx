import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

import loginImage from "../../assets/ng_login.svg";

import {
  LoginContainer,
  Content,
  Logo,
  Title,
  Form,
  PageImageContainer,
  PageImage,
  GoToRegisterText,
} from "./styles";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    await signIn({
      username,
      password,
    });
  }

  return (
    <>
      <Head>
        <title>Login | NG.CASH</title>
      </Head>
      <LoginContainer>
        <PageImageContainer>
          <PageImage src={loginImage.src} alt="Ilustração" />
        </PageImageContainer>
        <Content>
          <Logo src="/logo.png" alt="Logo da NG.CASH" />
          <Title>
            Login | <span>NG.CASH</span>
          </Title>

          <Form onSubmit={handleSignIn}>
            <Input
              label="Username"
              value={username}
              onChange={(event) =>
                setUsername(
                  (event.target as HTMLInputElement).value.toLowerCase()
                )
              }
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword((event.target as HTMLInputElement).value)
              }
            />
            <Button title="Entrar" type="submit" />
          </Form>

          <GoToRegisterText>
            Ainda não tem uma conta?{" "}
            <Link href="/cadastro">Cadastre-se aqui</Link>
          </GoToRegisterText>
        </Content>
      </LoginContainer>
    </>
  );
}
