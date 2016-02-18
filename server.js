var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var express = require('express');
var app = express();
var api = require('./controllers/api');
var admin = require('./controllers/admin');
var pages = require('./controllers/pages');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({ name: 'session',
	keys: ['sid', 'key2']
} ));

app.use(express.static(__dirname + '/public'));
app.use('/', pages);
app.use('/api', api);
app.use('/admin', admin);

app.listen(3000);