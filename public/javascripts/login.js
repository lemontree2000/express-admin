$(function(){
  $('#register-btn').click(register);
  $('#login-btn').click(login);


  function login() {
    var user = $('#username').val();
    var password = $('#password').val();
    if (user === '' || password == '') return Materialize.toast('请输入账号和密码', 3000);
    $.post('/login', {
      user: user,
      password: password
    },function(res){
      if (res.code === '0') {
        location.href = '/'; 
      } else {
        Materialize.toast(res.msg, 3000)
      }
    });
  }

  function register() {
    var user = $('#username').val();
    var password = $('#password').val();
    if (user === '' || password == '') return Materialize.toast('请输入账号和密码', 3000);
    $.post('/login/register', {
      user: user,
      password: password
    },function(res){
      if (res.code === '0') {
        Materialize.toast('注册成功，可以登录了', 3000)
      } else {
        Materialize.toast(res.msg, 3000)
      }
    });
  }
});