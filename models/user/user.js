//实现与mysql交互
var mysql = require('mysql');
var $conf = require('../../conf/db');
var $util = require('../../util/util.js');
var $sql = require('./userSql.js');
var crypto =require('crypto');

//使用连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

var radmonSalt = function() {
  return Math.random().toString().slice(2, 8);
};

//  md5加密密码
var md5Pwd = function (password, salt) {
  var md5 = crypto.createHash('md5');
  var pass = md5.update(password).digest('hex');
  var saltStr = pass.substr(0, 10) + salt;
  var md5t = crypto.createHash('md5');
  var result = md5t.update(saltStr).digest('hex')
  return result;
};

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

module.exports = {
  login: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error(err);
        return;
      }
      let userName = req.body.user;
      let pwd = req.body.password;
      connection.query($sql.userByUname, userName, function (err, result) {
        if (err) {
          console.error(err);
          return;
        }
        if (result.length === 0) {
          req.session.error = '用户不存在';
          return jsonWrite(res, {
            code: '1',
            msg: '用户不存在, 请注册'
          });
        }
        var $password = result[0].password;
        var $salt = result[0].salt;
        var md5passWord = md5Pwd(pwd, $salt)
        if ($password === md5passWord) {
          req.session.user = {
            name: result[0].name,
            score: result[0].score,
            userName: result[0].userName,
            id: result[0].id,
            address: result[0].address           
          };
          jsonWrite(res, {
            code: '0',
            msg: '操作成功',
            data: {
              name: result[0].name,
              score: result[0].score,
              userName: result[0].userName,
              id: result[0].id,
              address: result[0].address
            } 
          });
        } else {
          req.session.error = '密码不正确';
          jsonWrite(res, {
            code: '1',
            msg: '密码不正确',
            data: {}          
          })
        }
        connection.release();
      });
    });
  },
  register: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.error(err);
        return;
      }
      let userName = req.body.user;
      let pwd = req.body.password;
      connection.query($sql.userByUname, userName, function(err, result) {
        if (result.length) {
          jsonWrite(res, {
            code: '1',
            msg: '该用户已存在',
            data: {}
          })
          return;
        } else {
          var salt = radmonSalt();
          var password = md5Pwd(pwd, salt);
          console.log(result);
          // INSERT INTO `lee_cdd_userinfo` (`id`,`username`,`password`,`name`,`address`,`salt`) VALUES(0,?,?,?,?)
          connection.query($sql.insert, [userName, password, salt], function(err, result) {
            if (err) {
              console.error(err);
              return;
            }
            jsonWrite(res, {
              code: '0',
              msg: '注册成功',
              data: {}
            });
          })
        }
      });
    })
  }
};