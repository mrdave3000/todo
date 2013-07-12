
/**
 * Module dependencies.
 */


var express = require('express'),
	mongoose = require('mongoose'),
	MongoStore = require('connect-mongo')(express);


var express = require('express');

var app = module.exports = express.createServer();

// Configuration
	require('./models');
var routes = require('./routes');
var definitions = require('./config.json');
//var Session = mongoose.model('Session');
//var db = mongoose.connect(app.set('db-uri')); 


app.configure(function(){

  app.set('db-uri', definitions.dbConnect);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser({keepExtensions: true, uploadDir: "uploads" }));
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.session({
    	secret: 'Your Secret',
    	cookie: {
    		maxAge : 60000
    	},
    	store: new MongoStore({ 
        db : definitions.dbName,
        collection : definitions.collections.userSession
       })
    })
  );

  //app.use(express.logger());
  //app.use(express.session());
  //app.use(express.cookieParser());
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

app.get('/', routes.index);
app.get('/user/all', routes.getUsers);
app.get('/venue/all', routes.getVenues);
app.get('/artist/all', routes.getArtists) 
app.get('/user', routes.user);
app.get('/venue', routes.venue);
app.get('/artist', routes.artist); 
app.post('/create', routes.create);
app.post('/user/create', routes.createUser);
app.post('/artist/create', routes.createArtist);
app.post('/venue/create', routes.createVenue);
app.get('/destroy/:id', routes.destroy);
app.get('/user/destroy/:id', routes.destroyUser);
app.get('/artist/destroy/:id', routes.destroyArtist);
app.get('/venue/destroy/:id', routes.destroyVenue);
app.get('/edit/:id', routes.edit);
app.get('/search', routes.search)
app.post('/search/results/', routes.ShowResults);
app.post('/update/:id', routes.update);
app.get('/upload', routes.uploader);
app.post('/upload/file/', routes.uploadFile);
app.get('/audio', routes.test);
app.get('/session', routes.showLogin);
app.post('/session/new', routes.login);
app.get('/session/close', routes.logOut);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  //console.log(definitions);
});
