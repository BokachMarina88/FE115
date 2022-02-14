// html content
let doc = document;
let head = doc.head;
let body = doc.body;

let html = doc.querySelector('html');
html.setAttribute('lang', 'en');

let metaCharset = doc.createElement('meta');
let metaViewport = metaCharset.cloneNode();

metaCharset.setAttribute('charset', 'UTF-8');
metaViewport.setAttribute('name', 'author');
metaViewport.setAttribute('content', 'Marina Bokach');

let title = doc.createElement('title');
title.innerHTML = 'JavaScript 10';

let link = doc.createElement('link');
link.setAttribute('href', "css/style.css");
link.setAttribute('rel', "stylesheet");

let headArr = [metaCharset, metaViewport, title, link];

for (let i = 0; i < headArr.length; i++) {
 head.appendChild(headArr[i]);
}

let div = doc.createElement('div');
let h3 = doc.createElement('h3');
let ul = doc.createElement('ul');
let input = doc.createElement('input');
let btn = doc.createElement('button');

let divPage = div.cloneNode();
divPage.classList.add('container');
divPage.id = 'app';

h3.innerHTML = 'Todo list';

let listUl = ul.cloneNode();
listUl.id = 'list';

let listInput = input.cloneNode();
listInput.type = 'text';
listInput.name = 'inputText';
listInput.id = 'inputText';
listInput.placeholder = 'Add task...';

let listButton = btn.cloneNode();
listButton.id = 'resetButton';
listButton.classList.add("button");
listButton.textContent = 'Reset list data';

let htmlBodyArr = [h3, listUl, listInput, listButton];

for (let i = 0; i < htmlBodyArr.length; i++) {
 body.appendChild(divPage).appendChild(htmlBodyArr[i]);
}

// actions
doc.getElementById("inputText").addEventListener("keypress", function (event) {
 let keyCode = event.keyCode || event.charCode || event.which;
 if (keyCode === 13) {
  let inputValue = event.target.value;
  if (inputValue.trim() !== '') {
   let li;
   let uls = doc.getElementById('app').querySelectorAll('ul');
   let inputText = doc.getElementById("inputText");

   let check = doc.createElement("input");
   check.type = "checkbox";
   check.classList.add("checkbox");

   check.addEventListener("click", function (event) {
    event.target.nextElementSibling.classList.toggle('done');
   });

   let label = doc.createElement("label");
   label.textContent = inputText.value;

   label.addEventListener("click", function (event) {
    let text = event.target.parentElement.querySelector('label');
    let editCheckbox = prompt('Enter new text:', text.textContent);
    if (editCheckbox !== null && editCheckbox.trim() !== '') {
     text.textContent = editCheckbox;
    }
   });

   for (let i = 0; i < uls.length; i++) {
    li = doc.createElement("li");
    a = doc.createElement("a");
    uls[i].appendChild(li).appendChild(check);
    uls[i].appendChild(li).appendChild(label);
    inputText.value = '';
   }
  } else {
   alert('Task field can not be empty.');
  }
 }
});

doc.getElementById("resetButton").addEventListener("click", function () {
 let uls = doc.getElementById('app').querySelectorAll('ul')[0];
 let lis = uls.querySelectorAll("li");
 for (let i = 0; i < lis.length; i++) {
  lis[i].remove();
 }
});

