const koa = require('koa');
const router = require('koa-router');

const Koa = new koa();
const Router = new router();

const appData = require('./data/data.json');
const appShop = require('./data/shop.json');
const config = {
    prot: 3000,
    host: '127.0.0.1'
};

// 异步执行
(async () => {
    Koa.use(async (ctx, next) => {
        // 全局跨域处理
        ctx.set("Access-Control-Allow-Origin", "*");
        await next();

        // 全局404处理
        if (404 == ctx.status) {
            ctx.body = `<h1 style="font-size: 100px; color: red; line-height: 10; text-align: center;">404 Not Router`;
        }
    });

    Router
        .get('/shop', async (ctx, next) => {
            ctx.status = 200;
            ctx.body = appShop.shop;
        })
        .get('/goods', async (ctx, next) => {
            ctx.status = 200;
            ctx.body = appData.goods;
        })

        .get('/seller', async (ctx, next) => {
            ctx.status = 200;
            ctx.body = appData.seller;
        })

        .get('/ratings', async (ctx, next) => {
            ctx.status = 200;
            ctx.body = appData.ratings;
        })

        .post('/list', async (ctx, next) => {
            ctx.status = 200;
            ctx.body = [];
        })

        .put('/update', async (ctx, next) => {
            ctx.status = 200;
            ctx.body = '';
        })

        .del('/remove', async (ctx, next) => {
            ctx.status = 200;
            ctx.body = {};
        });

    Koa
        // 路由注入
        .use(Router.routes())
        
        // 自动设置响应头
        .use(Router.allowedMethods())
        
        // 监听服务
        .listen(config.prot, config.host, () => {
            console.log(`Server已启动：${config.host}:${config.prot}端口!`);
        });
})();