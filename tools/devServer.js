/* eslint-disable no-console */

// imports for server
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

// imports for server side render
import React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match} from 'react-router';
import routes from '../src/routes';
import {Provider} from 'react-redux';
import configureStore from '../src/store/configureStore';
import todoApi from '../src/api/todoListApi';
import todoLevels from '../src/api/todoLevelApi';


const port = 8080;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(function (req, res, next) {
  res.header("Content-Type", "text/html; charset=utf-8");
  next();
});

app.get('*', function(req, res) {  
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end('Internal server error');
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      return res.status(404).end('Not found.');
    }

    // initalize store
    Promise.all([
      todoApi.getAllTodo()
    ]).then((values) => {
      const store = configureStore({
        todoList: values[0],
        levels: todoLevels
      });
      const body = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const state = store.getState();
      res.end(renderFullPage(body, state)); 

    }).catch((err) => res.end(err));
  });
  
});

function renderFullPage(body, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <link rel="stylesheet" type="text/css" href="/styles.css">
      </head>
      <body>
        <div id="app">${body}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});