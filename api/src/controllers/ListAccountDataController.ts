import { Request, Response } from "express";
import { ListAccountDataService } from "../services/ListAccountDataService";

export class ListAccountDataController {
  async handle(req: Request, res: Response) {
    const { accountId } = req;

    const listAccountDataService = new ListAccountDataService();

    const account = await listAccountDataService.execute(accountId);

    return res.json(account);
  }
}
