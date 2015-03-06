var express = require('express'),
lists = require('./routes/shoppinglist');
var cors = require('cors'); 
var app = express();

app.configure(function () {
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
	app.use(cors());
});
 
app.get('/shoppinglists', lists.findAll);
app.get('/shoppinglists/:id', lists.findById);
app.post('/shoppinglists', lists.add);
app.put('/shoppinglists/:id', lists.update);
app.delete('/shoppinglists/:id', lists.delete);
 
app.listen(3000);
console.log('Listening on port 3000...');
