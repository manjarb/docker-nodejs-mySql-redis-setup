import * as Koa from 'koa'
import * as serve from 'koa-static'
import { Context } from 'vm';

const Router = require('koa-router');
const redisStore = require('koa-redis');
const session = require('koa-generic-session');

import { dbConnect } from '../model/sequelize'
import { Location } from '../model';
import config from '../config'
import RedisService, { CACHE_KEY } from '../service/redis';

const app = new Koa();
const router = new Router();

const cacheId = 12345

router.get('/api/locations', async (ctx: Context, next: Function) => {
    // ctx.router available
    const tryCache = await RedisService.getCache(CACHE_KEY.REPOSITORY_GET, cacheId)
    let location: Location[];
    if (tryCache) {
        console.log('Get Location from redis cache')
        location = JSON.parse(tryCache)
    } else {
        console.log('Get Location from DB')
        location = await Location.findAll({
            order: [
                ["id", "DESC"]
            ]
        })
        await RedisService.setCache(CACHE_KEY.REPOSITORY_GET, JSON.stringify(location), cacheId)        
    }

    ctx.body = {
        data: location
    }
    
});

app.use(session({
        store: redisStore(config.redis)
    }))
    .use(serve("public", {maxAge: 10 * 60 * 60}))
    .use(router.routes())
    .use(router.allowedMethods())

dbConnect();

export default app