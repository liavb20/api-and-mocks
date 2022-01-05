import {v4 as uuidv4} from "uuid";
import {DbDocument, IDB} from "../../db/interfaces";
import {ITodo, ITodoWithoutCompleted} from "./interfaces";
import {todoListService} from "../todo-list/todo-list.service";

class TodoService {
    private db: IDB<ITodo>;

    constructor(db: IDB<ITodo>) {
        this.db = db;
    }

    getByID(id: string): DbDocument<ITodo> {
        return this.db.get(id);
    }

    getAll(): DbDocument<ITodo>[] {
        return this.db.getAll();
    }

    add(todo: ITodoWithoutCompleted): DbDocument<ITodo>[] {
        this.checkIfListExist(todo);
        const newTodo: ITodo = {
            ...todo,
            isCompleted: false,
        };
        return this.db.add({...newTodo, id: uuidv4()});
    }

    edit(id: string, todo: Partial<ITodo>): DbDocument<ITodo> {
        if(todo?.listId){
            this.checkIfListExist(todo);
        }
        const oldTodo: ITodo = this.safeGetById(id);
        const newTodo: ITodo = {
            ...oldTodo,
            ...todo,
        };
        return this.db.edit({...newTodo, id});
    }

    editDate(id: string, finishDate: Date): DbDocument<ITodo> {
        const todo: ITodo = this.safeGetById(id);
        if (!finishDate) {
            throw new Error("finishDate is undefined");
        }

        try {
            todo.finishDate = new Date(finishDate);
            return this.edit(id, todo);
        } catch (err) {
            throw new Error("Invalid date formatting");
        }
    }

    removeDate(id: string): DbDocument<ITodo> {
        const todo: ITodo = this.safeGetById(id);
        if (todo.finishDate) {
            delete todo.finishDate;
        }

        return this.db.edit({...todo, id});
    }

    toggle(id: string): DbDocument<ITodo> {
        const todo: ITodo = this.safeGetById(id);
        todo.isCompleted = !todo.isCompleted;

        return this.edit(id, todo);
    }

    remove(id: string): DbDocument<ITodo> {
        return this.db.remove(id);
    }

    safeGetById(id: string): DbDocument<ITodo> {
        const todo = this.getByID(id);
        if (!todo) {
            throw new Error(`Todo with this id '${id}' does not exist.`);
        }
        return todo;
    }

    private checkIfListExist(todo: { listId?: string }) {
        if (!todo.listId) {
            throw new Error(`property listId does not exist.`);
        }
        const isListExist = todoListService.get(todo.listId);
        if (!isListExist) {
            throw new Error(`List with id '${todo.listId}' does not exist.`);
        }
    }
}

export default TodoService;
