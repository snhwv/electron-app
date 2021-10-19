import fs from 'fs';
import path from 'path';

let express = require('express');
let app = express();

app.get('/', function (req, res) {
  res.send('Hello world! Lala Seth is here!');
});
let server = app.listen(3000, function () {
  console.log('Express server listening on port ' + server.address().port);
});

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
      let route =
        file in special
          ? special[file]
          : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/');
      let question = require('../NeteaseCloudMusicApi/module/' + file);
      let request = require('../NeteaseCloudMusicApi/util/request');

      app.use(route, (req, res) => {
        let query = Object.assign(
          {},
          req.query,
          req.body,
          { cookie: req.cookies },
          // { proxy }
        );
        question(query, request)
          .then((answer) => {
            res.append('Set-Cookie', answer.cookie);
            res.status(answer.status).send(answer.body);
          })
          .catch((answer) => {
            if (1 && answer.body && answer.body.code && answer.status !== 200) {
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

module.exports = app;
