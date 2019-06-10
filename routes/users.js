const express = require('express'),
   router = express.Router();

const UsersControllers = require('../controllers/users_c');

/* GET home page. */
router.get('/', UsersControllers.get);

router.get('/login', UsersControllers.login_get);

router.get('/signup', UsersControllers.signup_get);

router.get('/logout', UsersControllers.logout_get);

router.post('/login', UsersControllers.login_post);

router.post('/signup', UsersControllers.signup_post);


module.exports = router;
