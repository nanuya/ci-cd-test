import { TODOS_NAV } from '../../constants';
import { Nullable } from '../common';

export type NonNullableTodoStateContextType = NonNullable<TodosStateContextType>;

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
}

export type TodosNavType = typeof TODOS_NAV[keyof typeof TODOS_NAV];

export type FilteredTodosHandler = {
    [Property in keyof typeof TODOS_NAV]: (todos: Todo[]) => Todo[]
}

export type TodosActionContextType = Nullable<{
    fetchUIConfig(): Promise<void>;
    fetchTodos(): Promise<void>;
    addTodo(text: string): Promise<void>;
    modifyTodo(todo: Todo): Promise<void>;
    deleteTodo(id: string): Promise<void>;
    toggleCompleted(id: string): Promise<void>;
    changeCurrentTab(currentTab: TodosNavType): void;
}>;

export type TodosStateContextType = Nullable<{
    uiConfig: any;
    allTodos: Todo[];
    completedTodos: Todo[];
    todos: Todo[];
    count: Record<'total' | 'completed' | 'todo', number>;
    currentTab: TodosNavType;
    currentTodos: Todo[];
}>;