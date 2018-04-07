const Koa = require('koa');
const app = new Koa();
const router=require('koa-simple-router');//路由中间件

const Convert=require('koa-convert');//koa1 时代下的中间件转化为 koa2 下可用的中间件
//用法Convert(koa1时代的函数) 得到koa2对应的函数

const path=require('path');
const render=require('koa-swig');//前端模版引擎，用于渲染页面
const co=require('co');//用于 Generator 函数的自动执行(生成器函数)。返回的是promise对象可以then
const server=require('koa-static');//静态资源中间件，负责托管 Koa 应用内的静态资源，如js css 等


const book=require('./models/book');

var qs = require('qs');  //post 传参需要引入该库?
var body=require('koa-body');//拿post参数需要引入该库！！
app.use(body());

app.context.render=co.wrap(render({
    root:path.join(__dirname,'./views'),
    autoescape:true,
    cache:'memory',
    ext:'html',
    //此句需要删除才能传参。。。？ varControls:['[[',']]'],
    writeBody:false
}));

app.use(router(_=>{
    _.get('/',(ctx,next)=>{
        ctx.body='hello';
    });
    _.get('/index',async(ctx,next)=>{
        ctx.body=await ctx.render('index.html');
    });
    _.get('/book',async(ctx,next)=>{
        ctx.body=await ctx.render('book.html',{title:'首页'});
    });
    _.get('/book/booklist',async(ctx,next)=>{
        const {data}=await new book().getBookList();
        ctx.body=data;
        

    });
    _.post('/book/delete/',async(ctx,next)=>{
        // console.log(id);
        //const {id} = ctx.query;     get传参
        const {id}=ctx.request.body;
        const {data}=await new book().deleteBookById(id);
        console.log(data);
        ctx.body=data;
        

    });
    _.post('/book/getbook/',async(ctx,next)=>{
        // console.log(id);
        //const {id} = ctx.query;     get传参
        const {id}=ctx.request.body;
        const {data}=await new book().getBookDetailById(id);
        console.log(data);
        ctx.body=data;
        

    });
    _.post('/book/editbook/',async(ctx,next)=>{
        // console.log(id);
        //const {id} = ctx.query;     get传参
        const {data}=await new book().createOrUpdateBookById(ctx.request.body);
        console.log(data);
        ctx.body=data;
        

    });
}));
app.use(server(path.join(__dirname,'./public')));
app.listen(3000,()=>{
    console.log('Server Started!');
});