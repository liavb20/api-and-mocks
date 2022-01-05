import { v4 as uuidv4 } from "uuid";
import { DbDocument, IDB } from "db/interfaces";
import { RamMemory } from "../../db/RAM-memory";
import { ITodoList } from "./interfaces";
import { todoService } from "../todo/todo.container";

class TodoListService {
  private db: IDB<ITodoList>;

  constructor() {
    this.db = new RamMemory<ITodoList>();
  }

  getAll(): DbDocument<ITodoList>[] {
    return this.db.getAll();
  }

  get(id: string): DbDocument<ITodoList> {
    return this.db.get(id);
  }

  add(list: ITodoList): DbDocument<ITodoList>[] {
    if (this.isExistByName(list.name)) {
      throw new Error(`List with name '${list}' already exist.`);
    }
    return this.db.add({ ...list, id: uuidv4() });
  }

  edit(id: string, list: ITodoList): DbDocument<ITodoList> {
    return this.db.edit({ ...list, id });
  }

  removeByName(listName: string): DbDocument<ITodoList> {
    const item = this.db.getAll().filter((e) => e.name === listName)[0];
    return this.remove(item?.id);
  }

  remove(id: string): DbDocument<ITodoList> {
    todoService.getAll().forEach((todo) => {
      if (todo.listId === id) {
        todoService.remove(todo.id);
      }
    });
    return this.db.remove(id);
  }

  isExistByName(listName: string): boolean {
    return !!this.db.getAll().filter((e) => e.name === listName).length;
  }
}

export const todoListService = new TodoListService();
