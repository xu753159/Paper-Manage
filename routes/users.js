var express = require('express');
var router = express.Router();
var model =require('../model/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register',(req,res)=>{
  //数据校验
  model.connect(function(db){
    db.collection('user').insertOne(req.body,(err,doc)=>{
      if(err){
        console.log('注册失败')
        res.redirect('/register')
      }else{
        res.render('login')
      }
    })
  })
})
router.post('/login',(req,res,next)=>{
  var body =req.body
  // res.send(body)
  model.connect(function(db){
    db.collection('user').find(body).toArray((err,doc)=>{
        if(doc.length>0){
          req.session.username=body.email
          // req.session.username =body.email
          res.redirect('/')
        }else{
          res.redirect('/login')
        }
      
    })

  })
 
})
router.get('/logout',function(req,res,next){
  req.session.username=null
  res.redirect('/login')
})

module.exports = router;
