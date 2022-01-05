import TodoService  from './todo.service';
import { IDB } from '../../db/interfaces';
import { ITodo } from './interfaces';

export let todoService: TodoService;

export const initializeTodoService = (db: IDB<ITodo>): void => {
    todoService = new TodoService(db);
}