const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'loginuser',
    password : 'loginpass',
    database : 'logindb'
});
if(connection){
    console.log('connected')
}
const app = express()
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// app.set('trust proxy', 1);
//
// app.use(session({
//     cookie:{
//         secure: true,
//         maxAge:60000
//     },
//     store: new RedisStore(),
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: false
// }));

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(__dirname))

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'))
});

app.get('/lesssons.html', function(request, response) {
    response.sendFile(path.join(__dirname + '/lesssons.html'))
});

app.post('/login', function(req, res) {
    var username = req.body.username;
    console.log(username)
    var password = req.body.password;
    console.log(password)
    if (username && password) {
        var sqlq = 'Select * from users;'
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password],function(error, results, fields) {
            if (results.length>0) {
                res.redirect('/lesssons.html');
            } else {
                res.redirect('/');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});



app.get('/logout' , function (req,res) {

    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/login.html');
        }
    });

})
// var urlRow;
// app.get('/playonline' , function (req,res) {
//
//     connection.query('Select url from video where type = ?', ['online'], function (err, rows, fields) {
//         console.log(rows[0].url);
//         urlRow = rows[0].url
//         res.redirect('/VideoView.html')
//         changeImg()
//
//     })
// })



app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
});


