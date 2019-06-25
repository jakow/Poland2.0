// Create hooks for the API
// type UpdateHook = (prevState: Question, nextState: Question) => void;
// type ReadHook = (data: Question | Question[]) => void;
import {EventEmitter} from 'events';

type HookName = 'create'| 'read' | 'update' | 'delete';
type CreateHook<T> = (data: T) => void;
type ReadHook<T> = (data: T | T[]) => void;
type UpdateHook<T> = (prevState: T, nextState: T) => void;
type DeleteHook<T> = (data: T) => void;
type HookType<T> = CreateHook<T> | ReadHook<T> | UpdateHook<T> | DeleteHook<T>;
interface Hooks<T> {
  update: UpdateHook<T>;
  read: ReadHook<T>;
  delete: DeleteHook<T>;
  create: CreateHook<T>;
}

export default class ApiHookEmitter<T> extends EventEmitter {
  public on(hook: 'create', listener: CreateHook<T>): this;
  public on(hook: 'read', listener: ReadHook<T>): this;
  public on(hook: 'update', listener: UpdateHook<T>): this;
  public on(hook: 'delete', listener: DeleteHook<T>): this;
  public on(hook: string, listener: (...args: any[]) => void) {
    return super.on(hook, listener);
  }

  public emit(hook: 'create' | 'delete', data: T): boolean;
  public emit(hook: 'read', data: T | T[]): boolean;
  public emit(hook: 'update', prevState: T, nextState: T): boolean;
  public emit(hook: string, ...args: any[]) {
    return super.emit(hook, ...args);
  }
}
