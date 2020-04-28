var express = require('express');
var cors = require('cors');

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

// call routes
var accountRouter = require('./routes/account');      // handling login and sign in
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/account', accountRouter)
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;