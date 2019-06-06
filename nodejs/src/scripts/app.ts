import * as Koa from 'koa'
import * as serve from 'koa-static'
import {dbConnect} from '../model/sequelize'

const app = new Koa();
app.use(serve("public", {maxAge: 10 * 60 * 60}))
dbConnect();

export default app