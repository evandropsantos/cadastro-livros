var mysql = require('mysql');

function createConnection() {

    if(!process.env.NODE_ENV || process.env.node === 'dev') {
        return  mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'biblioteca'
        });
    }

    if(process.env.NODE_ENV == 'test') {
        return  mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'biblioteca_test'
        });
    }
}

module.exports = function() { return createConnection; }