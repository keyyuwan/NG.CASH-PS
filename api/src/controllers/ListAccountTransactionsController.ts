import { Request, Response } from "express";
import { ListAccountTransactionsService } from "../services/ListAccountTransactionsService";

interface IQueryParams {
  date?: string;
  type?: "cashIn" | "cashOut";
}
export class ListAccountTransactionsController {
  async handle(req: Request, res: Response) {
    const { accountId } = req;
    const { date, type } = req.query as IQueryParams;

    const listAccountTransactionsService = new ListAccountTransactionsService();

    const accountTransactions = await listAccountTransactionsService.execute({
      accountId,
      date,
      type,
    });

    return res.json(accountTransactions);
  }
}
