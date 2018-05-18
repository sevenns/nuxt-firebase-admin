'use strict'

import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import config from '~/server/config'
import routes from '~/server/routes'
import mount from 'koa-mount'

export default (app) => {
  app.keys = config.session.secrets

  app.use(async (context, next) => {
    try {
      await next();

      if (context.status === 404 && context.res.headersSent === false) {
        context.throw(404);
      }
    } catch (error) {
      context.status = error.status || 500

      context.type = 'json'
      context.body = error.message

      context.app.emit('error', error, context)
    }
  })

  app.use(bodyParser())
  app.use(serve(config.staticDir))
  app.use(session(config.session.config, app))
  app.use(mount('/api', routes()))
}
