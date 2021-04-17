window.onload=function(){
    document.getElementsByTagName("a")[0].onclick = function(){
        <p>hello</p>
        ajax=new XMLHttpRequest();
        var method="GET";
        var url=this.href;
        ajax.open(method,url,true);
        ajax.send();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4){
                if(ajax.status ==200 || ajax.status==304){
                    var d1=document.getElementById("d1");	//获取网页中的div
                    var result=ajax.responseText;			//获取json（是字符串）
                    var obj=eval("("+result+")");			//将字符串json转化为json对象，加括号将符合语句变成简单语句
                    var name=obj.date;						//获取name
                    var age=obj.user;						//获取age
                    
                    var cDiv=document.createElement("h1");	//创建一个h1标签
                    cDiv.appendChild(document.createTextNode(name+"..."+age))//在h1标签中添加文本：获取的姓名和年龄
                    d1.innerHTML="";						//（如果div的内容存在）清空div标签
                    d1.appendChild(cDiv);//在网页的div标签中添加这个h1标签
                }
            }
        }
        return false;//防止自动跳转
    };
};