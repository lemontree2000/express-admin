var express = require('express');
var router = express.Router();
var userModel = require('../models/user/user');

//  GET login page

router.get('/', function(req, res, next) {
  if (req.session.user) {
    res.redirect('/');
  }
  res.render('login', {title: '登录'})
})

router.post('/', function(req, res, next) {
  userModel.login(req, res, next);
})

router.post('/register', function(req, res, next) {
  console.log(req.body);
  userModel.register(req, res, next);
})

module.exports = router;