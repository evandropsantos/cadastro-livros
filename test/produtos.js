var express = require('../config/express')();
var request = require('supertest')(express);

describe('ProdutosController', function() {

    it('#Listagem JSON', function(done) {

        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#Cadastro de novo livro (Dados Invalidos)', function(done) {

        request.post('/produtos')
            .send( {titulo: "", descricao: "Novo Livro"} )
            .expect(400, done);
    });

    it('#Cadastro de novo livro (Dados Validos)', function(done) {

        request.post('/produtos')
            .send( {titulo: "Titulo", descricao: "Novo Livro", preco: 20.50} )
            .expect(302, done);
    });
});

// Executar testes NODE_ENV=test node_modules/mocha/bin/mocha