
/*
 * GET home page.
 */

//requires
var mongoose = require('mongoose'),
    utils    = require( 'connect' ).utils;

var definitions = require('../configure.json');

//models
var	Todo = mongoose.model('Todo'),
	User = mongoose.model('User');


var definitions = require('../config.json');





exports.index = function(req, res){
	Todo.find(function (err, todos, count){
	  if(!err){
<<<<<<< HEAD
	  	console.log(definitions);
	  	res.render('index', { title: definitions.indexMessages[0],
=======
	  	//console.log(definitions.dbConnect);
	  	res.render('index', { title: 'My Todo List!',
>>>>>>> d20525b7b19e104380f460b9308bd3cb6ead5a2b
	  						  todos: todos  
	  	
	  	});
	  	
	  
	  }else{

	  	res.render('index', { title: definitions.indexMessages[2] });
	  	
	  }
	  
	});
};

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

exports.destroy = function (req, res){
	Todo.findById(req.params.id, function (err, todo){
		if(!err){
			todo.remove(function (err, todo){
				if(!err){

					res.redirect('/');
				
				}else{

					res.render('index', {title: definitions.indexMessages[2]});
				}
			});
		}else{
			res.render('index',{title: definitions.indexMessages[2]});
		}
	});

};

exports.edit = function(req, res){
	Todo.find(function (err, todos){
		res.render('edit', {	
			title: definitions.indexMessages[1],
			todos: todos,
			current: req.params.id

		});
	});
};

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
};