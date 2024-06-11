import { useEffect } from "react";
import { useTodoStateContext } from "../../providers"
import TodosItem from "./TodosItem";

export default function TodosList() {
    const { currentTodos } = useTodoStateContext();

    return (
      <ul className='todos-list'>
        {currentTodos?.map(todo => <TodosItem key={todo.id} {...todo} />)}
      </ul>
    )
  }
  