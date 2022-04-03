//Routes
const express = require('express')
const passport = require("passport");
const User = require("../models/user");
const isAuth = require("../middleware/auth")
const LocalStrategy = require("passport-local").Strategy;
const api_helper = require('../api-helper');
const bcrypt = require("bcryptjs");
const router = new express.Router()



passport.serializeUser((obj, done) => {
  console.log("Serilializing User");
  console.log(obj);
  done(null, obj);
});

// * Passport deserializeUser
passport.deserializeUser(async (obj, done) => {
  console.log("Deserializing User");
  done(null, obj);
});


passport.use('local-signin',new LocalStrategy({
    usernameField: 'uid',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ uid: username }, (err, user) => {
      if (err)  {return done(err);}
      if (!user) return done(null, false,{ message: 'Incorrect Details.' });
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));





router.post("/login/localUser", (req, res, next) => {
    passport.authenticate("local-signin", (err, user, info) => {
      if (err) throw err;
      if (!user) res.status(400).send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          if(req.user)
          {
            res.status(200).send({message:"Successfully Authenticated",user:req.user});
          }
          else
          { 
            res.status(400).send({message:"Incorrect Password"});
          }
        });
      }
    })(req, res, next);
  });

    router.post('/register', (req,res) =>{
        const {email} = req.body
        User.findOne({email: email}, async (err, user) => {
            if(user){
                res.send({message: "User already registered"});
                return ;
            }
            response = await api_helper.make_API_call(`https://api.opencagedata.com/geocode/v1/json?q=${req.body.location}&key=${process.env.GEOCODER}`)
            let reqBody = req.body;
            reqBody = {
              ...reqBody,
              latitude:response.results[0].geometry.lat,
              longitude:response.results[0].geometry.lng
            }
            console.log(reqBody);
                const newUser = new User(reqBody)
                try{
                    await newUser.save()
                    res.status(201).send({message:"Succesfully Registered",newUser})
                }catch(e){
                    res.status(400).send(e)
                }
        })
      
    })

    router.get('/users/me', isAuth, async (req,res) => {
        res.send(req.user);
    });

    router.post('/users/logout', isAuth, async (req,res) => {
      try{
        req.logout();
        res.status(200).send("Logout Successful")
      }
      catch(e)
      {
        res.status(400).send(e);
      }
     
    })

module.exports = router