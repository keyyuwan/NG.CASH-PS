import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const authUserService = new AuthUserService();

    const { token, userData } = await authUserService.execute({
      username,
      password,
    });

    return res.json({ token, user: userData });
  }
}
