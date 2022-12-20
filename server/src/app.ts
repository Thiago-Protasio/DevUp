import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { routes } from "./routes";
import cors from 'cors';

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use(cors())

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    response.status(400).json({
      message: err.message
    })
  }
})

export { app };