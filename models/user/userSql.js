var user = {
  insert: 'INSERT INTO `lee_cdd_userinfo` (`id`,`username`,`password`,`salt`) VALUES(0,?,?,?)' ,
  delete: 'DELETE from lee_cdd_userinfo where id=?',
  update: 'UPDATE `good` SET `name`=?,`address`=?,`password`=?,`username`=? WHERE `id`=?',
  userAll: 'SELECT * from lee_cdd_userinfo',
  userById: 'SELECT * from lee_cdd_userinfo WHERE id=?',
  userByUname: 'SELECT * from lee_cdd_userinfo WHERE username=?'
};

module.exports = user;