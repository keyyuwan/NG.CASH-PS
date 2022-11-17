import { prisma } from "../database/prismaClient";

interface ITransactionsRequest {
  accountId: string;
  date?: Date;
  cashOut?: string;
  cashIn?: string;
}

export class ListAccountTransactionsService {
  async execute({ accountId, date, cashOut, cashIn }: ITransactionsRequest) {}
}
