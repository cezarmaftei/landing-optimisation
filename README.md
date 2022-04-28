# Landing Page Optimisation - **Instructiuni de folosire**

## Structura **obligatorie** de fisiere a proiectului
```
folderul proiectului - poate avea orice nume
└──css
└──fonts
└──images
└──js
  index.html
  thanks.html
  etc.html
```

## Operatiuni ce trebuiesc facute o singura data
- <a target="_blank" rel="nofollow noopener" href="https://nodejs.org/en/download/">Instaleaza Node.js</a>
- Instaleaza Grunt.js: Pe Windows(CMD saur PowerShell) sau pe Mac(Terminal) `npm install -g grunt-cli`

## Modificari in CSS
In toate CSSurile paginii trebuiesc modificate regulile care au background-image, in felul urmator:
```
.banner {
  background-image: url(images/o-imagine.jpg)
}
```

Va deveni
```
.banner {
  background-image: none
}

.webp .banner {
  background-image: url(images/o-imagine.webp)
}

.no-webp .banner {
  background-image: url(images/o-imagine.jpg)
}
```

## Metoda de folosire
1. <a target="_blank" rel="nofollow noopener" href="https://github.com/cezarmaftei/landing-optimisation/archive/refs/heads/main.zip">Downloadeaza arhiva</a>. Daca nu merge, click pe butonul verde din dreapta sus, pe care scrie `Code` apoi `Download ZIP`. **Este foarte important sa downloadezi arhiva de fiecare data cand optimizezi o pagina pentru ca astfel folosesti ultima versiune a programului**
2. Extrage arhiva in folderul paginii
3. Deschide CMD/Powershell/Terminal **in folderul paginii**:
    - Pe Windows, daca folosesti file explorer, mergi in folderul paginii si apasa Alt + F, apoi S, apoi A
    - Pe Mac, navigheaza in folderul parinte al paginii(De ex daca pagina e in D:/work/pagina-mea, navighezi in D:/work), da click pe folderul paginii, apoi Finder->Services->New Terminal at Folder. Mai multe detalii <a target="_blank" rel="nofollow noopener" href="https://www.maketecheasier.com/launch-terminal-current-folder-mac/#:~:text=Open%20the%20parent%20directory%20where,shortcut%20that%20you%20assigned%20before.">aici</a>
4. Scrie `npm i` si apasa enter. Asteapta sa se termine procesul.
5. Scrie `grunt` si apasa enter. Asteapta sa se termine procesul. La final va aparea cate o versiune minmizata pentru fiecare html. Ex: pentru `index.html` se va genera un `index.min.html`
6. **Deschide paginile in browser si compara-le ca sa fii sigur ca arata si functioneaza la fel. Acorda atentie sporita la elementele pe care le initializezi cu javascript, cum ar fi sliderele, popupurile etc...** Daca apar probleme, sau daca nu arata la fel paginile, ii scrii lui Cezar pe Slack
7. Daca totul este ok, redenumeste HTMLurile ne-minimizate in ce vrei tu, iar la cele minimizate le poti scoate `.min` din nume. Exemplu: `index.html` devine `index.default.html`, iar `index.min.html` devine `index.html`
<!--
## **English docs**

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

### Project File structure
```
root
  Gruntfile.js
  package.json
└───js
    webp.js
```

### Landing Page File structure
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

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) installed on local machine
- [Grunt.js](https://gruntjs.com/) installed globally as follows: On Windows(CMD or PowerShell) or on Mac(Terminal) `npm install -g grunt-cli`

### How to use
1. Copy the files in the project folder
2. Open CMD or PowerShell or Terminal in the project folder
3. Install Node dependancies `npm i`
4. Run Grunt `grunt`
5. Hurray!
-->