const express = require('express');
const { resolve } = require('path');
const { CLIENT_BUILD_PATH } = require('./environment.json');

const app = express();
const PORT = 9090;

app.use(express.static(resolve(__dirname, CLIENT_BUILD_PATH)));
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, `${CLIENT_BUILD_PATH}/index.html`));
});

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});