var express = require('express');
var router = express.Router();
var User = require('../user');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('123');
  console.log('session',req.session)
  res.render('index', { title: '微博动态', items: ['qwe', 'qwewes'], isShowLogin: !req.session.user, isShowLogout: !!req.session.user});
});

router.get('/reg', function(req, res, next) {
  res.render('regin', { title: '微博'});
});

router.post('/reg', function(req, res, next) {
  var signalUser = new User(req.body);
  signalUser.get(req.body.username, function(result) {
    if(result) {
      res.render('regResult', {regResult: '账户已经存在', path: '/reg', jump: '重新注册 '});
      return;
    }
    signalUser.save(function() {
      req.session.user = signalUser;
      res.render('regResult', {regResult: '注册成功', path: '/', jump: '去首页'});
    })
  })
});

router.get('/logout', function(req, res, next) {
  // res.send('123');
  req.session.user = null;
  res.redirect('/')
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '微博'});
});

router.post('/login', function(req, res, next) {
  var signalUser = new User(req.body);
  signalUser.get(req.body.username, function(result) {
    console.log(result);
    if(!result) {
      res.render('regResult', {regResult: '账户不存在', path: '/reg', jump: '去注册 '});
      return;
    }
    req.session.user = signalUser;
    res.redirect('/')
  })
});

module.exports = router;
