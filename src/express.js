// express library
const express = require('express')
// importing cors for various server 
const cors = require('cors');
// body-parser.
const bodyparser = require('body-parser');

const path = require('path');
// DOTENV file
const dotenv = require('dotenv');
dotenv.config();

// to connect mongoDB
const DB_Connection = require('./services/database');

const userRoutes = require('./routes/user')

const app = express();
// Cors
app.use(cors());

// body parser
app.use(bodyparser.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.json({ server: 'Education Insigts are live now.' });   
});


DB_Connection.Database_connect_default();


//create a cors middleware
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, Access-Control-Allow-Origin"
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS, PATCH"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use('/user', userRoutes);

app.route('/*')
.get((req, res) => {
//   res.send({ error: '404s' });
  res.sendFile(__dirname+'/public/index.html');
});


module.exports = app;
