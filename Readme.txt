Structura fisierelor in folderul in care se face optimizarea trebuie sa fie:
- Root folder
  -| css
  -| js
  -| fonts
  -| images
  -| index.html
  -| thanks.html
  -| orice-alta-pagina.html
  -| orice-alta-pagina-2.html
  -| orice-alta-pagina-etc.html

1. Operatiuni care trebuiesc facute doar o data
  1.1 Instaleaza node.js
    - https://nodejs.org/en/download/
  1.2 Instaleaza grunt global
    - Pe Windows deschide CMD sau PowerShell si da paste la "npm install -g grunt-cli"
    - Pe MAC deschide Terminal si da paste la "npm install -g grunt-cli"

2. Pregatirea optimizarii
  2.1 Dezarhiveaza arhiva intr-un folder(ce nume vrei tu, oriunde pe hard). Ca exemplu, folderul o sa se cheme "opt"
  2.2 Copiaza fisierele paginii in "opt"
  2.2 Deschide un CMD, PowerShell sau Terminal in folderul "opt"
  2.3 Scrie "npm i" si apasa enter. Asteapta sa se termine. Nu inchide fereastra.

3. Optimizarea CSS-ului
  - in toate CSS-urile trebuiesc updatate regulile care au background-image: url(../images/imgname.ext). Exemplu:
  Codul urmator:
  .hero {
    background-color: #000;
    background-image: url('../images/hero-bg.jpg');
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }

  DEVINE:
  .hero {
    background-color: #000;
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .webp .hero {
    background-image: url('../images/hero-bg.webp');
  }

  .no-webp .hero {
    background-image: url('../images/hero-bg.jpg');
  }

4. Optimizarea tagurilor <img>
  - toate tagurile img se vor modifica, asa cum urmeaza:
  Tagul:
  <img src="images/CLASS.png" width="128" alt="">

  DEVINE:
  <picture>
    <source srcset="images/CLASS.webp" type="image/webp">
    <img src="images/CLASS.png" width="128" alt="">
  </picture>

5. Optimizarea
  5.1 Daca ai inchis fereastra de la punctul 2.2, deschide un CMD, PowerShell sau Terminal in folderul "opt"
  5.2 Scrie "grunt" apasa enter si asteapta sa se termine. Dupa ce s-a terminat, in folderul opt ar trebui sa apara index.html.min.html, thanks.html.min.html