export interface ITodo extends ITodoWithoutCompleted {
  isCompleted: boolean;
}

export interface ITodoWithoutCompleted {
  listId: string;
  task: string;
  finishDate?: Date;
}