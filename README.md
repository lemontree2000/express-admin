# express-admin

> 一个用的node.js express框架mysql数据库 + 前端Materialize-UI 搭建的后台管理系统

### 技术栈

- Expresss
- mysql
- Materialize-UI
- express-session
- ...

### 功能完成进度

 - [x] 登录
 - [x] 注册
 - [x] 注销
 - [x] session状态拦截

### 使用方法

**Git clone**
```
git clone https://github.com/lemontree2000/express-admin.git
```

**npm install**
```
cd express-admin

npm install
```

**配置数据库**

```javascript
  // conf/db.js
  mysql: {
    host: 'localhost',
    user: 'root', // 账号 mysql默认为root
    password: '', // 密码 默认为空
    database: 'butler', // 要连接的数据库名
    port: 3306  // 数据库端口
  }
```

**npm start**

```
npm start

访问 http://localhost:3000 即可
```

