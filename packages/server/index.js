const express = require('express');

const {parsed: { PORT }} = require('dotenv').config();

const app = express();

const middleware = require('./libs/middleware');
const router = require('./routes/index');

middleware(app);
router(app);

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});