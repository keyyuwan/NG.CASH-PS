import { Request, Response } from "express";
import { TransferenceService } from "../services/TransferenceService";

export class TransferenceController {
  async handle(req: Request, res: Response) {
    const { accountId } = req;
    const { recipientUsername, value } = req.body;

    const transferenceService = new TransferenceService();

    const transaction = await transferenceService.execute({
      recipientUsername,
      value,
      accountId,
    });

    return res.json(transaction);
  }
}
