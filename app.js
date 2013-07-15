
/**
 * Module dependencies.
 */


var express = require('express.io'),
	mongoose = require('mongoose'),
	MongoStore = require('connect-mongo')(express),
  app = express();
  //app = module.exports = express.createServer();
  require('./models');
  app.http().io();
var  routes = require('./routes'),
  definitions = require('./config.json'),
  Session = mongoose.model('Session'); 

app.configure(function(){

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'ejs');
  app.set('view engine', 'jade');
  app.set('db-uri', definitions.dbConnect);
  app.use(express.cookieParser());
  app.use(express.session({
    	secret: 'Your Secret',
    	cookie: {
    		maxAge : (60000)
    	},
    	store: new MongoStore({ 
        db : definitions.dbName,
        collection : definitions.collections.userSession
       })
    })
  );
  //app.use(express.logger({format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms' }));
  app.use(express.favicon());
  app.use(express.bodyParser({keepExtensions: true, uploadDir: "uploads" }));
  app.use(express.methodOverride());
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

app.get('/search', routes.loadUser, routes.search);
app.post('/search/results/', routes.loadUser, routes.ShowResults);

app.get('/', routes.loadUser, routes.index);
app.post('/post', routes.loadUser, routes.createPost);
app.get('/destroy/:id',routes.loadUser, routes.destroy);
app.get('/edit/:id', routes.loadUser, routes.edit);
app.post('/update/:id', routes.loadUser, routes.update);

app.get('/user',  routes.user);
app.post('/user/create',  routes.createUser);
app.get('/user/all', routes.loadUser, routes.getUsers);
app.get('/user/destroy/:id', routes.loadUser, routes.destroyUser);

app.get('/venue', routes.venue);
app.post('/venue/create', routes.createVenue);
app.get('/venue/all', routes.loadUser, routes.getVenues);
app.get('/venue/destroy/:id', routes.loadUser, routes.destroyVenue);

app.get('/artist', routes.artist);
app.post('/artist/create', routes.createArtist);
app.get('/artist/all', routes.loadUser, routes.getArtists);
app.get('/artist/destroy/:id', routes.loadUser, routes.destroyArtist);

app.get('/upload', routes.loadUser, routes.uploader);
app.post('/upload/file/', routes.loadUser, routes.uploadFile);

app.get('/session', routes.showLogin);
app.post('/session/new', routes.login);
app.get('/session/close', routes.loadUser, routes.logOut);

app.get('/audio', routes.loadUser, routes.test);


app.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
  //console.log(definitions);
});
