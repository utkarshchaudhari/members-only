const express = require('express');
const router = express.Router();

//Require controller modules
const user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Express');
});

//POST request for creating user
router.post('/signup', user_controller.user_create_post);

//POST reqyest for log-in
router.post('/login', user_controller.user_login_post);

module.exports = router;
