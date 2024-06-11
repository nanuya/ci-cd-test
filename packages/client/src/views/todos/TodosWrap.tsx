import { useEffect } from "react";
import { TodosProvider, useTodosActionContext } from "../../providers";

function Todos({ children }: any) {
    const { fetchTodos } = useTodosActionContext();

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="todos-wrap">
           <div className="todos">
            { children }
           </div>
        </div>
    )
}

export default function TodosWrap({ children }: any) {
    
    return (
        <TodosProvider><Todos>{children}</Todos></TodosProvider>
    )
}