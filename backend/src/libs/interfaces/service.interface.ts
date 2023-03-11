interface IService<T = unknown> {
  findAll?(): Promise<{
    items: T[];
  }>;
  findById?(id: number): Promise<T>;
  create?(payload: unknown): Promise<T>;
  update?(id: number, payload: unknown): Promise<T>;
  delete?(id: number): Promise<boolean>;
}

export { type IService };
