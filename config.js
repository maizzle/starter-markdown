/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| This is the base configuration that Maizzle will use when you run commands
| like `npm run build` or `npm run dev`. Additional config files will
| inherit these settings, and can override them when necessary.
|
*/

import Shiki from '@shikijs/markdown-it'
import markdownItAttrs from 'markdown-it-attrs'

/** @type {import('@maizzle/framework').Config} */
export default {
  build: {
    content: ['content/**/*.md'],
    static: {
      source: ['images/**/*.*'],
      destination: 'images',
    },
  },
  markdown: {
    markdownit: {
      html: true,
    },
    plugins: [
      {
        plugin: await Shiki({
          theme: 'tokyo-night',
          langs: ['html', 'css', 'javascript', 'yaml'],
        }),
      },
      {
        plugin: markdownItAttrs,
      },
    ]
  },
  beforeRender({html, matter}) {
    const layout = matter.layout || 'main'

    return `
      <x-${layout}>
        <md>${html}</md>
      </x-${layout}>`
  }
}
