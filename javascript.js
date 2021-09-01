const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pg=require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new pg.Client(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'aula',
        password:'1234',
        port:5432
    }
);
client.connect();
//Exibe todos os livros das Biblioteca
app.get('/mostrar', function (req, res) {
    client.query(
        {
            text: 'SELECT * FROM livro'
        }
    )
    .then(
        function(ret) {
            let array=[];
            for(livro of ret.rows){
                array.push(
                    {
                        id: livro.id,
                        titulo: livro.titulo,
                        autor: livro.autor,
                        numeropags: livro.npag,
                        ano:livro.ano
                    }
                );
            }
            res.json({
                status:'OK',
                numeroDeResultados:array.length,
                resultados:array

            });

            }
    )
}
);
//mostra livro de um autor especifico

//procura por um titulo especifico
app.get('/pesquisar1/:titulo', function(req,res){
    client.query(
        {
    text:'SELECT * FROM livro WHERE titulo like $1',
            values:[req.params.titulo]
        }
    ).then(
        function(ret){
           
           let livro=ret.rows[0];
            res.json({
                status:'OK',
                titulo:livro.titulo,
                autor:livro.autor,
                paginas:livro.npag,
                ano:livro.ano
            }
            );
        }
    );
});
//pesquisa pelo autor
app.get('/pesquisar2/:autor', function(req,res){
    client.query(
        {
    text:'SELECT * FROM livro WHERE autor like $1',
            values:[req.params.autor]
        }
    ).then(
        function(ret){
           
           let livro=ret.rows[0];
            res.json({
                status:'OK',
                titulo:livro.titulo,
                autor:livro.autor,
                paginas:livro.npag,
                ano:livro.ano
            }
            );
        }
    );
});

//procurar livros por id
app.get('/livros/:id', function(req, res){
    client.query(
        {
            text:'SELECT * FROM livro WHERE id = $1',
            values:[req.params.id]
        }
    )
    .then(
        function (ret) {
            let livros=ret.rows[0];
            res.json(
                {
                    status:'OK',
                    titulo: livros.titulo,
                    autor:livros.autor,
                    numeroDePaginas:livros.npag,
                    ano: livros.ano
                }
            );
        }
    );
});
//Envia para Banco de Dados
app.post('/enviar', function(req, res){
    client.query(
        {
            text:'INSERT INTO livro (titulo,autor, npag, ano) VALUES($1,$2,$3,$4)',
            values:[req.body.titulo, req.body.autor, req.body.numeropags, req.body.ano]
        }
    )
    .then(
        function (ret) {
            res.json(
                {
                    status:'OK',
                    titulo:req.body.titulo,
                    dadosEnviados: req.body
                }
            );
        }
    );
});

app.listen(
    3000, 
    function(){
        console.log("inicialização ok!");
    }
);