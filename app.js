'use strict';

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.showCnt = 0;
  this.clickCnt = 0;
}

let rounds = 25;
document.getElementById('rounds').innerHTML = rounds;

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

function showRandom3Imgs() {
  let pr1 = products[Math.floor(Math.random() * products.length)];
  let pr2 = products[Math.floor(Math.random() * products.length)];
  while(pr2 === pr1) {
    pr2 = products[Math.floor(Math.random() * products.length)];
  }
  let pr3 = products[Math.floor(Math.random() * products.length)];
  while(pr3 === pr1 || pr3 === pr2) {
    pr3 = products[Math.floor(Math.random() * products.length)];
  }

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

function refreshImages(event) {
  if (rounds === 0) {
    document.getElementById('pr1').removeEventListener('click', refreshImages);
    document.getElementById('pr2').removeEventListener('click', refreshImages);
    document.getElementById('pr3').removeEventListener('click', refreshImages);
    displayVewResultsBtn();
    return;
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

function vewResults() {
  let results = document.getElementById('results');

  let ul = document.createElement('ul');
  for (let i = 0; i < products.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = products[i].name + ' had ' + products[i].clickCnt + ' votes, and was seen ' + products[i].showCnt + ' times.';
    ul.appendChild(li);
  }
  results.appendChild(ul);

  results.style.display = 'block';
}
