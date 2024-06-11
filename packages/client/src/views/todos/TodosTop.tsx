import { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, MouseEventHandler, useState } from "react";
import { useTodosActionContext } from "../../providers"

function TodoTops() {
    const [ text, setText ] = useState('');
    const { addTodo } = useTodosActionContext();

    const resetText = () => {
      setText('');
    }

    const handleSubmitBtnClick: FormEventHandler<HTMLButtonElement> = (event) => {

      event?.preventDefault();

      if (!text) {
        alert('할 일을 입력하세요.');
        return;
      }

      addTodo(text);
      resetText();
    }

    const handleChangeText: ChangeEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
      value && setText(value);
    }

    const handleKeyDownText: KeyboardEventHandler<HTMLInputElement> = (event) => {
      event.key === 'Enter' && handleSubmitBtnClick(event as any);
    }

    return (
      <div className='todos-top'>
        <div className="todos-top__input-box">
          <input className="todos-top__input" type="text" placeholder='할 일을 입력하세요.' value={text} onChange={handleChangeText} onKeyDown={handleKeyDownText} />
          <button className="todos-top__delete-btn" type='button' onClick={resetText}>X</button>
        </div>
        <button className="todos-top__submit-btn" type='submit' onClick={handleSubmitBtnClick}>저장하기</button>
      </div>
    )
  }

export default TodoTops;