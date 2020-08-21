var express = require('express');
var router = express.Router();
var model = require('../model/index')
var sd = require('silly-datetime');
const { use } = require('./users');
/* GET home page. */
router.get('/', function (req, res, next) {
  var username = req.session.username || ''
  // console.log(req.query)
  // if(req.query.page>)
  // console.log(page)
  var data = {
    total: 0,
    // curPage: page,
    prePage:1,
    nextPage:1,
    list: []
  }
  var pageSize = 3
  model.connect(function (db) {
    db.collection('article').find().toArray((err, doc) => {
      data.total = Math.ceil(doc.length / pageSize)
      var page = req.query.page || 1
      
      data.curPage =page
      if(page-1<1){
        data.prePage =1
      }else{
        data.prePage =page-1
      }
      if(page+1>data.total){
        data.nextPage =data.total
      }else{
        data.nextPage =page+1
      }
      // if(page>=data.total){
      //   page =data.total
      // }else if(req.query.page<=1){
      //   page =1
      // } 

      // data.curPage = page
      //  if(page>data.total){
      //    page=data.total
      //  }else if(page<1){
      //    page=1
      //   //  req.query.page=page
      //  }
      //  console.log(data.curPage)
      model.connect(function (db) {
        db.collection('article').find().sort({
          _id: -1
        }).limit(pageSize).skip((page - 1) * pageSize).toArray(function (err, doc2) {
          if(doc2.length==0 && doc.length!=0){
            // return
            res.redirect('/?page='+((page-1)||1))
          }else{
            doc2.map(function(ele,index){
              ele['time']=sd.format(ele.id,'YYYYMMDD')
            })
            data.list =doc2
            // return
            res.render('index',{username:username,data:data})
          }
        })
      })
      // console.log(data)

    })
  })
});
router.get('/register', (req, res) => {
  res.render('register')
})
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/write', (req, res) => {
  var username =req.session.username||''
  var id=parseInt(req.query.id)
  var page =req.query.page
  var item ={
    title:'',
    article:''
  }
  if(id){
    model.connect(function(db){
      db.collection('article').findOne({id:id},function(err,doc){
        if(err){
          console.log('查询失败')
        }else{
          item =doc
          item['page']=page
          res.render('write',{username:username,item:item})
        }
      })
    })
  }else{
    res.render('write',{username:username,item:item})
  }

})
 

module.exports = router;