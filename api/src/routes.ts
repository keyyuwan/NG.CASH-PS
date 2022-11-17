import { Router } from "express";

import { ensureAuthenticated } from "./middlewares/auth";

import { AuthUserController } from "./controllers/AuthUserController";
import { ListAccountDataController } from "./controllers/ListAccountDataController";
import { RegisterUserController } from "./controllers/RegisterUserController";
import { TransferenceController } from "./controllers/TransferenceController";
import { ListAccountTransactionsController } from "./controllers/ListAccountTransactionsController";

export const router = Router();

const registerUserController = new RegisterUserController();
const authUserController = new AuthUserController();
const listAccountDataController = new ListAccountDataController();
const transferenceController = new TransferenceController();
const listAccountTransactionsController =
  new ListAccountTransactionsController();

router.get(
  "/api/account",
  ensureAuthenticated,
  listAccountDataController.handle
);
router.get(
  "/api/transactions",
  ensureAuthenticated,
  listAccountTransactionsController.handle
);

router.post("/api/register", registerUserController.handle);
router.post("/api/login", authUserController.handle);

router.post(
  "/api/transfer",
  ensureAuthenticated,
  transferenceController.handle
);
