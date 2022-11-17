import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/auth";

import { AuthUserController } from "./controllers/AuthUserController";
import { ListAccountDataController } from "./controllers/ListAccountDataController";
import { RegisterUserController } from "./controllers/RegisterUserController";
import { TransferenceController } from "./controllers/TransferenceController";

export const router = Router();

const registerUserController = new RegisterUserController();
const authUserController = new AuthUserController();
const listAccountDataController = new ListAccountDataController();
const transferenceController = new TransferenceController();

router.get(
  "/api/account",
  ensureAuthenticated,
  listAccountDataController.handle
);

router.post("/api/register", registerUserController.handle);
router.post("/api/login", authUserController.handle);

router.post(
  "/api/transfer",
  ensureAuthenticated,
  transferenceController.handle
);
