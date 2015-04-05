var express = require('express'),
		lists = require('./routes/shoppinglist'),
		cors = require('cors'),
		bodyParser = require('body-parser'),
		app = express();

var port = 3000;

app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

/* shopping list routes */
app.get('/list', lists.findAll);
app.get('/list/:id', lists.findById);
app.post('/list', lists.add);
app.put('/list/:id', lists.update);
app.delete('/list/:id', lists.delete);
app.delete('/list', lists.deleteAll);

app.listen(port);
console.log('Listening on port '+port);
