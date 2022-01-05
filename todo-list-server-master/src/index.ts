import { initializeTodoService } from './modules/todo/todo.container';
import { ITodo } from './modules/todo/interfaces';
import { RamMemory } from './db/RAM-memory';
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import config from "./config";

export const app = express();
app.use(bodyParser.json());
app.use(cors());

initializeTodoService(new RamMemory<ITodo>())

import "./modules/todo/todo.controller";
import "./modules/todo-list/todo-list.controller";

// Start server
app.listen(config.serverPort, () => {
  console.log(
    `Server started at: http://${config.serverAddress}:${config.serverPort}`
  );
});
