import { DbDocument, IDB } from "db/interfaces";
//CR: remove unused imports.
import { ITodo } from "./interfaces";
import TodoService from "./todo.service";
import { ITodoList } from "modules/todo-list/interfaces";
import { todoListService } from "./../../modules/todo-list/todo-list.service";
import {ITodoWithoutCompleted} from './interfaces'
import{fakeDB} from './fakeDb';

//CR: put this inits into before all in describe.
//--------------------
//CR: You are coupling the fake db in this declaration. what if you would try to make another test files using
// the fake db and another id?
export let listId : string = '';

//CR: todoFake is not a great name choice. maybe mockTodoService would be better.
const todoFake = new TodoService(fakeDB);
const todoList : ITodoList = {name: "liav"};

//CR: why are you overriding the value here?
listId = (todoListService.add(todoList))[0].id;
//--------------------
describe('learn Mocks', () => {
    it('get all', () => {
        todoFake.getAll()
        expect(fakeDB.getAll).toBeCalled();
    });
    it('get by id', ()=> {
        //CR: Put userId init in before each.
        const userId : string = 'doesnt matter which string because the mock';
        todoFake.getByID(userId)
        expect(fakeDB.get).toBeCalledWith(userId);
    });

    
    it('add', ()=> {
        //CR: Put listToTodo init in before each.
        const listToTodo : ITodoWithoutCompleted= {listId: listId, task: "Stay Home"};
        const objKeys : object = Object.keys(todoFake.add(listToTodo)[0]);
        expect(fakeDB.add).toBeCalledTimes(1);
        expect(objKeys).toEqual(['listId', 'task', 'isCompleted', 'id']);
    });
    it('edit task', () => {
        //CR: Put listToTodo init in before each.
        const listToTodo : ITodoWithoutCompleted = {listId: listId, task: "Stay Home"};
        //CR: Put userId init in before each.
        const userId : string = (todoFake.add(listToTodo)[0].id);
        const newTask : Partial<ITodo> = {task : 'finish the mock'}

        expect(todoFake.edit(userId, newTask).task).toEqual(newTask.task);
        expect(todoFake.edit(userId, newTask).id).toEqual(userId);
    });
    it('remove task', () => {
        //CR: Put listToTodo init in before each.
        const listToTodo : ITodoWithoutCompleted= {listId: listId, task: "Stay Home"};
        //CR: Put userId init in before each.
        const userId : string = (todoFake.add(listToTodo)[0].id);        
        todoFake.remove(userId);
        expect(fakeDB.get).toBeCalledWith(userId);
        expect(fakeDB.remove).toBeCalledWith(userId)
    });
    it('completed', () => {
        //CR: Put listToTodo init in before each.
        const listToTodo: ITodoWithoutCompleted = {listId: listId, task: "Stay Home"};
        //CR: Put userId init in before each.
        const userId: string = (todoFake.add(listToTodo)[0].id); 
        const todoBeforeChanges : ITodo = todoFake.getByID(userId);
        todoBeforeChanges.isCompleted = true;
        const response = todoFake.toggle(userId)
        expect(response).toEqual(todoBeforeChanges);
    });
    it('edit date', () => {
        //CR: Put listToTodo init in before each.
        const listToTodo: ITodoWithoutCompleted = {listId: listId, task: "Stay Home"};
        //CR: Put userId init in before each.
        const userId: string = (todoFake.add(listToTodo)[0].id); 
        const date : Date = new Date (2017, 4, 10, 17, 23, 42, 11);
        expect(Object.keys(todoFake.getByID(userId))).not.toContain('finishDate')
        const response = todoFake.editDate(userId, date);
        expect(Object.keys(response)).toContain('finishDate');
        //CR: response2 - not a good var name.
        const response2 = todoFake.editDate(userId, new Date (2020, 6, 18, 12, 22,40,12));
        expect(response2.finishDate).not.toEqual(response.finishDate);
        delete response2.finishDate;
        delete response.finishDate;
        expect(response2).toEqual(response);
        expect(response2).toEqual(todoFake.getByID(userId));
    });
});
 