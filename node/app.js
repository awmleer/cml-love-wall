var express = require('express');
var mysql      = require('mysql');
var app = express();

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



/*test*/
app.get('/test', function (req, res) {
    console.log("test success");
    res.send("ok");
});




/*添加一条*/
app.post('/new', function (req, res) {
    connection.query("INSERT INTO CML-love-wall (number,content,name,gender) VALUES ("+req.data.number+");", function (err, rows) {
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
            res.send("fail");
        } else {
            res.send("ok");//成功的话返回ok
        }
    });

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