const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
// const cors = require('cors');
const router = require('./backend/router');
// app dependencies
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.develop.js');
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(router);
app.use('/api', router);

app.get('*', function response(req, res) {
    res.write(middleware.fileSystem
        .readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
});
// Server
app.listen(3000, '0.0.0.0', function onStart(err) {
    if (err) {
        console.error(err);
    }
    console.info(
        '==> 🌎 Open up http://0.0.0.0:%s/ in your browser.',
        3000
    );
});