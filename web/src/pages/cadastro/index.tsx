import { FormEvent, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { Button } from "../../components/Button";
import { Input } from "../../components/Form/Input";
import { toastOptions } from "../../utils/toastify";
import { api } from "../../libs/api";

import registerImage from "../../assets/ng_register.svg";

import {
  RegisterContainer,
  PageImage,
  Content,
  Logo,
  Title,
  Form,
  PageImageContainer,
  GoToLoginText,
} from "./styles";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post("/register", {
        username,
        password,
      });
      toast.success("Sua conta foi cadastrada!", toastOptions);
      Router.push("/login");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.log(error);
      toast.error(error.response?.data.error as string, toastOptions);
    }
  }

  return (
    <>
      <Head>
        <title>Cadastro | NG.CASH</title>
      </Head>
      <RegisterContainer>
        <Content>
          <Logo src="/logo.png" alt="Logo da NG.CASH" />
          <Title>
            Faça seu cadastro na <span>NG.CASH</span>!
          </Title>

          <Form onSubmit={handleRegister}>
            <Input
              label="Username"
              helperText="Deve conter pelo menos 3 caracteres"
              value={username}
              onChange={(event) =>
                setUsername(
                  (event.target as HTMLInputElement).value.toLowerCase()
                )
              }
            />
            <Input
              label="Senha"
              helperText="Deve conter pelo menos 8 caracteres, 1 letra maiúscula e 1 número"
              value={password}
              onChange={(event) =>
                setPassword((event.target as HTMLInputElement).value)
              }
            />
            <Button title="Cadastrar" type="submit" />
          </Form>
          <GoToLoginText>
            Já tem uma conta? <Link href="/login">Entre aqui</Link>
          </GoToLoginText>
        </Content>
        <PageImageContainer>
          <PageImage
            src={registerImage.src}
            alt="Ilustração de um porquinho de moedas"
          />
        </PageImageContainer>
      </RegisterContainer>
    </>
  );
}
