
/**
 * Module dependencies.
 */


var express = require('express'),
	mongoose = require('mongoose'),
	MongoStore = require('connect-mongo')(express),
  express = require('express'),
  app = module.exports = express.createServer();
  require('./models');
var  routes = require('./routes'),
  definitions = require('./config.json'),
  Session = mongoose.model('Session'); 

app.configure(function(){

  app.set('db-uri', definitions.dbConnect);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser({keepExtensions: true, uploadDir: "uploads" }));
  app.use(express.cookieParser());
  app.use(express.session({
    	secret: 'Your Secret',
    	cookie: {
    		maxAge : (60000 * 5)
    	},
    	store: new MongoStore({ 
        db : definitions.dbName,
        collection : definitions.collections.userSession
       })
    })
  );
  //app.use(express.logger({format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }));
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

app.get('/', routes.loadUser, routes.index);
app.get('/user/all', routes.loadUser, routes.getUsers);
app.get('/venue/all', routes.loadUser, routes.getVenues);
app.get('/artist/all', routes.loadUser, routes.getArtists) 
app.get('/user',  routes.user);
app.get('/venue', routes.venue);
app.get('/artist', routes.artist); 
app.post('/post', routes.loadUser, routes.createPost);
app.post('/user/create',  routes.createUser);
app.post('/artist/create', routes.createArtist);
app.post('/venue/create', routes.createVenue);
app.get('/destroy/:id',routes.loadUser, routes.destroy);
app.get('/user/destroy/:id', routes.loadUser, routes.destroyUser);
app.get('/artist/destroy/:id', routes.loadUser, routes.destroyArtist);
app.get('/venue/destroy/:id', routes.loadUser, routes.destroyVenue);
app.get('/edit/:id', routes.loadUser, routes.edit);
app.get('/search', routes.loadUser, routes.search)
app.post('/search/results/', routes.loadUser, routes.ShowResults);
app.post('/update/:id', routes.loadUser, routes.update);
app.get('/upload', routes.loadUser, routes.uploader);
app.post('/upload/file/', routes.loadUser, routes.uploadFile);
app.get('/audio', routes.loadUser, routes.test);
app.get('/session', routes.showLogin);
app.post('/session/new', routes.login);
app.get('/session/close', routes.loadUser, routes.logOut);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  //console.log(definitions);
});
