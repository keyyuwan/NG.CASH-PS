import { prisma } from "../database/prismaClient";

export class ListAccountDataService {
  async execute(accountId: string) {
    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return account;
  }
}
