// Expressで利用する npm モジュールを読み込む
var createError = require('http-errors');     // HTTPのエラーを作成するモジュール
var express = require('express');             // Expressの本体
var path = require('path');
var cookieParser = require('cookie-parser');  // Cookieを解釈するモジュール
var logger = require('morgan');               // コンソールにログを整形して出力するモジュール
var helmet = require('helmet');               // Expressの機能を拡張し、HTTPにおいて脆弱性となるヘッダなどを取り除くなどし、安全に使えるようにしてくれる様々な脆弱性に対する機能を備えたモジュール

// routesディレクトリの中にあるRouterオブジェクトのモジュールを読み込む
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');

var app = express();  // Applicationオブジェクトをexpressのモジュールを利用して作成し、appという変数に格納
app.use(helmet());

// Applicationの設定を行う
app.set('views', path.join(__dirname, 'views'));  // テンプレートのファイルがviewsディレクトリにあることを設定
app.set('view engine', 'pug');                    // テンプレートエンジンが pug であることを設定

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);

// catch 404 and forward to error handler　存在しないパスへのアクセスがあった際の処理
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler　エラー処理：views/error.pug というテンプレートを使ってエラーを表示させる
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
