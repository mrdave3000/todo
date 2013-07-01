var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var definitions = require('./configure.json');


var Todo = new Schema({
	user_id : String,
	content: String,
	update_at: Date
});

var User = new Schema({
	email: String,
	user_name: String,
	password: String, 
	joined: Date
});

mongoose.model('Todo', Todo);
<<<<<<< HEAD
mongoose.model('User', User);
mongoose.connect( definitions.dbConnect );
=======
mongoose.model('User', User)
mongoose.connect('mongodc://localhost/express-todo');
>>>>>>> d20525b7b19e104380f460b9308bd3cb6ead5a2b
