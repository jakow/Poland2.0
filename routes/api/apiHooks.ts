// Create hooks for the API
// type UpdateHook = (prevState: Question, nextState: Question) => void;
// type ReadHook = (data: Question | Question[]) => void;

type HookName = 'create'| 'read' | 'update' | 'delete';
type CreateHook<T> = (data: T) => void;
type ReadHook<T> = (data: T | T[]) => void;
type UpdateHook<T> = (prevState: T, nextState: T) => void;
type DeleteHook<T> = CreateHook<T>;
type HookType<T> = CreateHook<T> | ReadHook<T> | UpdateHook<T> | DeleteHook<T>;
interface Hooks<T> {
  update: UpdateHook<T>;
  read: ReadHook<T>;
  delete: DeleteHook<T>;
  create: CreateHook<T>;
}
export default class ApiHooks<T> {
  private create: Set<CreateHook<T>>;
  private update: Set<UpdateHook<T>>;
  private read: Set<ReadHook<T>>;
  private delete: Set<DeleteHook<T>>;
  constructor() {
    this.create = new Set();
    this.delete = new Set();
    this.update = new Set();
    this.read = new Set();
  }
  public call<Hook extends keyof Hooks<T>>(hookType: Hook, a: T | T[], b?: T) {
    if (Array.isArray(a) && hookType !== 'read') {
      throw new Error(`Cannot call ${hookType} hook with multiple instances`);
    }
    switch (hookType) {
      case 'create':
        this.create.forEach((hook) => hook(a as T));
        break;
      case 'read':
        this.read.forEach((hook) => hook(a));
        break;
      case 'update':
        this.update.forEach((hook) => hook(a as T, b));
        break;
      case 'delete':
        this.delete.forEach((hook) => hook(a as T));
        break;
      default:
        throw new Error('Unknown hook type called');
    }
  }

  public on<Hook extends keyof Hooks<T>>(hookType: Hook, fn: Hooks<T>[Hook]) {
    switch (hookType) {
      case 'create':
        this.create.add(fn as CreateHook<T>);
        break;
      case 'read':
        this.read.add(fn as ReadHook<T>);
        break;
      case 'update':
        this.update.add(fn as UpdateHook<T>);
        break;
      case 'delete':
        this.delete.add(fn as DeleteHook<T>);
        break;
      default:
        throw new Error('Unknown hook type');
    }
  }

  // public off<Hook extends keyof Hooks<T>>(hookType: Hook, fn: Hooks<T>[Hook]) {
  //   //
  // }

}
