var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var definitions = require('./configure.json');


var Todo = new Schema({
	user_id : String,
	content: String,
	update_at: Date
}, { strict: false });

var User = new Schema({}, { strict: false });
var Venue = new Schema({}, { strict: false });
var Artist = new Schema({},{ strict: false });

mongoose.model('Todo', Todo);
mongoose.model('User', User);
mongoose.model('Artist', Artist);
mongoose.model('Venue', Venue);
mongoose.connect( definitions.dbConnect );

