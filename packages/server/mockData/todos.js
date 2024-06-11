const { generateId } = require('../libs/uuid');

class Todo {
    #todoMap = new Map();
    #lastId = null;

    get todos() {
        return [...this.#todoMap.values()]
    }

    get lastId() {
        return this.#lastId;
    }

    constructor(todos) {
        this.#initialize(todos);
    }
    
    #initialize(todos) {
        todos?.forEach(todo => {
            this.#todoMap.set(todo.id, todo);
        })
    }
    add(todo) {
        this.#lastId = generateId();

        this.#todoMap.set(this.#lastId, this.#createNewTodo(todo));
    }
    #createNewTodo(todo) {
        return {
            completed: false,
            ...todo,
            id: this.#lastId
        }
    }
    modify(todo) {
        const oldTodo = this.#todoMap.get(todo.id);
        this.#todoMap.set(todo.id, {
            ...oldTodo,
            ...todo
        });
    }
    delete(id) {
        this.#todoMap.delete(id);
    }
    toggleCompleted(id) {
        const todo = this.#todoMap.get(id);

        this.#todoMap.set(id, {
            ...todo,
            completed: !todo.completed
        });
    }
}

module.exports = {
    makeTodoInstance: (props) => new Todo(props)
}