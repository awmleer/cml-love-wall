var express = require('express');
var mysql      = require('mysql');
var app = express();

//引入async
var async=require('async');

//解决跨域问题
cors = require('cors');
app.use(cors());

//引入body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host     : '121.42.209.162',
    user     : 'root',
    password : '',
    database : 'hgb'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected  id:' + connection.threadId);
});


/*定义产生随机数的函数*/
function mathrand() {
    var Num="";
    for(var i=0;i<5;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}


/*test*/
app.get('/test', function (req, res) {
    console.log("test success");
    res.send("ok");
});




/*添加一条*/
app.post('/newitem', function (req, res) {
    var number=mathrand();
    async.series([
        function(callback){
            function generate(){
                connection.query("SELECT * FROM `CML-love-wall` WHERE number="+number, function (err, rows) {
                    if (err) {
                        res.send("fail");
                        return;
                    }
                    if (rows.length != 0) {
                        number=mathrand();
                        console.log(number);
                        generate();
                    }
                });
            }
            generate();//递归调用
            callback(null, 1);
        },
        function(callback){
            connection.query("INSERT INTO `CML-love-wall` (number,content,name,gender) VALUES ('" + number+"','"+ req.body.content+"','"+ req.body.name+"','"+req.body.gender + "');", function (err, rows) {
                if (err) {
                    console.log(err.code);
                    res.send("fail");
                } else {
                    res.send(number);//成功的话返回ok
                    callback(null, 2);
                }
            });
        }
    ]);

});


app.get('/items', function (req, res) {
    connection.query("SELECT number,content,gender FROM CML-love-wall;", function (err, rows) {
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
            res.send("fail");
        } else {
            res.send(rows);//成功的话返回ok
        }
    });
});

/*启动服务器*/
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});