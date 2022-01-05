export interface IDB<TEntity> {
  get(id: string): DbDocument<TEntity>;
  getAll(): DbDocument<TEntity>[];
  add(entities: DbDocument<TEntity> | DbDocument<TEntity>[]): DbDocument<TEntity>[];
  edit(entity: DbDocument<TEntity>): DbDocument<TEntity>;
  remove(id: string): DbDocument<TEntity>;
}

export type DbDocument<TEntity> = HasId & TEntity;
export type HasId = { id: string };
