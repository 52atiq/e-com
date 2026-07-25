import express from "express";
import cors from "cors";
import helmet from "helmet";

import router from "./routes";
import notFound from "./middlewares/notFound.middleware";
import globalErrorHandler from "./middlewares/error.middleware";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
// সব route-এর পরে
app.use(notFound);

// সবশেষে
app.use(globalErrorHandler);

export default app;
