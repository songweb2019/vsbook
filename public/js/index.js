$(function(){
  
  //导航 点击切换默认样式
  $("#tab li .tabp").click(function(e){
    //阻止事件默认行为
    e.stopPropagation();
           //给自己的爹+active           //给爹的所有兄弟去掉active 
    $(this).parent().addClass("active").siblings().removeClass("active")
 })

 //点击导航2 显示 主页2 
 $(".pct2").click(function(e){
   e.stopPropagation();
   $("#cont2").show().siblings().hide()
 })
 //点击导航2 显示 主页2 
 $(".pct3").click(function(e){
  e.stopPropagation();
  $("#cont3").show().siblings().hide()
})
 //点击导航2 显示 主页2 
 $(".pct4").click(function(e){
  e.stopPropagation();
  $("#cont4").show().siblings().hide()
})


})