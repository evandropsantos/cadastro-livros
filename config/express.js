var express = require('express');
var consign = require('consign');

module.exports = function() { 
    
    var app = express();
    
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    consign({cwd: 'app'})
        .include('routes')
        .then('infra')
        .into(app);

    return app; 
}

