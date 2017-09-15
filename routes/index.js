var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    req.session.error = '请先登录'
    res.redirect('/login');
    return;
  }
  res.render('index', { title: 'CHECHE管理系统' });
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  req.session.error = null;
  res.redirect('/login');
});
module.exports = router;
