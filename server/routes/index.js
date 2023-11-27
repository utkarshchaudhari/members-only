const express = require('express');
const router = express.Router();

//Require controller modules
const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Express');
});

//POST request for creating user
router.post('/signup', user_controller.user_create_post);

//POST request for log-in
router.post('/login', user_controller.user_login_post);

//DELETE request for log-out
router.delete('/logout', user_controller.user_logout_delete);

//POST request for joining the club
router.post('/joinclub', user_controller.user_join_club_post);

//POST request for new message
router.post('/newmessage', message_controller.new_message_post);

//GET request for all messages
router.get('/messages', message_controller.all_messages_get);

module.exports = router;
