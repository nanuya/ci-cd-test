import { ChangeEventHandler, KeyboardEventHandler, useRef, useState } from "react";
import { useTodosActionContext } from "../../providers"
import { Nullable, Todo } from "../../types";

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

    const saveText = (_text: Nullable<string>) => {
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

    const handleTextKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key === 'Enter') {

        
        event.preventDefault();

        const currentEl = textRef?.current;

        if (!currentEl) {
          return;
        }
        
        saveText(currentEl.textContent);

        currentEl.blur();

      }
    }

    const handleDeleteBtnClick = () => {
        deleteTodo(id);
    }

    return (
      <li className="todos-item">
        <input id={id} type="checkbox" onChange={handleCompletedToggle} checked={completed} />
        <label className="todos-item__checkbox checkbox" htmlFor={id}></label>
        {
          completed ? <span className="todos-item__text"><del>{_text}</del></span> : <span className="todos-item__text" ref={textRef} contentEditable={!completed} suppressContentEditableWarning={!completed} onKeyDown={handleTextKeyDown}>{_text}</span>
        }
        { !completed && <button className="todos-item__delete-btn" type='button' onClick={handleDeleteBtnClick}>삭제</button> }
      </li>
    )
  }
  