/**
 * Created by Administrator on 2017/11/21 0021.
 */
$(function () {
    //表单校验的功能
  var $form = $("form");
  $form.bootstrapValidator({
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置规则
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名，不能为空"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码，不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度为6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  });

  
  // 给表单注册一个校验成功事件
  $form.on("success.form.bv", function(e){
    //阻止表单的默认提交
    e.preventDefault();
    //使用ajax进行提交
    
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      // dataType:"json",
      success:function(data){
        if(data.success){
            location.href = "index.html";
        }
        if(data.error===1000){
          // alert("用户名不存在");
          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(data.error===1001){
          // alert("密码错误");
          $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    });
  });
  
  
  //重置功能
  $("[type='reset']").on("click", function(){
    
    //重置表单样式
    $("form").data("bootstrapValidator").resetForm();
    
  });
})