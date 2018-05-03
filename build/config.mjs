import path from 'path'
const projectRoot = process.cwd()
const webpack = {
  common: {
    context: projectRoot,
    entry: './index.js',
    externals: {
      'intl-messageformat': 'intl-messageformat',
      'alpheios-data-models': 'alpheios-data-models',
      'uuid': 'uuid'
    },
    resolve:{
      alias: {
        'alpheios-data-models': path.join(projectRoot, 'node_modules/alpheios-data-models/dist/alpheios-data-models.js')
      }
    },
    module: {
      rules: [
        {
          test: /\.csv$/,
          use: ['csv-loader'],
          enforce: 'pre'
        }
      ]
    }
  },

  production: {
    output: {filename: 'alpheios-inflection-tables.min.js'}
  },
  development: {
    output: {filename: 'alpheios-inflection-tables.js'}
  }
}

export { webpack }
