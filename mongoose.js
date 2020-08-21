 const mongoose = require('mongoose');

 //建立3连接
 mongoose.connect('mongodb://127.0.0.1:27017/music')
//对字段格式进行限制
 var UserSchema =mongoose.Schema({
     name:String,
     age:Number,
     student:Array
 })
 //var user=mongose.model('User',UserSchema')默认会操纵users表
 var User =mongoose.model('User',UserSchema,'user');

 //增加数据
//  实例化模型
var u =new User({
    name:'xx1',
    age:18,
    student:[2,4,5]
})
u.save((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('成功')
    }
})
User.updateMany({name:'xx1'},{name:'yy1'},(err,doc)=>{
    if(err){
        console.log(err)
    }else{
        console.log(doc)
    }
})
User.find({},(err,doc)=>{
    if(err){
        console.log(err)
    }else{
        console.log(doc)
    }
})
User.deleteMany({_id:'5f1e5d22302c48f755961ac1'},(err,doc)=>{
    if(err){
        console.log(err)
    }else{
        console.log(doc)
    }
})