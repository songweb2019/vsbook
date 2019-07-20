const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();

//添加路由
//1.用户注册(插入)
router.post('/reg',function(req,res){
  //获取数据
  //console.log(req.body);
  //验证数据是否为空
  if(!req.body.uname){
    res.send({code:401,msg:'uname required'});
	  //阻止往后执行
   	return;
  }
  if(!req.body.upwd){
    res.send({code:402,msg:'upwd required'});
  	return;
  }
  if(!req.body.email){
    res.send({code:403,msg:'email required'});
    return;
  }
  if(!req.body.phone){
    res.send({code:404,msg:'phone required'});
	  return;
  }
//把数据插入到数据库 
//执行SQL语句
pool.query('INSERT INTO vsb_user SET ?',[req.body],function(err,result){
    if(err) throw err;
    //判断是否注册成功
    if(result.affectedRows>0){
      res.send({code:200,msg:'reg suc'});
    }
  });
});

//2.用户登录(查询)
router.post('/login',function(req,res){
  //获取post请求数据
  //console.log(req.body);
  //验证数据是否为空
  if(!req.body.uname){
    res.send({code:401,msg:'uname required'});
	return;
  }
  if(!req.body.upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  //执行SQL语句
  //查询数据中是否含有用户名和密码相匹配的数据
  pool.query('SELECT * FROM vsb_user WHERE uname=? AND upwd=?',[req.body.uname,req.body.upwd],function(err,result){
    if(err) throw err;
	//如果数组中有元素说明成功，没有元素失败
	if(result.length>0){
	  res.send({code:200,msg:'login suc'});
	}else{
	  res.send({code:301,msg:'login err'});
	}
  });
});

//3.删除用户(删除)
router.get('/delete',function(req,res){
  //获取数据
  //console.log(req.query);
  //验证数据是否为空
  if(!req.query.uid){
    res.send({code:401,msg:'uid required'});
	  return;
  }
  //执行SQL语句,删除传递编号对应的数据
  pool.query('DELETE FROM vsb_user WHERE uid=?',[req.query.uid],function(err,result){
    if(err) throw err;
    //affectedRows
	if(result.affectedRows>0){
	  res.send({code:200,msg:'delete suc'});
	}else{
	  res.send({code:301,msg:'delete err'});
	}
  });
});

//4.检索用户(查询)
router.get('/detail',function(req,res){
  //获取数据
  //console.log(req.query);
  //验证数据是否为空
  if(!req.query.uid){
    res.send({code:401,msg:'uid required'});
	  return;
  }
  //执行SQL语句,查询编号对应的数据
  pool.query('SELECT * FROM vsb_user WHERE uid=?',[req.query.uid],function(err,result){
    if(err) throw err;
	  res.send(result);
  });
});

//5.用户修改(更改)
router.post('/update',function(req,res){
  //获取数据
  //console.log(req.body);
  var obj=req.body;
  //验证数据是否为空
  //遍历对象中的属性，如果属性值为空，提示属性名这一项必须的
  var num=400;
  for(var key in obj){
	  num++;
    //console.log(key,obj[key]);
    if(!obj[key]){
	  res.send({code:num,msg:key+' required'});
	  return;
	}
  }
  //执行SQL语句，修改编号对应的数据
  pool.query('UPDATE vsb_user SET phone=?,avatar=?,sex=? WHERE uid=?',[obj.email,obj.phone,obj.user_name,obj.gender,obj.uid],function(err,result){
    if(err) throw err;
	if(result.affectedRows>0){
	  res.send({code:200,msg:'update suc'});
	}else{
	  res.send({code:301,msg:'update err'});
	}
  });
});

//6.用户列表(查询)
router.get('/list',function(req,res){
  //获取数据
  //console.log(req.query);
  var pno=req.query.pno;//页码
  var count=req.query.count;//数量
  //如果页码是空，设置默认值1
  if(!pno) pno=1;
  //如果数量为空，设置默认值2
  if(!count) count=2;
  //将数据转为整型
  pno=parseInt(pno);
  count=parseInt(count);
  //console.log(pno,count);
  //根据页码和数量计算开始查询的值
  // (页码-1)*数量
  var start=(pno-1)*count;
  //执行SQL语句
  pool.query('SELECT * FROM vsb_user LIMIT ?,?',[start,count],function(err,result){
    if(err) throw err;
	res.send(result);
  });
});

//导出路由器对象
module.exports=router;