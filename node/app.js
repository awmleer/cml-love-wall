var express = require('express');
var mysql      = require('mysql');
cors = require('cors');
var app = express();
app.use(cors());
var connection = mysql.createConnection({
    host     : '121.42.209.162',
    user     : 'root',
    password : '86.corrode',
    database : 'shorturl'
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
    connection.query("SELECT * FROM url WHERE shorturl='"+shorturl+"'", function (err, rows) {
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
            res.send("fail");
        } else {
            if (rows.length == 0) {
                res.send("noresult");//查不到结果返回noresult
            }else {
                res.redirect(rows[0].longurl);//查询成功则重定向
            }
        }
    });

});


/*启动服务器*/
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});