'use strict';

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.showCnt = 0;
  this.clickCnt = 0;
}

let rounds = 25;
document.getElementById('rounds').innerHTML = rounds;

let prevPr1 = null;
let prevPr2 = null;
let prevPr3 = null;

// Product List with image Source
let products = [
  new Product('bag', 'img/bag.jpg'),
  new Product('banana', 'img/banana.jpg'),
  new Product('bathroom', 'img/bathroom.jpg'),
  new Product('boots', 'img/boots.jpg'),
  new Product('breakfast', 'img/breakfast.jpg'),
  new Product('bubblegum', 'img/bubblegum.jpg'),
  new Product('chair', 'img/chair.jpg'),
  new Product('cthulhu', 'img/cthulhu.jpg'),
  new Product('dog-duck', 'img/dog-duck.jpg'),
  new Product('dragon', 'img/dragon.jpg'),
  new Product('pen', 'img/pen.jpg'),
  new Product('pet-sweep', 'img/pet-sweep.jpg'),
  new Product('scissors', 'img/scissors.jpg'),
  new Product('shark', 'img/shark.jpg'),
  new Product('sweep', 'img/sweep.png'),
  new Product('tauntaun', 'img/tauntaun.jpg'),
  new Product('unicorn', 'img/unicorn.jpg'),
  new Product('water-can', 'img/water-can.jpg'),
  new Product('wine-glass', 'img/wine-glass.jpg'),
];

// Store product list to local storage.

function saveProductsToLocalStorage() {
  let jsonProducts = JSON.stringify(products);
  localStorage.setItem('products', jsonProducts);
}
// Update number of products clicks and views form the local storage if it exists.

function updateProducts() {
  let savedProducts = localStorage.getItem('products');
  if (savedProducts !== undefined && savedProducts != null && savedProducts.length > 0) {
    let jsonProducts = JSON.parse(savedProducts);
    for(let i = 0; i < products.length; i++) {
      products[i].showCnt = jsonProducts[i].showCnt;
      products[i].clickCnt = jsonProducts[i].clickCnt;
    }
  }
}


updateProducts();

// Picking 3 unique images.
function reShowImgs() {
  let pr1 = products[Math.floor(Math.random() * products.length)];
  let pr2 = products[Math.floor(Math.random() * products.length)];
  while(pr2 === pr1) {
    pr2 = products[Math.floor(Math.random() * products.length)];
  }
  let pr3 = products[Math.floor(Math.random() * products.length)];
  while(pr3 === pr1 || pr3 === pr2) {
    pr3 = products[Math.floor(Math.random() * products.length)];
  }
  return [pr1, pr2, pr3];
}
// Show randome 3 images without dublicatin for sequencial sets.
function showRandom3Imgs() {
  let prs = reShowImgs();
  while(prs[0] === prevPr1 || prs[0] === prevPr2 || prs[0] === prevPr3 ||
        prs[1] === prevPr1 || prs[1] === prevPr2 || prs[1] === prevPr3 ||
        prs[2] === prevPr1 || prs[2] === prevPr2 || prs[2] === prevPr3) {
    prs = reShowImgs();
  }

  let pr1 = prs[0];
  let pr2 = prs[1];
  let pr3 = prs[2];

  prevPr1 = pr1;
  prevPr2 = pr2;
  prevPr3 = pr3;

  pr1.showCnt++;
  pr2.showCnt++;
  pr3.showCnt++;

  document.getElementById('pr1').src = pr1.src;
  document.getElementById('pr2').src = pr2.src;
  document.getElementById('pr3').src = pr3.src;
}

showRandom3Imgs();

document.getElementById('pr1').addEventListener('click', refreshImages);
document.getElementById('pr2').addEventListener('click', refreshImages);
document.getElementById('pr3').addEventListener('click', refreshImages);


// Update the shown images in the UI.
function refreshImages(event) {
  if (rounds === 1) {
    document.getElementById('pr1').removeEventListener('click', refreshImages);
    document.getElementById('pr2').removeEventListener('click', refreshImages);
    document.getElementById('pr3').removeEventListener('click', refreshImages);
    displayVewResultsBtn();
  }

  event.preventDefault();

  let src = document.getElementById(event.target.id).src;
  console.log(src);
  for (let i = 0; i < products.length; i++) {
    if (src.endsWith(products[i].src)) {
      products[i].clickCnt++;
      break;
    }
  }

  rounds--;
  document.getElementById('rounds').innerHTML = rounds;
  showRandom3Imgs();
}

function displayVewResultsBtn() {
  document.getElementById('viewResults').style.display = 'block';
  document.getElementById('vewResultsBtn').addEventListener('click', vewResults);
}

// View products votes and views after clicking the view results button.
function vewResults() {
  let results = document.getElementById('results');

  let ul = document.createElement('ul');
  for (let i = 0; i < products.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = products[i].name + ' had ' + products[i].clickCnt + ' votes, and was seen ' + products[i].showCnt + ' times.';
    ul.appendChild(li);
  }
  results.appendChild(ul);

  buildChartResults();

  results.style.display = 'inline-block';
  document.getElementById('charts').style.display='inline-block';

  saveProductsToLocalStorage();
}

// Building data in the charts.
function buildChartResults() {
  let prNames = [];
  let prVotes = [];
  let prViews = [];
  for(let i = 0; i < products.length; i++) {
    prNames.push(products[i].name);
    prVotes.push(products[i].clickCnt);
    prViews.push(products[i].showCnt);
  }

  let canvas = document.getElementById('chartResults');
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: prNames,
      datasets: [
        {
          label: 'Votes',
          data: prVotes,
          backgroundColor: ['blue'],
        },
        {
          label: 'views',
          data: prViews,
          backgroundColor: ['green'],
        },
      ],
    },

    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
