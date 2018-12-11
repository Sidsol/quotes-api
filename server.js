// imports
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({extended: true}));
var port = 3000;

var quotes = [
    {
        id: 1,
        quote: "The best in yet to come",
        author: "Unkown",
        year: 2000
    },
    {
        id: 2,
        quote: "This is a quote",
        author: "First Last",
        year: 1930
    },
    {
        id: 3,
        quote: "This is another quote",
        author: "First2 Last2",
        year: 1910
    }
];

// ROUTES

app.get('/', function(request, response){
    response.send("Get request recieved at '/'")
})

app.get('/quotes', function(request, response){
    if (request.query.year) {
        response.send("Return a list of quotes form the year: " + request.query.year);
    }
    else{
        console.log("get a list of all quotes as json");
        response.json(quotes);
    }

})

app.get('/quotes/:id', function(request, response){
    console.log("return quote with the ID: " + request.params.id);
    response.send("Return quote with the ID: " + request.params.id);
})

app.post('/quotes', function(request, response){
    console.log("Insert a new quote: " + request.body.quote);
    response.json(request.body);
})


app.listen(port, function () {
    console.log('Express app listening on port + ' + port);
})