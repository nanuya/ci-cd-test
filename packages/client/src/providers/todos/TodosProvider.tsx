import { createContext, useContext, useEffect, useState } from "react";
import api from '../../apis';
import { Todo, TodosActionContextType, TodosStateContextType, FilteredTodosHandler, NonNullableTodoStateContextType, TodosNavType } from "../../types";
import { TODOS_NAV } from "../../constants";

const TodosActionContext = createContext<TodosActionContextType>(null);
const TodosStateContext = createContext<TodosStateContextType>(null);

function TodosProvider({ children }: any) {
  const [ uiConfig, setUIConfig ] = useState<NonNullableTodoStateContextType['uiConfig']>(null);
  const [ allTodos, setAllTodos ] = useState<NonNullableTodoStateContextType['todos']>([]);
  const [ todos, setTodos ] = useState<NonNullableTodoStateContextType['todos']>([]);
  const [ completedTodos, setCompletedTodos ] = useState<NonNullableTodoStateContextType['todos']>([]); 
  const [ currentTodos, setCurrentTodos ] = useState<NonNullableTodoStateContextType['todos']>([]); 
  const [ currentTab, setCurrentTab ] = useState<TodosNavType>(TODOS_NAV.ALL);

  const action: TodosActionContextType = {
    async fetchUIConfig() {
      const data = await api.todos.fetchUIConfig();

      setUIConfig(data);
    },
    async fetchTodos() {
      const { todos }: { todos: Todo[] } = await api.todos.fetchTodos();

      setAllTodos(todos);
      setTodos(todos.filter(({ completed }) => !completed));
      setCompletedTodos(todos.filter(({ completed }) => completed));
    },
    changeCurrentTab(currentTab) {
      setCurrentTab(currentTab);
    },
    async addTodo(text: string) {
      await api.todos.add(text);

      action?.fetchTodos();
    },
    async modifyTodo(todo: Todo) {
      await api.todos.modify(todo);

      action?.fetchTodos();
    },
    async deleteTodo(id: string) {
      await api.todos.delete(id);

      action?.fetchTodos();
    },
    async toggleCompleted(id: string) {
      await api.todos.toggleCompleted(id);

      action?.fetchTodos();
    },
  }

  useEffect(() => {
    switch (currentTab) {
      case 'ALL' :
        setCurrentTodos(allTodos);
        break;
      case 'COMPLETED':
        setCurrentTodos(completedTodos);
        break;
      case 'TODOS':
        setCurrentTodos(todos);
        break;
      default:
        break;
    }
  }, [currentTab, allTodos, completedTodos, todos])

  return (
    <TodosActionContext.Provider value={action}>
      <TodosStateContext.Provider value={{ uiConfig, todos: todos, completedTodos, allTodos, count: { total: allTodos.length, completed: completedTodos.length, todo: todos.length }, currentTab, currentTodos }}>
      {children}
      </TodosStateContext.Provider>
    </TodosActionContext.Provider>
  )
}

export const useTodosActionContext = () => {
    const context = useContext(TodosActionContext);

    if (!context) {
        throw new Error('INVALIDTodosActionContext');
    }

    return context
}

export const useTodoStateContext = () => {
    const context = useContext(TodosStateContext);

    if (!context) {
        throw new Error('INVALIDTodosStateContext');
    }

    return context
}

export default TodosProvider;