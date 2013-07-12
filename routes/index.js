
/*
 * GET home page.
 */

//requires
var mongoose = require('mongoose'),
    utils    = require( 'connect' ).utils;

var messages = require('../configure.json');

var browserify = require('browserify');
var webaudio = require('webaudio');

//models
var	Todo = mongoose.model('Todo'),
	User = mongoose.model('User'),
	Artist = mongoose.model('Artist'),
	Venue = mongoose.model('Venue'),
	Session = mongoose.model('Session');


var definitions = require('../config.json');
var fs = require('fs');

 var venueData = {},
	 userData = {},
	 artistData = {};

voidData = function(who){

	who = {};
	console.log("data VOide!");
},

initUserEnvirorment = function(who){

	fs.mkdir('./uploads/'+ who.username , 0777, function (err){
	
	if (!err) {

		folderSchema(who);
		console.log('folder Created');
		
		}
		
	});

},

folderSchema = function(who){

	for(var keys in definitions.folderSchema){

		fs.mkdir('./uploads/'+who.username+'/'+ keys, 0777, function (err){

		
		});

		

	}

	//voidData(who);

},

exports.loadUser = function (req, res, next){

	if (req.session.user_id) {
		User.findById(req.session.user_id, function (err, user){ 

			if(user){

				req.currentUser = user;
				next();
			}else{

				res.redirect('session/new');
			}

		});
	}else{

		res.redirect('session/new');

	}

},
exports.login = function(req, res){





},

exports.showLogin = function(req, res){

	var sessionObj = req.session;
	console.log(sessionObj);
	res.render('login', { title: "please log-in" });

},

exports.logOut = function(req, res){

},

exports.index = function(req, res){
/*
	Session.find({}, function (err, sessions){
		if(err){
			console.log("there is no sessions");
		}
		res.send(sessions);
	});
*/
	Todo.find(function (err, todos, count){
	  if(!err){
	  	//console.log(definitions);
	  	//console.log(definitions.dbConnect);
	  	res.render('index', { title: 'My Todo List!',

	  						  todos: todos,

	  	});
	  	
	  
	  }else{

	  	res.render('index', { title: definitions.indexMessages[2] });
	  	
	  }
	  
	});

	},
exports.getUsers = function(req, res){
	
	//console.log(definitions);
	
	User.find(function (err, users, count){
		if(!err){
			res. render('users', {title:"Users found",
									users: users });
		}
	});
},

exports.getArtists = function(req, res){

	Artist.find(function (err, artists, count){
		if(!err){
			res.render('artists', {title:"Artists Found",
									artists: artists });
		}
	});
},

exports.getVenues = function(req, res){
	
	Venue.find(function (err, venues, count){
			res.render('venues', {title:"Venues Found",
								venues: venues
		});
	});
},

exports.user = function(req, res){
	
	res.render('user',{ title:"User Registration",
						definitions: definitions });
},

exports.venue = function(req, res){
	
	res.render('venue', {title:"User Registration",
							definitions: definitions
});
},

exports.artist = function(req, res){

	res.render('artist', {title:"User Registration",
							definitions: definitions
});
},

exports.create = function (req, res){
	new Todo({
		content : req.body.content,
		update_at: Date.now()
	}).save(function (err, todo, count){
		if(!err){
			res.redirect('/');
		}else{
			console.log(definitions.indexMessages[2]);
		}
	});
};

exports.createUser = function(req, res){
	var userData = {};
	for (var key in definitions.userData){
		userData[key] = req.body[key];
	}

	new User( userData ).save(function (err, user, count){
		if(!err){
			initUserEnvirorment(userData);
			res.redirect('/user/all');
		}
		
	});
},

exports.createArtist = function(req, res){
	var userData = {};
	var artistData = {};
	
	for (var key in definitions.userData){
		artistData[key] = req.body[key];
	}

	for (var key in definitions.artistData){
		artistData[key] = req.body[key]; 
	}
	new Artist( artistData ).save(function (err, artist, count){
		if(!err){
			voidData(userData);
			voidData(artistData);
		
			res.redirect('/artist/all');
		}
	});
},

exports.createVenue = function(req, res){

	var userData = {};
	var venueData = {};

	for (var key in definitions.userData){
		venueData[key] = req.body[key];
	}
	for (var key in definitions.venueData){
		venueData[key] = req.body[key];
	}
	console.log(venueData);
	new Venue(venueData).save(function (err, venue, count){
		if(!err){
			voidData(userData);
			voidData(venueData);
			res.redirect('/venue/all');
		}
	});
},

exports.destroy = function (req, res){
	Todo.findById(req.params.id, function (err, todo){
		if(!err){
			todo.remove(function (err, todo){
				if(!err){

					res.redirect('/');
				
				}
			});
		}else{
			res.render('index',{title: definitions.indexMessages[2]});
		}
	});

};

exports.destroyUser = function(req, res){
	User.findById(req.params.id, function (err, user){
		if(!err){
			user.remove(function (err, user){
				if(!err){

					res.redirect('/user/all');
				
				}
			});
		}else{
			res.render('index',{title: definitions.indexMessages[2]});
		}
	});
},

exports.destroyArtist = function(req, res){
	Artist.findById(req.params.id, function (err, artist){
		if(!err){
			artist.remove(function (err, artist){
				if(!err){

					res.redirect('/artist/all');
				
				}
			});
		}else{
			res.render('index',{title: definitions.indexMessages[2]});
		}
	});
},

exports.destroyVenue = function(req, res){
	Venue.findById(req.params.id, function (err, venue){
		if(!err){
			venue.remove(function (err, venue){
				if(!err){

					res.redirect('/venue/all');
				
				}
			});
		}else{
			res.render('index',{title: definitions.indexMessages[2]});
		}
	});
},

exports.edit = function(req, res){
	Todo.find(function (err, todos){
		res.render('edit', {	
			title: definitions.indexMessages[1],
			todos: todos,
			current: req.params.id

		});
	});
},

exports.update = function (req, res){
	Todo.findById(req.params.id, function (err, todo){ 

		todo.content = req.body.content;
		todo.update_at = Date.now();
		todo.save(function (err, todo, count){
			if(!err){
				res.redirect('/');

			}else{

					res.render('index', {title: definitions.indexMessages[4] });
			}
		});
	});
},

exports.search = function(req, res){

	res.render('search', {title: "Search"});
},

exports.ShowResults = function(req, res){
	//var todoFound = false;
	//var userFound = false;
	//var artistFound = false;
	//var venueFound = false;
	var query = new RegExp(req.body.search, 'i');

	console.log(query);
	
	Todo.find().or({'content':query}).exec(function (err, todos){
				User.find({'username':query }).or({'email':query}).exec(function (err, users){
					Artist.find({'username':query }).or({'email':query}).exec(function (err, artists){
						Venue.find({'username':query }).or({'email':query}).exec(function (err, venues){
							res.render('searchResults', {  title:"Results for " + req.body.search,
													todos: todos,
													users: users,
													artists: artists,
													venues: venues 
		
												 });
						});
					});
		
				});

		
			});
		

},

exports.uploader = function(req, res){
		res.render('upload_image', {title: "upload your image"});
},

exports.uploadFile = function(req, res){
	
	console.log("file name", req.files.file.name);                                           
    console.log("file path", req.files.file.path);  

	res.end("upload complete");
},

exports.test = function(req, res){

	res.send('hello Audio');



}
