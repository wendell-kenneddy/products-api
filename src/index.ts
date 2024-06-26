import express from "express";
import helmet from "helmet";
import { router } from "./routes";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

const port = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`[server]: application started on http://localhost:${port}`);
});
