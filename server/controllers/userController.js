const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const User = require('../models/userModel');
const Session = require('../models/sessionModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(`Error in userController.getAllUsers: ${JSON.stringify(err)}`);
    res.locals.users = users;
    return next();
  });
};

userController.createUser = (req, res, next) => {
  const {
    username, password, email, city, state,
  } = req.body;
  User.create({
    username, password, email, city, state,
  }, (err, doc) => {
    if (err) {
      res.locals.signup = 'Error: Please complete all required fields.';
      throw new Error('error in userController.createUser');
    } else {
      res.locals.signup = 'Account created! Please login.';
      // res.locals.id = doc._id;
      return next();
    }
  });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.find({ username }, (err, doc) => {
    if (err || doc.length === 0) {
      res.redirect('/main');
    } else {
      bcrypt.compare(password, doc[0].password, (error, match) => {
        if (error) {
          throw error;
        }
        if (match) {
          res.locals.username = doc[0].username;
          res.locals.id = doc[0]._id;
          return next();
        }

        res.redirect('/main');
      });
    }
  });
};

userController.github = (req, res, next) => {
  const { code } = req.query;
  fetch(
    `https://github.com/login/oauth/access_token?client_id=f508e33433cf1d98fd40&client_secret=71e309a509794d609978b95235eb37b931f757bd&code=${code}`,
    { method: 'POST', headers: { Accept: 'application/json' } },
  )
    .then((resp) => resp.json())
    .then((data) => {
      res.locals.id = data.access_token;
      return next();
    })
    .catch((err) => next(err));
};


userController.setCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.id, { httpOnly: true });
  return next();
};

userController.isLoggedIn = (req, res, next) => {
  Session.find({ cookieId: req.cookies.ssid }, (err, session) => {
    if (err) {
      return next(`Error in userController.isLoggedIn${JSON.stringify(err)}`);
    } if (!session.length) {
      res.locals.status = notLoggedin;
      res.redirect('/main');
    } else {
      res.locals.status = loggedin;
      return next();
    }
  });
};

userController.startSession = (req, res, next) => {
  const ssid = res.locals.id;
  Session.create({ cookieId: ssid }, (err, session) => {
    if (err) return next('Error in userController.startSession', JSON.stringify(err));
    return next();
  });
};

module.exports = userController;
