var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() { 
    
    var app = express();
    
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use( bodyParser.urlencoded({extended: true}) );
    app.use( bodyParser.json() );
    app.use( expressValidator() );
    app.use( express.static('./app/public') );

    consign({cwd: 'app'})
        .include('routes')
        .then('infra')
        .into(app);

    return app; 
}

