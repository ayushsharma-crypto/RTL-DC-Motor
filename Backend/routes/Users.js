// Authentication libraries
const dotenv = require('dotenv');
const express = require("express");
const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
dotenv.config();

// Load User model
const User = require("../models/Users");

// connection with passportjs

// stategy for user sign up
passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done){
        process.nextTick(function() {
            User.findOne({'email':username}, function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, false, { message: 'Oops! That email is already taken.' });
                } 
                else{
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        sessions: [],
                    });
                    newUser.password = newUser.generateHash(password);
                    newUser.save()
                        .then(user => done(null, user))
                        .catch(err => { throw err});
                }
            });
        });
    }
));

// stategy for user sign in
passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        process.nextTick(function() {
            User.findOne({ 'email': username }, function (err, user) {
                    if (err) { 
                        return done(err); 
                    }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
  

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json({
                success: true,
                res : users
            });
		}
	});
});



// POST request 
// Sign UP
router.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) { 
        return next(err); 
      }
      if (!user) { 
        return res.json({success: false,res: "That email is already taken."}); 
      }
      else{
        return res.json({success: true,res: "Successfully Registered"}); 
      }
    })(req, res, next);
  });
  

// POST request 
// Sign In
router.post('/signin', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
    if (err) { 
        return next(err); 
    }
    if (!user) { 
        return res.json({success: false,res: "Either mail or Password is wrong or not registered user"}); 
    }
    req.logIn(user, function(err) {
        if (err) { 
        return next(err); 
        }
        return res.json({success: true,res:"Welcome!"});
    });
    })(req, res, next);
});


// GET request 
// Sign Out
router.get("/signout", function(req, res){
  if(req.isAuthenticated()){
    req.logout();
    res.json({success: true,res: "Successfull Signout"});
  }
  else{
    res.json({success: false, res: "Not Authenticated"});
  }
});


// GET request 
// Check Logged or not
router.get('/checklog',function(req, res){
    if(req.isAuthenticated()){
        User.findOne({'email': req.user.username},function(err, user){
            if(err){
                console.log(err);
            }
            else{
                res.json({success: true, res:"Authenticated",user: user});
            }
        });
    }
    else{
        res.json({success: false, res:"Not Authenticated"});
    }
});


module.exports = router;