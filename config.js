/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

const fm = require('front-matter')
const shiki = require('shiki')

module.exports = {
  baseURL: {
    url: '/images/',
    tags: ['img', 'source'],
  },
  build: {
    templates: {
      source: 'src/content',
      filetypes: ['md'],
      destination: {
        path: 'build_local',
      },
      assets: {
        source: 'src/images',
        destination: 'images',
      },
    },
  },
  markdown: {
    plugins: [
      {
        plugin: require('markdown-it-attrs'),
      }
    ]
  },
  events: {
    async beforeCreate(config) {
      const highlighter = await shiki.getHighlighter({
        theme: 'material-theme-palenight',
      })

      config = Object.assign(config, {
        markdown: {
          markdownit: {
            highlight: (code, lang) => {
              lang = lang || 'html'
              return highlighter.codeToHtml(code, { lang })
            }
          }
        }
      })
    },
    beforeRender(html) {
      const { attributes, body } = fm(html)
      const layout = attributes.layout || 'main'

      return `
        <x-${layout}>
          <md>${body}</md>
        </x-${layout}>`
    }
  },
}
