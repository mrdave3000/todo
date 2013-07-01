
/**
 * Module dependencies.
 */

<<<<<<< HEAD
var express = require('express'),
	mongoose = require('mongoose'),
	MongoStore = require('connect-mongo')(express);

=======
var express = require('express');
>>>>>>> d20525b7b19e104380f460b9308bd3cb6ead5a2b
var app = module.exports = express.createServer();

// Configuration
	require('./models');
var routes = require('./routes');
var definitions = require('./configure.json');
//var db = mongoose.connect(app.set('db-uri')); 


app.configure(function(){

  app.set('db-uri', definitions.dbConnect);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
<<<<<<< HEAD
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.session({
    	secret: 'Your Secret',
    	cookie: {
    		maxAge : 10000
    	},
    	store: new MongoStore({
    		db : 'sessionstore'
    	})
    })
  );
=======
 // app.use(express.logger());
  //app.use(express.session());
  //app.use(express.cookieParser());
>>>>>>> d20525b7b19e104380f460b9308bd3cb6ead5a2b
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index); //function (req, res){

//	var previous      = req.session.value || 0;
//  	req.session.value = previous + 1;
//  	res.send('<h1>Previous value: ' + previous + '</h1>');

//});

app.post('/create', routes.create);
app.get('/destroy/:id', routes.destroy);
app.get('/edit/:id', routes.edit);
app.post('/update/:id', routes.update);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
