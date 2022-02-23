function tooltip() {
 const indent = 20;

 let elements = document.querySelectorAll('.tooltip');

 [...elements].map(element => {
  element.addEventListener('mouseenter', function (e) {
   createTooltip(e, element);
  });
  element.addEventListener('mouseleave', function (e) {
   removeTooltip(e, element);
  });
 })

 function createTooltip(e, element) {
  let elem = document.createElement('span');
  elem.setAttribute('class', 'tooltip-element');
  elem.textContent = e.target.title;
  element.append(elem);

  getWidthTooltip(elem, element);
  getHeightTooltip(elem, element);
 }

 function removeTooltip(e, element) {
  let elem = element.querySelector('span');
  elem.remove();
 }

 function getWidthTooltip(elem, element) {
  let div = document.querySelector('.main');
  let spanElem = element.querySelector('span');

  let mainX = div.getBoundingClientRect().x;
  let mainWidth = div.getBoundingClientRect().width;

  let spanElemX = spanElem.getBoundingClientRect().x;
  let spanElemWidth = spanElem.getBoundingClientRect().width;

  if (spanElemWidth + mainX > mainWidth) {
   let divLength = mainX + mainWidth;
   let spanElemLength = spanElemX + spanElemWidth;
   let CSSProp = window.getComputedStyle(elem, null).getPropertyValue("max-width");
   let diffWidth = spanElemLength - divLength;

   let newWidth = Math.floor((parseInt(CSSProp) - diffWidth) - indent);
   elem.style.width = (spanElemX + newWidth < divLength) ? newWidth + 'px' : diffWidth + 'px';
  }
 }

 function getHeightTooltip(elem, element) {
  let div = document.querySelector('.main');
  let spanElem = element.querySelector('span');

  let mainY = div.getBoundingClientRect().y;
  let mainHeight = div.getBoundingClientRect().height;

  let spanElemHeight = spanElem.getBoundingClientRect().height;
  let spanElemY = spanElem.getBoundingClientRect().y;

  if (spanElemHeight + spanElemY > mainHeight) {
   let divHeightLength = mainY + mainHeight;
   let spanElemHeightLength = spanElemY + spanElemHeight;
   let diffHeight = spanElemHeightLength - divHeightLength;
   elem.style.top = spanElemY - diffHeight - indent + 'px';
  }
 }
}

tooltip()