var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Todo = new Schema({
	user_id : String,
	content: String,
	update_at: Date
});

var user = new Schema({
	email: String,
	user_name: String,
	password: String, 
	joined: Date
});

mongoose.model('Todo', Todo);
mongoose.connect('mongodc://localhost/express-todo');