module.exports = function(app) {
    
    app.get('/produtos', function(req, res, next) {

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        produtosDAO.lista(function(erros, resultados) {

            if(erros) {
                return next(erros);
            }

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

        req.assert('titulo', 'Titulo e obrigatorio.').notEmpty();
        req.assert('preco', 'Formato invalido').isFloat();

        var erros = req.validationErrors();
        if(erros) {
            res.format({
                html: function() {
                    res.status(400).render( 'produtos/form', {errosValidacao: erros, produto: produto} );
                },
                json: function() {
                    res.status(400).json(erros);
                }   
            });

            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        console.log(produto);
        
        produtosDAO.salva(produto, function(erros, resultados) {
            
            console.log(erros);

            res.redirect('produtos');
        });
    });

    app.get('/produtos/form', function(req, res) {

        res.render('produtos/form', { errosValidacao: {}, produto: {} });
    });
}