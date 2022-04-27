# Landing Page Optimisation

This project is meant to optimize the landing pages before launch. What it does:
- Scans the folder for .html files
- Reads the local CSS and JS files
- Concatenates and minimizes the CSS and JS files for each individual HTML
- Removes unused CSS
- Prints the CSS in `<head>`
- Prints the JS before `</body>`
- Adds webp images for all the images located in /images
- Adds modernizr webp script, that adds .webp and .no-webp classes to the `<body>`
- Replaces the `<img>` tags with `<picture>`
- __Does NOT replace the CSS classes yet, so .webp and .no-webp rules must be added manually in the CSS files__
- Minimizes the HTML and outputs it in teh root folder with the name + 'min.html'. For index.html, the output file is index.min.html

## Project File structure
```
root
  Gruntfile.js
  package.json
└───js
    webp.js
```

## Landing Page File structure
```
root
└──css
└──fonts
└──images
└──js
  index.html
  thanks.html
  etc.html
```

## Prerequisites
- [Node.js](https://nodejs.org/en/download/) installed on local machine
- [Grunt.js](https://gruntjs.com/) installed globally as follows: On Windows(CMD or PowerShell) or on Mac(Terminal) `npm install -g grunt-cli`

## How to use
1. Copy the files in the project folder
2. Open CMD or PowerShell or Terminal in the project folder
3. Install Node dependancies `npm i`
4. Run Grunt `grunt`
5. Hurray!