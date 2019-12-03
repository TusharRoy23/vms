import Express from 'express';
import Mongoose from "mongoose";
import path from 'path';

import config from '@config';
import v1Router from '@routes';

import Webpack from 'webpack';
import WebpackConfig from '../webpack.config';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import BodyParser from 'body-parser';

const session = require("express-session");

// const multer = require("multer");
// const gm = require("gm").subClass({
//     imageMagick: true
// });

Mongoose.connect(config.databaseUrl, { useNewUrlParser: true });

const app = Express();

const compiler = Webpack(WebpackConfig);

app.use(WebpackDevMiddleware(compiler, {
    hot: true,
    publicPath: WebpackConfig.output.publicPath
}));

app.use(WebpackHotMiddleware(compiler));

var sessionMiddleware = session({
    secret: 'rahsutyor',
    resave: false,
    saveUninitialized: false
});

app.use(sessionMiddleware);

app.use(BodyParser.json());

app.listen(3000, () => {
    console.log('server successfully started !');
});

global.uploadFolder = path.resolve(__dirname, 'public/images');

app.use(v1Router);

app.use(Express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) => { // all routes to component will go through from here
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});