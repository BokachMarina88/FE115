export function setCookie(val, id) {
 document.cookie = `cart_points[${id}]=${val}`;
}

export function removeCookie(id) {
 getCookies().filter(item => (item.key === id) ? document.cookie = `cart_points[${id}]=;expires=Thu, 01 Jan 1970 00:00:00 GMT` : null);
}

export function updateValueCookie(val, id) {
 getCookies().forEach(elem => {
  if (elem.key === id) {
   removeCookie(id);
   document.cookie = `cart_points[${id}]=${val}`;
  }
 });
}

export function getCookies() {
 let matches = [];

 document.cookie.split(';').filter(item => {
  let elem = item.trim();
  let index = elem.indexOf('[');
  let ind = elem.indexOf(']');
  if (index !== -1) {
   let id = elem.slice(index + 1, ind);
   let amount = elem.split('=')[1];

   return matches.push({key: +id, value: +amount});
  }
 });

 return matches;
}

export function getCookie(id) {
 return getCookies().filter(item => (item.key === id) ? item : null);
}