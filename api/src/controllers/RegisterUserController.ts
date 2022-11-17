import { Request, Response } from "express";
import { RegisterUserService } from "../services/RegisterUserService";

export class RegisterUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const registerUserService = new RegisterUserService();

    const user = await registerUserService.execute({ username, password });

    return res.json(user);
  }
}
