module.exports = {
  env: {
    HOST_URL: process.env.HOST_URL || 'http://localhost:8080'
  },

  modules: ['cookie-universal-nuxt'],

  router: { middleware: 'authenticated' },
  loading: 'components/PageLoader.vue',

  plugins: [
    '~plugins/vue-svgicon',
    '~plugins/vuetify',
    {
      src: '~plugins/vue-particles',
      ssr: false
    }
  ],

  css: [
    'sanitize.css/sanitize.css',
    '~/node_modules/vuetify/dist/vuetify.min.css',
    {
      src: '~/assets/sass/app.sass',
      lang: 'sass'
    }
  ],

  buildDir: 'build',
  build: {
    babel: {
      'presets': [
        ['env', {
          'modules': false,
          'targets': {
            'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
          }
        }],
        'stage-2'
      ],
      'plugins': ['transform-runtime'],
      'env': {
        'test': {
          'presets': ['env', 'stage-2'],
          'plugins': ['istanbul']
        }
      }
    },

    postcss: {
      'plugins': { 'autoprefixer': {} }
    },

    vendor: ['~/plugins/axios'],

    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  head: {
    title: 'Firebase administration tools',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      },
      {
        name: 'msapplication-TileColor',
        content: '#ffffff'
      },
      {
        name: 'msapplication-TileImage',
        content: '/images/favicon/ms-icon-144x144.png'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'http://cdn.materialdesignicons.com/2.3.54/css/materialdesignicons.min.css'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/images/favicon/apple-icon-57x57.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/images/favicon/apple-icon-60x60.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/images/favicon/apple-icon-72x72.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/images/favicon/apple-icon-76x76.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/images/favicon/apple-icon-114x114.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/images/favicon/apple-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/images/favicon/apple-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/images/favicon/apple-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/images/favicon/apple-icon-180x180.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/images/favicon/android-icon-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/images/favicon/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/images/favicon/favicon-96x96.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/images/favicon/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        href: '/images/favicon/manifest.json'
      }
    ]
  }
}
