module.exports = function(app) {
    
    app.get('/produtos', function(req, res) {

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        produtosDAO.lista(function(erros, resultados) {

            res.format({
                html: function() {
                    res.render('produtos/lista', {lista:resultados});
                },
                json: function(){
                    res.json(resultados);
                }
            });
        });
    
        connection.end();
    });

    app.post('/produtos', function(req, res) {
        
        var produto = req.body;
        
        console.log(produto);
        
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        produtosDAO.salva(produto, function(erros, resultados) {
            
            console.log(erros);

            res.redirect('produtos');
        });
    });

    app.get('/produtos/form', function(req, res) {

        res.render('produtos/form');
    });
}