var configura = require('./config/express');
var app = configura();

app.get('/produtos', function(req, res) {

    var mysql = require('mysql');
    
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'biblioteca'
    });

    connection.query('select * from livros', function(err, results){
        res.send(results);
    });

    connection.end();
});

app.listen(3000, function() {

    console.log("servidor rodando");
});