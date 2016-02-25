var express = require('express');
var mysql      = require('mysql');
cors = require('cors');
var app = express();
app.use(cors());
app.use(express.bodyParser());
var connection = mysql.createConnection({
    host     : '121.42.209.162',
    user     : 'root',
    password : '86.corrode',
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
app.get('/new', function (req, res) {
    var shorturl = req.path.substr(2);
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


/*启动服务器*/
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});