import express from "express";
import cors from "cors";
import "express-async-errors";

import { router } from "./routes";
import { errorMiddleware } from "./middlewares/error";

const PORT = 3333;
const HOST = "0.0.0.0";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(errorMiddleware);

app.listen(PORT, HOST, () => console.log("Server running on port 3333"));
