const Message = require('../models/message');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const passport = require('passport');

//Create new message on POST
exports.new_message_post = [
  body('title', 'No title provided.').trim().isLength({ min: 1 }).escape(),
  body('message')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('No message provided.'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    //create new message
    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      user: req.user.name,
    });

    if (req.isAuthenticated()) {
      if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.mapped() });
      }
      await message.save();
      return res.status(200).json({ message: 'New Message Posted!' });
    } else {
      return res.status(401).json({ err: 'Authentication Failed, Try Again!' });
    }
  }),
];

//Get all messages from the database
exports.all_messages_get = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find({}).sort({ date: -1 }).exec();
  res.send(allMessages);
});
