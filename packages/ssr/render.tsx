import express, { Request, Response } from 'express';
import path, { resolve } from 'path';
import React, { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server'
import App from '../client/src/App';
import { readFile } from 'fs';

import cors from 'cors';
import { config } from 'dotenv';

const { parsed: { PORT, CLIENT_STATIC_PATH, CLIENT_LANDING_PATH }} = config();

const app = express();
app.use(cors());
app.use(express.json());


const getHtml = (req: Request, res: Response) => {
  readFile(path.resolve(CLIENT_LANDING_PATH), 'utf-8', (err, data) => {
      if (err) {
          console.log(err);
          return res.status(500).send('Error!')
      }
      const html = renderToString(
          <StaticRouter location={req.url}>
              <App />
          </StaticRouter>
      );
      return res.send(data.replace('<div id="root"></div>', `<div id="root">${html}</div>`))
  })
}

app.get('/', getHtml);
console.log(resolve(__dirname));
console.log(__dirname);
app.use(express.static(resolve(__dirname)));

app.get("/", (req,res)=>{
  return res.send("ExpressJS running successfully")
});

app.listen(PORT, () => {
    console.log(`SSR server is running on port ${PORT}`);
  });