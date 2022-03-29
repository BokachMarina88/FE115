export function setCookie(target) {
 document.cookie = `cart_points[${target.id}]=${target.previousSibling.value}`;
}

export function removeValueCookie(target) {
 getCookies().forEach(elem => {
  if (elem.key === +target.id) {
   let res = elem.value - +target.previousSibling.value;
   if (res > 0) {
    removeCookie(target);
    document.cookie = `cart_points[${target.id}]=${res}`;
   } else {
    removeCookie(target);
   }
  }
 });
}

function removeCookie(target) {
 getCookies().filter(item => (item.key === +target.id) ? document.cookie = `cart_points[${target.id}]=;expires=Thu, 01 Jan 1970 00:00:00 GMT` : null);
}

export function getCookies() {
 let matches = [];

 document.cookie.split(';').filter(item => {
  let elem = item.trim();
  let index = elem.indexOf('[');
  if (index !== -1) {
   let id = elem.slice(index + 1, index + 2);
   let amount = elem.split('=')[1];

   return matches.push({key: +id, value: +amount});
  }
 });

 return matches;
}

export function getCookie(id) {
 return getCookies().filter(item => (item.key === id) ? item : null);
}