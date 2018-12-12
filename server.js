// imports
var express = require('express');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('quotes.db');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({extended: true}));
var port = 3000;


// ROUTES

app.get('/', function(request, response){
    response.send("Get request recieved at '/'")
});

app.get('/quotes', function(request, response){
    if (request.query.year) {
        db.all('SELECT * FROM quotes WHERE year = ?', [request.query.year], function(err, rows){
            if(err){
              response.send(err.message);
            }
            else{
                console.log("Return a list of quotes from the year: " + request.query.year);
                response.json(rows);
              }
          });
    }
    else{
        db.all('SELECT * FROM quotes', function processRows(err, rows){
            if(err){
                response.send(err.message);
            }
            else{
                for( var i = 0; i < rows.length; i++){
                    console.log(rows[i].quote);
                }
                response.json(rows);
            }
        });
    }
});

app.get('/quotes/:id', function(request, response){
    console.log("return quote with ID: " + request.param.id)
    db.get('SELECT * FROM quotes WHERE rowid = ?', [request.params.id], function(err, row){
        if(err){
          console.log("ERROR: " + err.message);
        }
        else{
          response.json(row);
        }
      });
});

app.post('/quotes', function(request, response){
    console.log("Insert a new quote: " + request.body.quote);
    db.run('INSERT INTO quotes VALUES (?,?,?)', [request.body.quote, 
        request.body.author, 
        request.body.year], function(err){
        if(err){
            console.send(err.message);
        }
        else{
            response.send('Inserted quote with id: ' + this.lastID);
        }
    });
});


app.listen(port, function () {
    console.log('Express app listening on port + ' + port);
});