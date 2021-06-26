if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


//holt sich die express lib
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')
//damit wird die express funktion ausgefuehrt.
const app = express();
//setzt port als port 1337 fest
const port = process.env.PORT || 1337;
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')

const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')

initializePassport(passport, email =>
        users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

//wird gebraucht fuer die verbindung von der webseite zum server
let cors = require('cors')
app.use(cors()) // Use this after the variable declaration


const users = []

app.set('view-engine', 'ejs')
app.use('/css',express.static(__dirname + '/css'));
app.use('/images',express.static(__dirname + '/images'));
app.use('/js',express.static(__dirname + '/js'));
app.use(methodOverride('_method'))


app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

/*
app.get('/',checkAuthenticated, (req, res) =>{
    res.render('index.ejs', {name: req.user.name})
})

 */

app.get('/checkout',checkAuthenticated, (req, res) =>
    res.render('checkout.ejs', {name: req.user.name})
)
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})



/*
app.get('/', (req, res) =>{
        try{
            res.render('index.ejs', {name: req.user.name})
        }catch{
            res.render('login.ejs')
        }
})

*/

app.get('/login',checkNotAuthenticated, (req,res) =>{
    res.render('login.ejs')
})

app.post('/login',checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: 'checkout',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/login', checkNotAuthenticated, (req,res) =>{
    res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users)
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/checkout')
    }
    next()
}


//Starten den server an port 1337.
app.listen(port, (error) =>{
    if(error){
        console.error(error);
    }else{
        console.log(`Server Listening at http://localhost:${port}`);
    }
});

//routen fuer die products
const Routes = require('./api/routes/Routes')
app.use('/api/v1/products', Routes);