var express = require('express');
var config = require('./index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();


router.get('/', function(req, res, next){
	req.url = '/index.html';
	next();
});

app.use(router);

//获取数据源
var appData = require('../data/data.json');  //data目录下的data.json文件
var seller = appData.seller;  //data.json文件中的 seller数据项(商家信息) json格式的{"":""}
var goods = appData.goods; //data.json文件中的 goods数据项 (商品信息)array->json格式的[{"":""},{"":""}]
var ratings = appData.ratings; //data.json文件中的 ratings数据项 (评论信息)array->json格式的[{"":""},{"":""}]

//设置路由 创建 路由API
var apiRouters = express.Router();

//var mupiao = express();
//mupiao.get('/', function(req, res, next){
//	res.json({
//		erron: 0,
//		data: appData
//	})
//});
//app.use('/data', mupiao);

//商家信息接口
apiRouters.get('/seller', function(req, res, next){
	res.json({
		erron: 0,
		data: seller
	})
})

//商品信息接口
apiRouters.get('/goods', function(req, res, next){
	res.json({
		erron: 0,
		data: goods
	})
});

//评论信息接口
apiRouters.get('/ratings', function(req, res, next){
	res.json({
		erron: 0,
		data: ratings
	})
});

app.use('/api', apiRouters);

app.use(express.static('./dist'));

//var _resolve
//var readyPromise = new Promise(resolve => {
//_resolve = resolve
//})

var server = app.listen(port)

module.exports = {
//ready: readyPromise,
  close: () => {
    server.close()
  }
}

