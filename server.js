//holt sich die express lib
const express = require('express');
const bodyParser = require('body-parser');

//damit wird die express funktion ausgefuehrt.
const app = express();
//setzt port als port 1337 fest
const port = process.env.PORT || 1337;

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Starten den server an port 1337.
app.listen(port, (error) =>{
    if(error){
        console.error(error);
    }else{
        console.log(`Server Listening at http://localhost:${port}`);
    }
});

const Routes = require('./api/routes/Routes')
app.use('/api/v1/products', Routes);