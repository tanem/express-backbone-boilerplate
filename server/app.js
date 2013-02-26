var express = require('express'),
  app = express(),
  app = module.exports = express();

require('./routes/client')(app);
require('./routes/test')(app);
require('./routes/api')(app);
require('./routes/docs')(app);

app.get('/shutdown', function(req, res){
  res.send('');
  process.exit(0);
});