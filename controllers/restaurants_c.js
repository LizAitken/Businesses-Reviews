const bcrypt = require('bcryptjs');
const Restaurants = require('../models/m_restaurants');

exports.get = (req, res) => {
    res.render('template', { 
        locals: {
          title: 'Restaurants',
          is_logged_in: req.session.is_logged_in
        },
        partials: {
          partial: 'partial-restaurants'
        }
    });
}