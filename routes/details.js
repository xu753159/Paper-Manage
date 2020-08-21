var express = require('express');
var router = express.Router();
var model = require('../model/index')

router.get('/',(req,res,next)=>{
    var username=req.session.username
    var id =parseInt(req.query.id)
    model.connect(function(db){
        db.collection('article').findOne({id:id},(err,doc)=>{
            if(err){
                console.log(err)
            }else{
                var item =doc
                res.render('detail',{username:username,item:item})
            }
        })
    })
})
module.exports =router