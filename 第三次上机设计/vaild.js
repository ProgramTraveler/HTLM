//判断注册的输入是否合法
window.onload = function(){
    var pt = document.getElementById('pt');
    var btn = document.getElementById('btn');
    var pasF = document.getElementById('pasF');
    var pasS = document.getElementById('pasS');
    btn.onclick = function(){
        var value = pt.value;
        var valueF = pasF.value;
        var valueS = pasS.value;
        // 判断是否为空
        if(value == '' || value == ' '){
            alert('用户名不能为空');
            black;
        }else if(valueF == '' || valueF == ' ') {
            alert('密码不能为空');
            black;
        }
        // 输入的是不是数字
        else if(isNaN(value)){
            alert('含有非数字元素');
            black;
        }
        // 位数在5-11
        else if(!(value.length >=5 && value.length <= 11)){
            alert('账号位数应在5 - 11位间');
            black;
        }
        //第一位不为零
        else if(value.charAt(0) == '0'){
            alert('第一位数不能为 0!')
            black;
        }
        // 不能是小数
        else if(parseInt(value) != value){
            alert('不能出现小数');
            black;
        }else if(valueF != valueS){
            alert('输入的两个密码不一致');
            black;
        }else{
            alert('注册成功');
            black;
        }
    }
}