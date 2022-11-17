import express from "express";
import cors from "cors";
import "express-async-errors";

import { router } from "./routes";
import { errorMiddleware } from "./middlewares/error";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(errorMiddleware);

app.listen(3333, () => console.log("Server running on port 3333"));
