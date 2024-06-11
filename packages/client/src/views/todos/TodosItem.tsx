import { ChangeEventHandler, KeyboardEventHandler, useRef, useState } from "react";
import { useTodosActionContext } from "../../providers"
import { Todo } from "../../types";

export default function TodosItem({
    completed,
    text,
    id
}: Todo) {
    const textRef = useRef<HTMLInputElement>(null);
    const [ _text, setText ] = useState(text);
    const { toggleCompleted, modifyTodo, deleteTodo } = useTodosActionContext();
    
    const handleCompletedToggle = () => {
        toggleCompleted(id);
    }

    const saveText = () => {
      if (!_text) {
        alert('할 일을 입력하세요.');

        setText(text);
        return;
      }

      modifyTodo({
        id,
        text: _text,
        completed
      });
    }

    const handleTextChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
      const value = currentTarget.textContent ?? '';

      setText(value);
    }

    const handleTextKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        textRef?.current?.blur();
        
        saveText();

      }
    }

    const handleDeleteBtnClick = () => {
        deleteTodo(id);
    }

    return (
      <li className="todos-item">
        <input id={id} type="checkbox" onClick={handleCompletedToggle} checked={completed} />
        <label className="todos-item__checkbox checkbox" htmlFor={id}></label>
        {
          completed ? <span className="todos-item__text"><del>{_text}</del></span> : <span className="todos-item__text" ref={textRef} contentEditable={!completed} onChange={handleTextChange} onKeyDown={handleTextKeyDown}>{_text}</span>
        }
        { !completed && <button className="todos-item__delete-btn" type='button' onClick={handleDeleteBtnClick}>삭제</button> }
      </li>
    )
  }
  