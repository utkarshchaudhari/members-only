const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');

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
  body('cpassword')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Password confirmation is required.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match.');
      } else {
        return true;
      }
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    if (!errors.isEmpty()) {
      res.status(422).json({ user: user, error: errors.mapped() });
      return;
    } else {
      await user.save();
      res.sendStatus(200);
    }
  }),
];

exports.user_login_post = [
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
    .withMessage('Password must be specified.'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.mapped() });
    }

    passport.authenticate('local', (err, user, info) => {
      console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ err: 'Incorrect email or password.' });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.json({ message: 'Logged In Successfully!', user });
      });
    })(req, res, next);
  },
];
