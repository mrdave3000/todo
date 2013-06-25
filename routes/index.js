
/*
 * GET home page.
 */

//requires
var mongoose = require('mongoose'),
    utils    = require( 'connect' ).utils;

//models
var	Todo = mongoose.model('Todo'),
	User = mongoose.model('User');


var definitions = require('./config');



exports.index = function(req, res){
	Todo.find(function (err, todos, count){
	  if(!err){
	  	//console.log(definitions.dbConnect);
	  	res.render('index', { title: 'My Todo List!',
	  						  todos: todos  
	  	
	  	});
	  	
	  
	  }else{

	  	res.render('index', { title: 'Error on DB' });
	  	
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
			console.log("error saving model");
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

					res.render('index', {title: 'Error Deleting Post!'});
				}
			});
		}else{
			res.render('index',{title:'no Such Id in DB'});
		}
	});

};

exports.edit = function(req, res){
	Todo.find(function (err, todos){
		res.render('edit', {	
			title:'edit your list',
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

					res.render('index', {title: 'Error Deleting Post!'});
			}
		});
	});
};