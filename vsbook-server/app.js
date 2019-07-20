//使用express构建web服务器 --11:25
const express = require('express');
//引入body-parser
const bodyParser = require('body-parser');

/*引入路由模块*/
const index=require("./routes/index");
const userRouter=require('./routes/user.js');
//const details=require("./routes/details");
const cors=require("cors");

//创建web服务器
var app = express();
var server = app.listen(3000);

//实现跨域
app.use(cors({
  origin:"http://127.0.0.1:5500"
}));

//使用body-parser中间件，将post请求的数据格式化为对象
app.use(bodyParser.urlencoded({extended:false}));

//托管静态资源到public下
app.use(express.static('public'));

/*使用路由器来管理路由*/
app.use("/index",index);
//app.use("/details",details);
app.use('/user',userRouter);
