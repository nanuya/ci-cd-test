const { makeTodoInstance } = require("../mockData/todos");
const todoInstance = makeTodoInstance();

const BASE_URL = '/todos'

module.exports = (app) => {
    app.get(BASE_URL, (_, res) => {
        res.status(200).json({
            todos: todoInstance.todos
        })
    });

    app.post(BASE_URL, ({ body }, res) => {
        todoInstance.add(body);

        res.status(201).json({
            id: todoInstance.lastId
        });
    });

    app.put(`${BASE_URL}/:id`, ({ body, params }, res) => {
        todoInstance.modify(body);

        res.status(201);
    });

    app.delete(`${BASE_URL}/:id`, ({params}, res) => {
        todoInstance.delete(params.id);

        res.status(204);
    });
}