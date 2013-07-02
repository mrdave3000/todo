
/*
 * GET home page.
 */

//requires
var mongoose = require('mongoose'),
    utils    = require( 'connect' ).utils;

var definitions = require('../configure.json');

//models
var	Todo = mongoose.model('Todo'),
	User = mongoose.model('User'),
	Artist = mongoose.model('Artist'),
	Venue = mongoose.model('Venue');


var definitions = require('../config.json');





exports.index = function(req, res){
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
};
exports.getUsers = function(req, res){
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
	var userData = definitions.userData;
	for (var key in userData){
		userData[key] = req.body[key];
	}

	console.log(userData);
	new User( userData ).save(function (err, user, count){
		if(!err){
			res.redirect('/user/all');
		}
	});
},

exports.createArtist = function(req, res){
	var userData = definitions.userData;
	var artistData = definitions.artistData;
	
	for (var key in userData){
		artistData[key] = req.body[key];
	}

	for (var key in artistData){
		artistData[key] = req.body[key]; 
	}
	 console.log(artistData);
	new Artist( artistData ).save(function (err, artist, count){
		if(!err){
			artistData = {};
			res.redirect('/artist/all');
		}
	});
},

exports.createVenue = function(req, res){
	var userData = definitions.userData;
	var venueData = definitions.venueData;

	for (var key in userData){
		venueData[key] = req.body[key];
	}
	for (var key in venueData){
		venueData[key] = req.body[key];
	}
	console.log(venueData);
	new Venue(venueData).save(function (err, venue, count){
		if(!err){
			venueData = {};
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
							console.log(todos);
							console.log(users);
							console.log(artists);
							console.log(venues);
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
		

};