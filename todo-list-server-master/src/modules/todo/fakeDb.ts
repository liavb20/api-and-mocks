import { DbDocument, IDB } from "db/interfaces";
import { ITodo } from "./interfaces";
import { listId } from './todo.service.spec';


export const fakeDB: IDB<ITodo> = {
    get: jest.fn((id: string) : DbDocument<ITodo> => {
        return {id: id , task: 'sucssess', listId: listId, isCompleted: false };
    }),
    getAll: jest.fn(() : DbDocument<ITodo>[] => {
        return [{id: '123456' , task: 'sucssess', listId: '654321', isCompleted: false },
                {id: '666', task: 'sleep', listId: '555', isCompleted: false}];
    }),
    add: jest.fn((entities: DbDocument<ITodo> | DbDocument<ITodo>[]) : DbDocument<any>[] => {
        return [entities];
    }),
    edit: jest.fn((entity: DbDocument<ITodo>) : DbDocument<ITodo> => {
        return entity;
    }), 
    remove: jest.fn((id: string) : DbDocument<ITodo> => {
        return fakeDB.get(id);
    })
};