
var express = require('express');
var swig = require('swig');
var path = require('path');
var index = require('./routes/index');

var app = express();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));
swig.setDefaults({cache: false});
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', index);

var debug = require('debug')('plot');
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('server listening on port ' + server.address().port);
});

module.exports = app;