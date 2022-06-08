module.exports = function (grunt) {
	'use strict'

	require('load-grunt-tasks')(grunt)

	const HTMLParser = require('node-html-parser')
	const HTMLMinify = require('html-minifier').minify

	const resourceFiles = {}

	const fs = require('fs')
	const path = require('path')
	fs.readdirSync('./').forEach(file => {
		if(path.extname(file) === '.html' && file.indexOf('.min') === -1) {
			//
			// Start creating page resources object
			//
			resourceFiles[file] = {
				css: [],
				js: [],
			}

			// Get page HTML content
			let pageHTMLContent = HTMLParser.parse(grunt.file.read(file))

			// Get all CSS files - this searches for [rel="stylesheet"] with [href="css/**"]
			// ==WARNING!!!== - all css stylesheets with 'http' in href will be excluded
			const cssFiles = pageHTMLContent.querySelectorAll('head [rel="stylesheet"]')
			cssFiles.forEach(cssFile => {
				const cssURL = cssFile.getAttribute('href')
				if(cssURL.indexOf('http') === -1) {
					resourceFiles[file].css.push(cssURL)
				}
			})

			// Get all JS files  - this searches for <script src="js/**">
			// ==WARNING!!!== - all scripts with 'http' in href will be excluded
			const jsFiles = pageHTMLContent.querySelectorAll('script')
			jsFiles.forEach(jsFile => {
				const jsSRC = jsFile.getAttribute('src')
				if(jsSRC && jsSRC.indexOf('http') === -1) {
					resourceFiles[file].js.push(jsSRC)
				}
			})

			// Add webp.js at the end of the js array
			resourceFiles[file].js.push('js/webp.js')
		}
	})

	// console.log(resourceFiles)

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Convert to webp
		cwebp: {
			dynamic: {
				options: {
					q: 80
				},
				files: [{
					expand: true,
					src: ['images/**/*.{png,jpg,jpeg,gif}'],
					dest: ''
				}]
			}
		},

		/*
		TODO if needed
		// Sass to CSS
		'dart-sass': {
			target: {
				files: {
					'dest/style.css': 'scss/style.scss'
				}
			}
		},
		*/

		concat: {
			// Look for concat_targets
		},

		// Autoprefixer + minify CSS
		postcss: {
			options: {
				map: false, // inline sourcemaps
				processors: [
					require('autoprefixer')({
						overrideBrowserslist: 'last 10 versions'
					}), // add vendor prefixes
					require('cssnano')() // minify the result
				]
			}
			// Look for postcss_targets
		},

		// Purge CSS
		purgecss: {
			// Look for purgecss_targets
		}
	});

	// Set concat page resources
	grunt.registerTask('concat_targets', function () {
		for(const page in resourceFiles) {
			const pageName = page.replace('.html', '')

			grunt.config(`concat.${pageName}_css.src`, resourceFiles[page].css)
			grunt.config(`concat.${pageName}_css.dest`, `dest/style.${pageName}.css`)

			grunt.config(`concat.${pageName}_js.src`, resourceFiles[page].js)
			grunt.config(`concat.${pageName}_js.dest`, `dest/scripts.${pageName}.js`)
		}
	});

	// Set postcss page resources
	grunt.registerTask('postcss_targets', function () {
		for(const page in resourceFiles) {
			const pageName = page.replace('.html', '')

			grunt.config(`postcss.${pageName}.src`, `dest/style.${pageName}.css`)
			grunt.config(`postcss.${pageName}.dest`, `dest/style.${pageName}.postcss.css`)
		}
	});

	// Set purgecss pages with options
	grunt.registerTask('purgecss_targets', function () {
		for(const page in resourceFiles) {
			const pageName = page.replace('.html', '')
			const pageOptions = {
				'content': [page],
				'safelist': [
					/.*slick.*/,
					/.*active.*/,
					/.*webp.*/,
					/.*no-webp.*/,
					'button'
				]
			}

			let pageFiles = {}
			pageFiles[`dest/style.${pageName}.postcss.min.css`] = [`dest/style.${pageName}.postcss.css`]

			grunt.config(`purgecss.${pageName}.options`, pageOptions)
			grunt.config(`purgecss.${pageName}.files`, pageFiles)
		}
	});

	// Minify the HTML code and save it to a file
	grunt.registerTask('minify_html', function () {
		for(const page in resourceFiles) {
			const pageName = page.replace('.html', '')

			let pageHTMLContent = HTMLParser.parse(grunt.file.read(page))

			// Create inline CSS file
			let styleSheetText = grunt.file.read(`dest/style.${pageName}.postcss.min.css`)
			styleSheetText = styleSheetText.replaceAll('../', '')
			const styleSheet = `<style>${styleSheetText}</style>`

			// Create javascript inline file
			const javaScript = `<script>${grunt.file.read(`dest/scripts.${pageName}.js`)}</script>`

			// Remove styles from page
			resourceFiles[page].css.forEach((css) => {
				const cssEl = pageHTMLContent.querySelector(`[href=${css}]`)
				cssEl.remove()
			})

			// Remove scripts from page
			resourceFiles[page].js.forEach((js) => {
				const jsEl = pageHTMLContent.querySelector(`[src="${js}"]`)
				if (jsEl)
					jsEl.remove()
			})

			// Insert inline <style> in <head>
			let newHtml = pageHTMLContent.innerHTML.replace('</head>', `${styleSheet}</head>`)

			// Insert inline <script> before </body>
			newHtml = newHtml.replace('</body>', `${javaScript}</body>`)

			// Replace images
			const pageImages = pageHTMLContent.querySelectorAll('img')
			pageImages.forEach(image => {
				let newImageTag = `
					<picture>
						<source srcset="${image.getAttribute('src').replace(/\.png|\.jpg|\.jpeg|\.gif/gi, '.webp')}" type="image/webp">
						${image}
					</picture>
				`
				newHtml = newHtml.replace(image, newImageTag)
			})

			newHtml = HTMLMinify(newHtml, {
				minifyCSS: true,
				minifyJS: true,
				collapseWhitespace: true
			})

			grunt.file.write(`${pageName}.min.html`, newHtml)
		}

		// Delete 'dest' folder
		fs.rmSync('./dest', { recursive: true, force: true })
	})

	grunt.registerTask('default', ['cwebp', 'concat_targets', 'concat', 'postcss_targets', 'postcss', 'purgecss_targets', 'purgecss', 'minify_html'])
}