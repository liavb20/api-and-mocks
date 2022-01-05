import { paramsId } from "common/interfaces";
import { app } from "../../index";
import { todoListService } from "./todo-list.service";
import {ITodoList} from "./interfaces";

app.get("/todo-list/", (req, res) => {
  res.send(todoListService.getAll());
});

app.get("/todo-list/:id", (req: paramsId, res) => {
  res.send(todoListService.get(req.params.id));
});

app.post("/todo-list/", (req: {body: ITodoList}, res) => {
  res.send(todoListService.add(req.body)[0]);
});

app.delete("/todo-list/:id", (req: paramsId, res) => {
  res.send(todoListService.remove(req.params.id));
});
