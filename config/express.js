var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

module.exports = function() { 
    
    var app = express();
    
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));

    consign({cwd: 'app'})
        .include('routes')
        .then('infra')
        .into(app);

    return app; 
}

