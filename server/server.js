var express = require( 'express' ),
  app = express(),
  carousel = require( './routes/carousel');

app.get( '/css/*', carousel.css);
app.get( '/js/*', carousel.js);
app.get( '/font/*', carousel.font);
app.get( '/carousel', carousel.index );

app.listen( 3000 );
console.log( 'Listening on port 3000' );