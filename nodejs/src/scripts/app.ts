import * as Koa from 'koa'
import * as serve from 'koa-static'
import { Context } from 'vm';

const Router = require('koa-router');

import { dbConnect } from '../model/sequelize'
import { Location } from '../model';

const app = new Koa();
const router = new Router();

router.get('/api/locations', async (ctx: Context, next: Function) => {
    // ctx.router available
    const total = await Location.count()
    console.log(total, ' :total Lcotians')
    ctx.body = {
        data: await Location.findAll({
            order: [
                ["id", "DESC"]
            ]
        })
    }
});

app.use(serve("public", {maxAge: 10 * 60 * 60}))
    .use(router.routes())
    .use(router.allowedMethods())

dbConnect();

export default app