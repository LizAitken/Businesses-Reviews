const express = require('express');
const router = express.Router();

const RestaurantsControllers = require('../controllers/restaurants_c');

router.get('/', RestaurantsControllers.get);


module.exports = router;

