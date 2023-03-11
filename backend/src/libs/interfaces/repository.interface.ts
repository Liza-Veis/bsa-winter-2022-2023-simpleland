interface IRepository<T = unknown> {
  findById(id: number): Promise<T>;
  findAll(): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(id: number): Promise<boolean>;
}

export { type IRepository };
