/**
 * Created by Administrator on 2017/11/21 0021.
 */
/*
添加进度条：--这是一个插件
1.引包，js和css包
2.在ajax调用时，使用
*/

//禁用进度环
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done();
  },500)
});
//非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
if(location.href.indexOf("login.html") == -1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function (data) {
      if(data.error === 400){
        //说明用户没有登录，跳转到登录页面
        location.href = "login.html";
      }
    }
  })
}

/*分类管理注册点击事件*/
$(".child").prev().on("click",function () {
    $(this).next().slideToggle();
});

/*给 icon_medu注册点击事件*/
$(".icon_medu").on("click",function () {
  $(".lt_aside").toggleClass("now");
  $(".lt_main").toggleClass("now");
})



/*给 icon_logout 注册点击事件*/
$(".icon_logout").on("click",function () {
  
  $('#logoutModal').modal("show");
  
  /*给退出按钮注册点击事件*/
  $(".btn_logout").off().on("click",function () {
      /*发送ajax请求*/
      $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function (data) {
          if(data.success){
            //退出成功
            location.href="login.html";
          }
        }
      });
  });
})
