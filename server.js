//load all environment vars and set in process.env
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


//holt sich die express lib
const express = require('express');// import express
const bodyParser = require('body-parser');
const passport = require('passport')// for line 24

//damit wird die express funktion ausgefuehrt.
const app = express();

//setzt port als port 1337 fest
const port = process.env.PORT || 1337;

const bcrypt = require('bcrypt')// allow to hash pw and to compare hashed pw for security

const methodOverride = require('method-override')

const flash = require('express-flash')//massage if something failed is used by passport internal eg wrong email
const session = require('express-session')

const initializePassport = require('./passport-config')//

initializePassport(passport, email =>//takes email
        users.find(user => user.email === email),//find user with email
    id => users.find(user => user.id === id)// compare id
)

//wird gebraucht fuer die verbindung von der webseite zum server
let cors = require('cors')
app.use(cors()) // Use this after the variable declaration


const users = []// to store instead database...weiß nicht ob ich das so lassen sollte?

app.set('view-engine', 'ejs')//view engine is set to ejs
app.use('/css',express.static(__dirname + '/css'));//files we use
app.use('/images',express.static(__dirname + '/images'));
app.use('/js',express.static(__dirname + '/js'));
app.use(methodOverride('_method'))


app.use(express.urlencoded({extended: false}))// tells application to take forms from login and register inside req var inside post
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,// a key to keep all info encrypted caps is name
    resave: false,//if nothing has changed i dont wanna resave
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())//store vars the entire session work with line 48

/*
app.get('/',checkAuthenticated, (req, res) =>{
    res.render('index.ejs', {name: req.user.name})
})

 */

app.get('/checkout',checkAuthenticated, (req, res) =>//
    res.render('checkout.ejs', {name: req.user.name})
)
app.delete('/logout', (req, res) => {//delete req saver
    req.logOut()// from passport to log out and clear session
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

app.get('/login',checkNotAuthenticated, (req,res) =>{//render to login //not allow users to go to login if logged in
    res.render('login.ejs')// no extra info needed
})

app.post('/login',checkNotAuthenticated, passport.authenticate('local', {// local for local strategy
    successRedirect: 'checkout',// where when success
    failureRedirect: '/login',// redirect if failure
    failureFlash: true//show message to user
}))

app.post('/login', checkNotAuthenticated, (req,res) =>{//dont allow to login if authenticated
    res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req, res) => {// same as login with register
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {// async func
    try {// for async code
        const hashedPassword = await bcrypt.hash(req.body.password, 10)// 10 default standard quick but secure await bc async
        // hashedpw to store
        users.push({
            id: Date.now().toString(),// unique identifier
            name: req.body.name,// get name
            email: req.body.email,// get email
            password: hashedPassword,// use hashedpw
        })
        console.log(req.method)// see if real post
        console.log(users)// see if user added
        res.redirect('/login')// redirect to login
    } catch {
        res.redirect('/register')// redirect if failed
    }
})

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//continue to the next matching route handler
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {//isAuthenticated returns true if there is a user
        return next()// do the next thing?
    }
    res.redirect('/login')//false if no user authenticated
}

function checkNotAuthenticated(req, res, next) {//similar to func 126
    if (req.isAuthenticated()) {
        return res.redirect('/checkout')// if true redirect to checkout
    }
    next()/// continue
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