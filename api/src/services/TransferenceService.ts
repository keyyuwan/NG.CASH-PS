import { prisma } from "../database/prismaClient";

interface ITransferenceRequest {
  recipientUsername: string;
  value: number;
  accountId: string;
}

export class TransferenceService {
  async execute({ recipientUsername, value, accountId }: ITransferenceRequest) {
    const recipientUser = await prisma.user.findUnique({
      where: {
        username: recipientUsername,
      },
    });

    if (!recipientUser) {
      throw new Error(
        "O usuário ao qual você está tentando transferir não existe."
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        accountId,
      },
    });

    if (user?.username === recipientUsername) {
      throw new Error(
        "Não é permitido realizar uma transferência para si mesmo."
      );
    }

    if (value <= 0) {
      throw new Error("Insira um valor para ser transferido.");
    }

    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (account && account.balance < value) {
      throw new Error(
        "Você não tem saldo suficiente para realizar a transferência."
      );
    }

    // Busca a account do usuário que irá receber o dinheiro
    const recipientAccount = await prisma.account.findUnique({
      where: {
        id: recipientUser.accountId!,
      },
    });

    // Atualiza balance do usuário que enviou o dinheiro
    await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: account?.balance! - value,
      },
    });

    // Atualiza balance do usuário que recebeu o dinheiro
    await prisma.account.update({
      where: {
        id: recipientUser.accountId!,
      },
      data: {
        balance: recipientAccount!.balance + value,
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        value,
        debitedAccountId: recipientUser.accountId!,
        creditedAccountId: accountId,
      },
    });

    return transaction;
  }
}
