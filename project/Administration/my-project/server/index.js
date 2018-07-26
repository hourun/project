var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser= require('body-parser')
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "backstage"
});
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

//设置跨域访问
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    // res.header("Content-Type", "application/json;charset=utf-8");

    next();
});
app.get("/", function(req, res) {
  return res.send("hello world");
});

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });
app.get("/userList", (req, res) => {
  connection.query(
      "select id,username,birthday,phone,address from user",
      (err, rows, fields) => {
          if (err) throw err;
          console.log(rows);
          res.json({
              code: 0,
              data: rows
          });
      }
  );
});

// 拉取角色列表
app.get("/rolerList", (req, res) => {
  let id = req.query.id,
      allRoler = [];
  console.log(req.query);
  connection.query("select id,rolername from roler", (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      allRoler = rows;
      if (id) {
          connection.query(
              `select rid,rolername from user_roler, roler where user_roler.rid = roler.id and user_roler.status=1 and user_roler.uid=${id}`,
              (err, rows, fields) => {
                  if (err) throw err;
                  console.log(rows);
                  res.json({
                      code: 0,
                      allRoler,
                      myRoler: rows
                  });
              }
          );
      } else {
          res.json({
              code: 0,
              allRoler,
              myRoler: []
          });
      }
  });
});
// 添加角色接口
app.get("/addRoler", (req, res) => {
  let uid = req.query.uid,
      rid = req.query.rid;
  // 先查询用户是否有该角色，如果有则不添加
  connection.query(
      `select rid from user_roler where uid=? and rid=? and status =1`,
      [uid, rid],
      function(err, rows, fields) {
          if (err) throw err;
          console.log("rows...", rows);
          if (rows.length) {
              res.json({
                  code: -2,
                  msg: "已有该角色"
              });
          } else {
              connection.query(
                  `insert into user_roler (uid, rid) values(?, ?)`,
                  [uid, rid],
                  function(err, rows, fields) {
                      if (err) throw err;
                      console.log(rows);
                      if (rows.insertId) {
                          res.json({
                              code: 0,
                              msg: "添加角色成功"
                          });
                      } else {
                          res.json({
                              code: -1,
                              msg: "添加角色失败"
                          });
                      }
                  }
              );
          }
      }
  );
});

// 删除角色接口
app.get("/removeRoler", (req, res) => {
  let uid = req.query.uid,
      rid = req.query.rid;
  connection.query(
      `update user_roler set status=0  where uid=? and rid=?`,
      [uid, rid],
      function(err, rows, fields) {
          if (err) throw err;
          console.log(rows);
          if (rows.affectedRows) {
              res.json({
                  code: 0,
                  msg: "删除角色成功"
              });
          } else {
              res.json({
                  code: -1,
                  msg: "删除角色失败"
              });
          }
      }
  );
});

// 登陆接口
app.post("/login", jsonParser, (req, res) => {
  console.log("req...", req.body);
  // 获取该用户名的数量
  connection.query(
      `select count(*) as num from user where username = ?`,
      [req.body.username],
      function(err, rows, fields) {
          if (err) throw err;
          if (rows[0].num) {
              connection.query(
                  `select count(*) as num,id from user where username = ? and password = ?`,
                  [req.body.username, req.body.password],
                  (err, rows, fields) => {
                      // console.log(rows);
                      if (rows[0].num == 1) {
                          res.json({
                              code: 0,
                              id: rows[0].id,
                              msg: "登陆成功"
                          });
                      } else {
                          res.json({
                              code: -2,
                              msg: "登陆失败"
                          });
                      }
                  }
              );
          } else {
              // 创建新用户代码
              // connection.query(`insert into user (username, password, phone, birthday) values('${req.body.username}', '${req.body.password}', '', ${+ new Date()})`, (err, rows, fields)=>{
              //     console.log(rows, );
              //     if (rows.insertId){
              //         res.json({
              //             code: 0,
              //             msg: '新增成功'
              //         })
              //     }else{
              //         res.json({
              //             code: -1,
              //             msg: '新建用户失败'
              //         })
              //     }
              // })
              res.json({
                  code: -2,
                  msg: "不允许创建新用户"
              });
          }
      }
  );
});

// 获取权限列表
app.get("/accessList", (req, res) => {
  let uid = req.query.uid;
  connection.query(
      `select access.accessname from user,user_roler,roler_access,access where user.id=user_roler.uid
  and user_roler.rid = roler_access.rid and roler_access.aid = access.id and uid=? and user_roler.status=1 group by access.id`,
      [uid],
      function(err, rows, fields) {
          if (err) throw err;
          console.log(rows.length, rows);
          res.json({
              code: 0,
              list: rows
          });
      }
  );
});

app.get("/list", function(req, res) {
  //connection.connect();
  connection.query("select * from administration", function(err, rows, fields) {
    if (err) throw err;
    console.log("The solution is: ", rows);
  });
   connection.end();
  res.end("111");
});

app.listen(9000);
console.log("启动");
