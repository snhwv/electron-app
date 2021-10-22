import fs from 'fs';
import path from 'path';
import axios from 'axios';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

let express = require('express');
let app = express();

const port = process.env.API_PORT || 3200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.path !== '/' && !req.path.includes('.')) {
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req?.headers?.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
    });
  }
  req.method === 'OPTIONS' ? res.status(204).end() : next();
});
// app.all('*', (req, res, next) => {
//   // google需要配置，否则报错cors error
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   // 允许的地址,http://127.0.0.1:9000这样的格式
//   if (req.get('Origin')) {
//     res.setHeader('Access-Control-Allow-Origin', req.get('Origin'));
//   }
//   // 允许跨域请求的方法
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'POST, GET, OPTIONS, DELETE, PUT'
//   );
//   // 允许跨域请求header携带哪些东西
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
//   );
//   next();
// });
// axios.defaults.baseURL = `http://localhost:${port}`;

// Set cookie for axios
app.use((req, res, next) => {
  axios.defaults.headers = req.headers;
  next();
});

app.get('/', function (req, res) {
  res.send('Hello world! Lala Seth is here!');
});
const mount = () => {
  const special = {
    'daily_signin.js': '/daily_signin',
    'fm_trash.js': '/fm_trash',
    'personal_fm.js': '/personal_fm',
  };
  fs.readdirSync(path.join(__dirname, `../NeteaseCloudMusicApi/module`))
    .reverse()
    .forEach((file) => {
      if (!/\.js$/i.test(file)) {
        return;
      }

      try {
        // https://stackoverflow.com/questions/42797313/webpack-dynamic-module-loader-by-require
        const route =
          file in special
            ? special[file]
            : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/');
        const question = require('../NeteaseCloudMusicApi/module/' + file);
        const request = require('../NeteaseCloudMusicApi/util/request');

        app.use(route, (req, res) => {
          const query = {
            ...req.query,
            ...req.body,
            cookie: req.cookies,
          };
          question(query, request)
            .then((answer) => {
              res.append('Set-Cookie', answer.cookie);
              res.status(answer.status).send(answer.body);
              return res;
            })
            .catch((answer) => {
              if (
                1 &&
                answer.body &&
                answer.body.code &&
                answer.status !== 200
              ) {
                answer.status = 200;
              }
              res.append('Set-Cookie', answer.cookie);
              res.status(answer.status).send(answer.body);
            });
        });
      } catch (ex) {
        console.error(ex);
      }
    });
};

export default (proxy, callback) => {
  mount(proxy);
  return app.listen(port, callback);
};
