var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
var querystring = require('querystring');
var mime = require('mime');// npm install mime
var session = {};//会话数据存放的位置
var now = Date.now();
var users;
var KEY = 'user_zfpx';

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    var cookieObj = querystring.parse(req.headers.cookie,'; ');
    var reg_use;

    if(pathname == '/favicon.ico'){
        res.end('404');
    }else if(pathname == '/'||pathname == '/reg'){
        if(req.method == 'POST'){
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                users={username: fields.username, 'password': fields.password};
                res.statusCode=302;  //
                res.setHeader("Location","/login");
                res.end();
            });
        }else{
            if(cookieObj[KEY]){
                var sessionId = cookieObj[KEY];
                var sessionObj = session[sessionId];
                if(!sessionObj){
                    fs.createReadStream('./reg.html').pipe(res);
                }else{
                    res.end('已经登录');
                }
            }else{
                fs.createReadStream('./reg.html').pipe(res);
            }
        }
    }else if(pathname == '/login') {
        if(req.method == 'POST'){
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
                if(users.username == fields.username && users.password == fields.password){
                    var sessionObj = {username:fields.username,password:fields.password};
                    var sessionId = now+'_'+Math.random();//给用户购物卡号
                    session[sessionId] = sessionObj;
                    res.writeHead(200, {
                        'Set-Cookie': KEY+"=" + sessionId,
                        'Content-Type': 'text/html'
                    });
                    res.end("<div class='wrapper'><a href='/home'> home</a></div>");
                }else{
                    res.end("<div class='wrapper'><a href='/login'> login</a><a href='/reg'> reg</a></div>");
                }
            });
        }else{
            if(cookieObj[KEY]){
                var sessionId = cookieObj[KEY];
                var sessionObj = session[sessionId];
                if(!sessionObj){
                    fs.createReadStream('./login.html').pipe(res);
                }else{
                    res.end('已经登录');
                }
            }else{
                fs.createReadStream('./login.html').pipe(res);
            }
        }
    }else if(pathname == '/home'){
        if(cookieObj[KEY]){
            var sessionId = cookieObj[KEY];
            var sessionObj = session[sessionId];
            if(!sessionObj){
                res.end("<div class='wrapper'><a href='/login'> Login</a>" + "<br>" + "<a href='/reg'> Sign Up</a></div>");
            }else{
                reg_use = session[cookieObj[KEY]]['username'];
                fs.readFile('./home.html',function(err,data){
                    res.end(data.toString('utf8').replace('<%=username%>',reg_use));
                });
            }
        }else{
            res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
            res.end("<link rel='stylesheet' href='css/index.css'/><div class='header'><div class='homereg'><a href='/login'> Login</a>" + "<a href='/reg' class=''> Sign Up</a></div></div>");
        }
    }else if(pathname == '/data'){
        var result = [];
        req.on('data',function(chunk){
            result.push(chunk);
        });
        req.on('end',function(){
            var body = Buffer.concat(result).toString();
            var bodyObj = querystring.parse(body);
            res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
            res.write('<p class="page_title">'+bodyObj.title+'</p>');
            res.write('<p class="page_smalltext">'+bodyObj.smalltext+'</p>');
            res.end();
        });
    }else{
        var filename = '.'+pathname;
        res.setHeader('Content-Type',mime.lookup(filename));
        fs.exists(filename,function(exists){
            if(exists){
                fs.readFile(filename,function(err,data){
                    res.end(data);
                })
            }else{
                res.end('404你访问的路径不存在');
            }
        })
    }
}).listen(8080);