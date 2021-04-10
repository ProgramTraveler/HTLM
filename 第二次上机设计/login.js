//对显示登录和注册界面进行控制
function blockornone(id){
    //alert("id:"+id); //网页提示，说明当前选择的方法
    // login.html里面的内容
    //显示传过来的值
    if(id=="regedit_div"){
      //显示注册，隐藏登录
        document.getElementById(id).style.display='block';
        document.getElementById("login_div").style.display='none';
        
        document.getElementById("t_reg").style.color='#1ba71b';
        document.getElementById("t_log").style.color='gray';
    }
    if(id=="login_div"){
        //显示登录，隐藏注册
        document.getElementById(id).style.display='block';
        document.getElementById("regedit_div").style.display='none';
        
        document.getElementById("t_reg").style.color='gray';
        document.getElementById("t_log").style.color='#1ba71b';
    }
}