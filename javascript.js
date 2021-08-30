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
//Exibe todos os livros das Biblioteca(não está funcionando)
app.get('/mostrar', function (req, res) {
    client.query(
        {
            text: 'SELECT * FROM livro'
        }
    )
    .then(
        function(ret) {
            let livro=ret.rows[all];
            res.json(
                {
                titulo: livro.titulo,
                autor: livro.autor,
                paginas: livro.npag
                
            }
            );
            }
    )
}
);
//mostra livro com titulo expecifico(não está funcionando)
app.get('/pesquisar/:autor', function(req,res){
    client.query(
        {
            text:'SELECT autor, titulo, npag FROM livro WHERE autor = $1',
            values:[req.params.autor]
        }
    ).then(
        function(ret){
            let livros=ret.rows[0];
            res.json(
                {
                    status:'OK',
                    autor:livros.autor,
                    titulo: livros.titulo,
                    numeroDePaginas:livros.npag
                }
            );
        }
    )
}

)
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
                    autor:livros.autor,
                    titulo: livros.titulo,
                    numeroDePaginas:livros.npag
                }
            );
        }
    );
});

app.post('/livros', function(req, res){
    client.query(
        {
            text:'INSERT INTO livro (titulo,autor, npags) VALUES($1,$2,$3)',
            values:[req.body.titulo, req.body.autor, req.body.numeropags]
        }
    )
    .then(
        function (ret) {
            res.json(
                {
                    status:'OK',
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