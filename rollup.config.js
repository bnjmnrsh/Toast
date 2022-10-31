// Plugins
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'

// Configs
const configs = {
  name: pkg.name,
  files: ['Toast.js'],
  formats: ['es', 'iife'], //, 'iife' 'es', 'amd', 'cjs'
  default: 'es',
  pathIn: 'src/',
  pathOut: 'dist/',
  minify: true,
  sourcemap: true,
  plugins: [babel({ babelHelpers: 'bundled' })],
  presets: ['@babel/preset-env']
}

// Banner
const banner = `/* ! @preserve ${configs.name ? configs.name : pkg.name} v${
  pkg.version
} | (c) ${new Date().getFullYear()} ${pkg.author} | ${pkg.license} | ${
  pkg.repository.url
} */`

const createOutput = function (filename, minify) {
  return configs.formats.map(function (format) {
    const output = {
      file: `${configs.pathOut}/${filename}${
        format === configs.default ? '' : `.${format}`
      }${minify ? '.min' : ''}.js`,
      name: pkg.name,
      format,
      banner
    }
    if (format === 'iife') {
      output.name = configs.name ? configs.name : pkg.name
      output.name = output.name.trim().replace(/\W+/g, '_')
    }
    if (minify) {
      output.plugins = [terser()]
    }

    output.sourcemap = configs.sourcemap

    return output
  })
}

/**
 * Create output formats
 * @param  {String} filename The filename
 * @return {Array}           The outputs array
 */
const createOutputs = function (filename) {
  // Create base outputs
  const outputs = createOutput(filename)

  // If not minifying, return outputs
  if (!configs.minify) return outputs

  // Otherwise, ceate second set of outputs
  const outputsMin = createOutput(filename, true)

  // Merge and return the two arrays
  return outputs.concat(outputsMin)
}

/**
 * Create export object
 * @return {Array} The export object
 */
const createExport = function (file) {
  return configs.files.map(function (file) {
    const filename = file.replace('.js', '')
    return {
      input: `${configs.pathIn}/${file}`,
      output: createOutputs(filename)
    }
  })
}

export default createExport()
