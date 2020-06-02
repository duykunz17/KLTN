var express = require('express');
var cors = require('cors');
var socketio = require('socket.io');
var http = require('http');

var createError = require('http-errors');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// connect mongodb
require('./configures/mongodb');

var app = express();
const port = process.env.PORT || 3001;

app.use(cors());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
var server = http.createServer(app);

var io = socketio(server);
const { addUser, removeUser, getUser, getUserByName, getUserInPost } = require('./usersOnline');

io.on('connection', (socket) => {
    socket.on('joinDetailPost', ({account, post_id}, callback) => {
        let name = '';
        if (account)
            name = account._id;
        else
            name = socket.id;

        let { error, user } = addUser({id: socket.id, name, room: post_id});
        if (error) return callback(error);

        socket.join(user.room);

        // callback({users: getUserInRoom(user.room)});
        callback();
    });
    socket.on('sendComment', (comment, callback) => {
        let user = getUser(socket.id);
        io.to(user.room).emit('comment', {result: comment});

        // io.emit('listUserOnline', {room: user.room, users: getUserInRoom(user.room)});

        callback();
    });

    // handling review post of admin
    socket.on('joinAdmin', ({account}, callback) => {
        let { error, user } = addUser({id: socket.id, name: account._id, room: 'adminroom'});
        if (error) return callback(error);

        // console.log(getUserInPost('adminroom'))

        socket.join(user.room);

        // callback({users: getUserInRoom(user.room)});
        callback();
    });
    socket.on('submitPost', (post, callback) => {
        let user = getUser(socket.id);
        // It is sent to all users in the room
        io.to(user.room).emit('receivePost', {result: post});

        callback();
    });
    socket.on('handlingPost', (post, callback) => {
        // It is only sent to one user
        let account = getUserByName(post.account._id);
        io.to(account.id).emit('resultHandling', {result: post});

        callback();
    });

    socket.on('disconnect', () => {
        removeUser(socket.id);
    })
});

// call routes
var accountRouter = require('./routes/account');
var placeRouter = require('./routes/place');
var productRouter = require('./routes/product');
var billRouter = require('./routes/bill');
var postRouter = require('./routes/post');
var adminRouter = require('./routes/admin');
var scheduleRouter = require('./routes/schedule');
app.use('/account', accountRouter);
app.use('/place', placeRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/bill', billRouter);
app.use('/post', postRouter);
app.use('/schedule', scheduleRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

server.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;