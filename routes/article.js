var express = require('express');
var router = express.Router();
var model = require('../model/index')
//
router.post('/add',(req,res)=>{
    var id = parseInt(req.body.id)
    // console.log(req.body)
    if(id){
        var page =req.body.page
        var title =req.body.title
        var article =req.body.article
        model.connect(function(db){
            db.collection('article').updateOne({id:id},{$set:{
                title:title,
                article:article
            }},function(err,ret){
                if(err){
                    console.log(err)
                }else{
                    console.log('修改成功')
                    res.redirect('/?page='+page)
                }
            })
        })
    }else{
        var data ={
            title:req.body.title,
            article:req.body.article,
            id:Date.now(),
            username:req.session.username||'未知用户'
        }
        model.connect(function(db){
            db.collection('article').insert(data,(err,result)=>{
                if(err){
                    console.log('文章发布失败',err)
                    res.redirect('/write')
                }else{
                    res.redirect('/')
                }
            })
        })
    }
    
})
router.get('/delete',(req,res)=>{
    var id =parseInt(req.query.id)
    var page =req.query.page
    model.connect(function(db){
        db.collection('article').deleteOne({id:id},function(err,ret){
            if(err){
                console.log('删除失败')
            }else{
                console.log('删除成功')
            }
            res.redirect('/?page='+page)
        })
    })
})
module.exports = router;
