import express from "express";
import helmet from "helmet";
import cors from "cors";
import { router } from "./routes";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import bodyParser from "body-parser";

const port = process.env.PORT;
const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: "GET,HEAD,POST,PUT,DELETE",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`[server]: application started on http://localhost:${port}`);
});
