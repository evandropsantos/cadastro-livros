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

    app.use(function(req, res, next) {
        res.status(404).render('erros/404');
        next();
    });

    app.use(function(error, req, res, next) {
        if(process.env.NODE == 'production') {
            res.status(500).render('erros/500');

            return;
            
            next(error);
        }
    });

    return app; 
}

