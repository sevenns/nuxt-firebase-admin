'use strict'

export default {
  server: { port: 8080 },
  staticDir: '/static',

  session: {
    secrets: ['your-first-secret', 'your-second-secret'],
    config: {
      key: 'koa:sess',
      maxAge: 86400000
    }
  },

  firebase: {
    apiKey: '',
    projectId: ''
  }
}
