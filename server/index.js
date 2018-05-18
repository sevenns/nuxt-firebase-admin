'use strict'

import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import config from '~/server/config'
import middlewares from '~/server/middlewares'
import nuxtConfig from '~/nuxt.config.js'

async function start () {
  const app = new Koa()
  const host = process.env.HOST || 'localhost'
  const port = process.env.PORT || config.server.port

  nuxtConfig.dev = !(app.env === 'production')
  const nuxt = new Nuxt(nuxtConfig)

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    builder.build().catch(e => {
      console.error(e)
      process.exit(1)
    })
  }

  middlewares(app)

  app.use(ctx => {
    ctx.status = 200

    return new Promise((resolve, reject) => {
      ctx.req.session = ctx.session // for nuxtServerInit
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
}

start()
