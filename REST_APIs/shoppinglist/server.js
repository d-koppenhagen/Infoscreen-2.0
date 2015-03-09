var express = require('express'),
lists = require('./routes/shoppinglist');
var cors = require('cors');
var app = express();

app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
	app.use(cors());
});

app.get('/list', lists.findAll);
app.get('/list/:id', lists.findById);
app.post('/list', lists.add);
app.put('/list/:id', lists.update);
app.delete('/list/:id', lists.delete);

app.listen(3000);
console.log('Listening on port 3000...');
