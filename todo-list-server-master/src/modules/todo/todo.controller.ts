import TodoService from "./todo.service";

import { paramsId } from "../../common/interfaces";
import { app } from "../../index";
import { ITodo, ITodoWithoutCompleted } from "./interfaces";
import { todoService } from "./todo.container";

app.get("/todo/", (req, res) => {
  res.send(todoService.getAll());
});

app.get("/todo/:id", (req: paramsId, res) => {
  res.send(todoService.getByID(req.params.id));
});

app.post("/todo/", (req: { body: ITodoWithoutCompleted }, res) => {
  res.send(todoService.add(req.body)[0]);
});

app.delete("/todo/:id", (req: paramsId, res) => {
  res.send(todoService.remove(req.params.id));
});

app.put("/todo/:id", (req: paramsId & { body: Partial<ITodo> }, res) => {
  res.send(todoService.edit(req.params.id, req.body));
});

app.put("/todo/date/:id", (req: paramsId & { body: {finishDate: Date} }, res) => {
  res.send(todoService.editDate(req.params.id, req.body.finishDate));
});

app.delete("/todo/date/:id", (req: paramsId, res) => {
  res.send(todoService.removeDate(req.params.id));
});

app.put("/todo/toggle/:id", (req: paramsId, res) => {
  res.send(todoService.toggle(req.params.id));
});
