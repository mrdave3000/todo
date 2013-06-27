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
mongoose.model('User', User);
mongoose.connect( definitions.dbConnect );