import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { prisma } from "../database/prismaClient";

interface IUser {
  username: string;
  password: string;
}

export class AuthUserService {
  async execute({ username, password }: IUser) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        account: {
          select: {
            balance: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Username ou senha incorretos");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Username ou senha incorretos");
    }

    const token = sign(
      {
        id: user.id,
      },
      process.env.JWT_PASS ?? "",
      {
        subject: user.accountId,
        expiresIn: "1d",
      }
    );

    const userData = {
      id: user.id,
      username: user.username,
      accountId: user.accountId,
      balance: user.account?.balance,
    };

    return { token, userData };
  }
}
