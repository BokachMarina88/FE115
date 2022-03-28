export function setCookie(target) {
 document.cookie = `cart_points[${target.id}]=${target.previousSibling.value}`;
}

export function removeCookie(id) {
 getCookies().filter(item => (item.key === id) ? document.cookie = `cart_points[${id}]=;expires=Thu, 01 Jan 1970 00:00:00 GMT` : null);
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
 return getCookies().filter(item => (item === +id) ? item : null);
}