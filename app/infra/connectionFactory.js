var mysql = require('mysql');

function createConnection() {

    return  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'biblioteca'
    });
}

module.exports = function() { return createConnection; }