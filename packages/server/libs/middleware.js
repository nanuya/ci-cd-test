const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const {parsed: { CLIENT_STATIC_PATH, CLIENT_LANDING_PATH }} = require('dotenv').config();

module.exports = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.static(resolve(__dirname, CLIENT_STATIC_PATH)));
    app.get('/', (_, res) => {
        res.sendFile(resolve(__dirname, CLIENT_LANDING_PATH));
    });
}