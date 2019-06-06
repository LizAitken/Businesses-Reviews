const express = require('express'),
   bcrypt = require('bcryptjs'),
   router = express.Router();

const User = require('../models/m_users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', { 
    locals: {
      title: 'User Info',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-users'
    }
  });
});

router.get('/login', (req, res) => {
  res.render('template', {
    locals: {
      title: 'Login Page',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-login'
    }
  });
});


router.get('/signup', function(req, res, next) {
  res.render('template', { 
    locals: {
      title: 'Sign Up Page',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-signupform'
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const userInstance = new User(null, null, null, email, password); 

  userInstance.login().then(response => {
    req.session.is_logged_in = response.isValid;
    console.log("logging response is", response);
    if (!! response.isValid) {
      req.session.first_name = response.first_name;
      req.session.last_name = response.last_name;
      req.session.user_id = response.user_id;
      res.redirect('/');
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  })
});

router.post('/signup', (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)

  const userInstance = new User(null, first_name, last_name, email, hash);

  userInstance.save().then(response => {
    console.log("response", response);
    res.sendStatus(200);
  })

});


module.exports = router;
