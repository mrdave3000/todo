
/*
 * GET home page.
 */

//requires
var mongoose = require('mongoose'),
    utils    = require( 'connect' ).utils;

var messages = require('../configure.json');

var browserify = require('browserify');
//var webaudio = require('webaudio');

//models
var	Post = mongoose.model('Post'),
	User = mongoose.model('User'),
	Artist = mongoose.model('Artist'),
	Venue = mongoose.model('Venue'),
	Session = mongoose.model('Session');

var crypto = require('crypto');

var definitions = require('../config.json');
var fs = require('fs');

 var venueData = {},
	 userData = {},
	 artistData = {};

dataCrypt = function(data){


},


voidData = function(who){

	who = {};
	console.log("data VOide!");
},

initUserEnvirorment = function(who){

	fs.mkdir('./uploads/'+ who.username , 0777, function (err){
	
	if (!err) {

		folderSchema(who);
		voidData(userData);
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

	if (req.session.userId) {
		User.findById(req.session.userId, function (err, user){ 

			if(user){
				req.currentUser = user;
				next();
			}else{

				res.redirect('/session');
			}

		});
	}else{

		res.redirect('/session');

	}

},
exports.login = function(req, res){
	
	var usersession = {};
	var userQuery = new RegExp(req.body.username , 'i');
	var passwordQuery = new RegExp(req.body.password, 'i'); 	
	var Query = User.find();
	//console.log(Query);

	Query.findOne().where('username', userQuery).exec(function(err, user){
		usersession.password = req.body.password;
		console.log(user);
			if(user && user.authenticate((usersession))){
						req.session.userType = user.userType;
						req.session.username = user.username;
						req.session.validated = true;
						req.session.userId = user._id;
						res.redirect('/');
					}else{
						res.redirect('/session');
					}
		});
},

exports.showLogin = function(req, res){

	res.render('login', { title: "please log-in" });

},

exports.logOut = function(req, res){

	if (req.session) {
    req.session.destroy(function() {});
  }
  res.redirect('/session');

},


exports.getUsers = function(req, res){
	
	var Query = User.find();
	 Query.where('userType', 'user').exec(function(err, users){
	 	if(!err && users){
	 		res.render('users', {title: "Users Found", users: users });
	 	}else{

	 	}
	 });
},

exports.getArtists = function(req, res){

	var Query = User.find();
	 Query.where('userType', 'artist').exec(function(err, users){
	 	if(!err && users){
	 		res.render('users', {title: "Users Found", users: users });
	 	}else{

	 	}
	 });
	
},

exports.getVenues = function(req, res){
	
	var Query = User.find();
	 Query.where('userType', 'venue').exec(function(err, users){
	 	if(!err && users){
	 		res.render('users', {title: "Users Found", users: users });
	 	}else{

	 	}
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

exports.index = function(req, res){
/*
	Session.find({}, function (err, sessions){
		if(err){
			console.log("there is no sessions");
		}
		res.send(sessions);
	});
*/
	Post.find().lean().exec(function (err, posts, count){
	  if(!err && posts){
	  	//console.log(posts);
	  	//console.log(definitions);
	  	//console.log(definitions.dbConnect);
	  	res.render('index', { title: 'Returning posts',

	  						  posts: posts,

	  	});
	  	
	  
	  }else{

	  	res.render('index', { title:'no posts found'});
	  	
	  }
	  
	});

	},

exports.createPost = function (req, res){

	User.findById(req.session.userId).exec(function (err, user){
		if(user && req.session.validated && !err){
			new Post({
					user : user,		
					content : req.body.content,
					published: Date.now()
					}).save(function (err, post, count){
						if(!err){
							res.redirect('/');
						}
					});
					//io.emit('posted');

		}
	});
},

exports.isPosted = function(req, res){
	
	console.log(posted);
	req.io.emit('posted', {

		posts: function(){

			Post.find(function (err, posts, count){
				if(posts && !err){
					res.redirect('/');
				}
			});

		}

	});
},



exports.createUser = function(req, res){
	var userData = {};
	userData.userType = "user";
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
	    userData.userType = "artist";
	
	for (var key in definitions.userData){
		userData[key] = req.body[key];
	}

	for (var key in definitions.artistData){
		userData[key] = req.body[key]; 
	}
	new User( userData ).save(function (err, artist, count){
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
	userData.userType = "venue";

	for (var key in definitions.userData){
		userData[key] = req.body[key];
	}
	for (var key in definitions.venueData){
		userData[key] = req.body[key];
	}
	
	new User(userData).save(function (err, venue, count){
		if(!err){
			voidData(userData);
			voidData(venueData);
			res.redirect('/venue/all');
		}
	});
},

exports.destroy = function (req, res){
	Post.findById(req.params.id, function (err, post){
		if(!err){
			post.remove(function (err, post){
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
		if(!err && user){
				
				user.remove(function (err, user){
					res.redirect('/user/all');
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
	Post.find(function (err, posts){
		res.render('edit', {	
			title: definitions.indexMessages[1],
			posts: posts,
			current: req.params.id

		});
	});
},

exports.update = function (req, res){
	Post.findById(req.params.id, function (err, post){ 

		post.content = req.body.content;
		post.update_at = Date.now();
		post.save(function (err, post, count){
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
	//var postFound = false;
	//var userFound = false;
	//var artistFound = false;
	//var venueFound = false;
	var query = new RegExp(req.body.search, 'i');
	
	Post.find().or({'content':query}).exec(function (err, posts){
				User.find({'username':query }).or({'email':query}).lean().exec(function (err, users){
							res.render('searchResults', {  title:"Results for " + req.body.search,
													posts: posts,
													users: users
		
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
