import { addDays } from "date-fns";
import { prisma } from "../database/prismaClient";

interface ITransactionsRequest {
  accountId: string;
  date?: string;
  type?: "cashIn" | "cashOut";
}

export class ListAccountTransactionsService {
  async execute({ accountId, date, type }: ITransactionsRequest) {
    const accountTransactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            debitedAccountId: accountId,
          },
          {
            creditedAccountId: accountId,
          },
        ],
        createdAt: date
          ? {
              lte: addDays(new Date(date), 1),
              gte: date,
            }
          : {},
        NOT:
          type === "cashIn"
            ? { creditedAccountId: accountId }
            : type === "cashOut"
            ? { debitedAccountId: accountId }
            : {},
      },
      include: {
        debitedAccount: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        creditedAccount: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return accountTransactions;
  }
}
