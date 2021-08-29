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



app.get('/livros/:id', function(req, res){
    client.query(
        {
            text:'SELECT * FROM livros WHERE id = $1',
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
                    numeroDePaginas:livros.npags
                }
            );
        }
    );
});

app.post('/livros', function(req, res){
    client.query(
        {
            text:'INSERT INTO livros (titulo,autor, npags) VALUES($1,$2,$3)',
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