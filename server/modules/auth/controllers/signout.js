'use strict'

export default async (context) => {
  if (context.session) {
    context.session = null
  }

  return 'OK'
}
