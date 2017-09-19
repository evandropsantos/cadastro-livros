var app = require('./config/express')();
// Carregamento automático dos módulos

app.listen(3000, function() {

    console.log("servidor rodando");
});