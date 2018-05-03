import * as axios from 'axios'

const options = {}

if (process.server) {
  options.baseURL = process.env.HOST_URL
}

export default axios.create(options)
