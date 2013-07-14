var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var definitions = require('./configure.json');


var Post = new Schema({
	user : Object,
	content: String,
	published: Date,
	tags: Array,
	Images: Array
}, { strict: false });

var User = new Schema({}, { strict: false });
var Venue = new Schema({}, { strict: false });
var Artist = new Schema({},{ strict: false });
var Session = new Schema({},{ strict: false});

User.method('authenticate', function (usersession) {
	
	var object = this.toObject();
    return usersession.password == object.password.toString();
  
  });

Post.method('consolePost', function(){
	console.log(this.toObject());
});

mongoose.model('Post', Post);
mongoose.model('User', User);
mongoose.model('Artist', Artist);
mongoose.model('Venue', Venue);
mongoose.model('Session', Session);

mongoose.connect( definitions.dbConnect );

