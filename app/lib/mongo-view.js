
/**
 * @list module dependencies
 **/

var path = require('path')
  , express = require('express')
  , MemoryStore = express.session.MemoryStore
  , app = exports.app = express.createServer()
  , sessionSecret = 'DONT/TAZE/ME/BRO!';

/**
 * configure express
 **/

app.configure(function() {
  console.log('> mongo-view [configuring...]'.yellow);
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret : sessionSecret,
    maxAge : new Date(Date.now() + 3600000),
    store  : new MemoryStore() 
  }));
  app.use(express.logger('tiny'));
  app.use(express.static(__dirname + '/../../public'));
});

/**
 * @controller api
 **/

require('../controllers/api')(app);

/**
 * @description Catch-All for HTML5
 **/

app.get('/database/*', function(_request, _response) {
  var html = path.normalize(__dirname + '/../../public/index.html');
  _response.sendfile(html);
});

/* EOF */