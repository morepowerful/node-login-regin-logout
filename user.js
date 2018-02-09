// var mongodb = require('./db');
var mongo = require("mongodb"); //引入mongodb模块
var assert = require("assert"); //引入断言模块
var MongoClient = mongo.MongoClient;  //开启服务
var Urls = "mongodb://127.0.0.1:27017/demo2";  //demo2（数据库名字）
function User(user) {
    this.username = user.username;
    this.password = user.password;
}

module.exports = User;
User.prototype.save = function(callback) {
    var user = {
        username: this.username,
        password: this.password,
    }
    MongoClient.connect(Urls,function(err,db){
        assert.equal(null,err);  //使用断言模块代替以前的 if判断

        db.collection("users").insert(user,function(err,result){ //连接到数据库上面，并使用参数传入集合
            assert.equal(null,err);
            callback();
            db.close();
        })
    })
}

User.prototype.get = function(username, callback) {
    MongoClient.connect(Urls,function(err,db){
        assert.equal(null,err);  //使用断言模块代替以前的 if判断
        db.collection("users").findOne({username: username},function(err,result){ //连接到数据库上面，并使用参数传入集合
            assert.equal(null,err);
            callback(result);
            db.close();
        })
    })
}