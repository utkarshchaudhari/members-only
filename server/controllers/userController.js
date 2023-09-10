const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

//Handle User create on POST
exports.user_create_post = [
  body('name', 'Name must be specified.').trim().isLength({ min: 1 }).escape(),
  body('email')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('E-mail must be specified.')
    .isEmail()
    .withMessage('Enter a valid email.'),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Password must be specified.')
    .isStrongPassword()
    .withMessage(
      'Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character.'
    ),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!errors.isEmpty()) {
      res
        .status(422)
        .json({ user: user, error: errors.array({ onlyFirstError: true }) });
      return;
    } else {
      await user.save();
      res.sendStatus(200);
    }
  }),
];
