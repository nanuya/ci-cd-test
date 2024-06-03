const express = require('express');
const { resolve } = require('path');
const app = express();
const PORT = 9090;

app.use(express.static(resolve(__dirname, '../client/build')));
app.get('/', (req, res) => {
    console.log(resolve(__dirname, '../client/build/index.html'));
    res.sendFile(resolve(__dirname, '../client/build/index.html'));
});

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});