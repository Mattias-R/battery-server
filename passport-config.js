const LocalStrategy = require('passport-local').Strategy// local st
const bcrypt = require('bcrypt')


function initialize(passport, getUserByEmail, getUserById){//passport related func
    const authenticateUser  = async (email, password, done) =>{//error func and async and done func..if done its done
        const user = getUserByEmail(email)//get user by email
        if(user == null){
            return done(null, false, {message: ' No user with that email'})//cannot find user but not wrong with server so no error
        }
        try{//to compare pw we use bcrypt if pw is pw
            if(await bcrypt.compare(password, user.password)){// first pw is which the user send in with the login form compare to user.pw
                return done(null, user)// if ture authenticated user
            }else{
                return done(null, false, {message: 'Password incorrect'})//if not
            }
        }catch(error){
            console.log(error)
            return done(error)// error with application
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'},// default is user we have email
        authenticateUser))// func line 6
    passport.serializeUser((user,done) => { done(null, user.id)})// serialize our user in our session
    passport.deserializeUser((id,done) => {// deserializer
        return done(null, getUserById(id))
    })
}
module.exports = initialize//to use func