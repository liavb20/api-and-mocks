import {DbDocument, IDB} from "./interfaces";

export class RamMemory<TEntity> implements IDB<TEntity> {
    private memory: Record<string, TEntity> = {};

    get(id: string): DbDocument<TEntity> {
        return this.memory[id] ? {id, ...this.memory[id]} : undefined;
    }

    getAll() {
        return Object.keys(this.memory).map(id => ({id: id, ...this.memory[id]}));
    }

    add(entities: DbDocument<TEntity> | DbDocument<TEntity>[]): DbDocument<TEntity>[] {
        const entitiesArray: DbDocument<TEntity>[] = Array.isArray(entities) ? entities : [entities];
        entitiesArray.forEach((entity) => {
            this.memory[entity.id] = entity;
        });
        return entitiesArray;
    }

    edit(entity: DbDocument<TEntity>): DbDocument<TEntity> {
        if (this.memory[entity.id] === undefined) {
            throw new Error(
                `Entity with id '${entity.id}' does not exist in memory.`
            );
        }
        this.memory[entity.id] = entity;
        return entity;
    }

    remove(id: string): DbDocument<TEntity> {
        const returnVal: DbDocument<TEntity> = this.get(id);
        delete this.memory[id];
        return returnVal;
    }
}
