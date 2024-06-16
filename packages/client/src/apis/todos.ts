import { Todo } from "../types";

const BASE_URL = '/todos';

const todos = {
    fetchTodos() {
        return {
            method: 'GET',
            url: BASE_URL
        }
    },
    fetchUIConfig() {
        return {
            method: 'GET',
            url: `${BASE_URL}/ui-config`
        }
    },
    add(text: string) {
        return {
            method: 'POST',
            url: BASE_URL,
            body: {
                text
            }
        }
    },
    modify(todo: Todo) {
        return {
            method: 'PUT',
            url: `${BASE_URL}/${todo.id}`,
            body: todo
        }
    },
    delete(id: string) {
        return {
            method: 'DELETE',
            url: `${BASE_URL}/${id}`,
        }
    },
    toggleCompleted(id: string) {
        return {
            method: 'PUT',
            url: `${BASE_URL}/completed/${id}`
        }
    }
}

export default todos;