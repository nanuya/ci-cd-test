import { TODOS_COUNT_KEY, TODOS_NAV, TODOS_VAN_LABEL } from "../../constants"
import { useTodosActionContext, useTodoStateContext } from "../../providers";
import { TodosNavType } from "../../types";

const navs = Object.values(TODOS_NAV);

export default function TodosNav() {
    const { currentTab, count } = useTodoStateContext();
    const { changeCurrentTab } = useTodosActionContext();

    const handleNavBtnClick = (currentTab: TodosNavType) => {
        changeCurrentTab(currentTab);
    }

    return (
      <nav className='todos-nav'>
        {
          navs.map(nav => <button className={`todos-nav__tab ${currentTab === nav ? 'active' : ''}`} key={nav} type="button" onClick={() => handleNavBtnClick(nav)}>{TODOS_VAN_LABEL[nav]} ({count[TODOS_COUNT_KEY[nav]]})</button>)
        }
      </nav>
    )
  }