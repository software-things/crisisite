import axios from 'axios';
const baseURL = 'https://czk.softwarethings.pro/wordpress/wp-json/';
import PurgecssPlugin from 'purgecss-webpack-plugin';

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'pl',
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],
  styleResources: {
    scss: [
      '@/assets/scss/resources.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/nuxt-client-init.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'nuxt-leaflet',
    'nuxt-purgecss'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://czk.softwarethings.pro/wordpress/wp-json/'
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  purgeCSS: {
    whitelistPatterns: [
      /attachment/, 
      /form/,
      /thumb/
    ]
  },
  generate: {
    routes: (callback) => {
      const Crawler = (postType = 'posts', pattern = `/:slug`, excluded = ['strona-glowna']) => {
        return new Promise((resolve) => {
          const posts = [];
          const request = new Promise((r) => {
            function getAllAvailablePosts(page = 1) {
              axios.get(`${baseURL}wp/v2/${postType}?per_page=100&page=${page}&_embed`).then((response) => {
                const total = parseInt(response.headers['x-wp-totalpages'], 10);
                response.data.forEach((post) => {
                  if (excluded.includes(post.slug)) return;
                  posts.push(pattern.replace(':slug', post.slug));
                });
                if (page < total) getAllAvailablePosts(page + 1);
                if (page === total || total === 0) r(posts);
              });
            }
            getAllAvailablePosts();
          });
          request.then((response) => {
            return resolve(response);
          });
        });
      }

      Promise.all([
        Crawler('posts', `/komunikaty/:slug`),
        Crawler('pages', `/:slug`)
      ]).then((crawlers) => {
        let routes = [];
        crawlers.forEach((crawler) => {
          routes = routes.concat(crawler);
        });
        callback(null, routes);
      });
    }
  }
}
