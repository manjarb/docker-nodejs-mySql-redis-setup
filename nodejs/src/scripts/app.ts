import * as Koa from 'koa'
import * as serve from 'koa-static'

const app = new Koa();

app.use(serve("public", {maxAge: 10 * 60 * 60}))

export default app