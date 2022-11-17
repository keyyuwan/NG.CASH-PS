import { hash } from "bcryptjs";
import { prisma } from "../database/prismaClient";

interface IUser {
  username: string;
  password: string;
}

export class RegisterUserService {
  async execute({ username, password }: IUser) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário com este username já existe");
    }

    const isUsernameValid = username.length >= 3;

    if (!isUsernameValid) {
      throw new Error("Username deve ter no mínimo 3 caracteres");
    }

    const hasPassword8CharactersMinimum = password.length >= 8;

    if (!hasPassword8CharactersMinimum) {
      throw new Error("Senha deve ter no mínimo 8 caracteres");
    }

    const hasPasswordAtLeastOneNumber = /\d/.test(password);

    if (!hasPasswordAtLeastOneNumber) {
      throw new Error("Senha deve ter pelo menos 1 número");
    }

    const hasPasswordAtLeastOneCapitalLetter = /[A-Z]/.test(password);

    if (!hasPasswordAtLeastOneCapitalLetter) {
      throw new Error("Senha deve ter pelo menos 1 letra maiúscula");
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        username,
        password: passwordHash,
        account: {
          create: {},
        },
      },
    });

    return user;
  }
}
