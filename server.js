const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 1337;

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, (error) =>{
    if(error){
        console.error(error);
    }else{
        console.log(`Server Listening at http://localhost:${port}`);
    }
});

const Routes = require('./api/routes/Routes')
app.use('/api/v1/products', Routes);