export function setCookie(id) {
 document.cookie = `cart[${id}]=${id}`;
}

export function getCookies() {
 let matches = [];

 document.cookie.split(';').filter(item => {
  let elem = item.trim();
  if (elem.indexOf('[') !== -1) {
   let elemId = elem.split('=');
   return matches.push(+elemId[1]);
  }
 });

 return matches;
}

export function removeCookie(id) {
 getCookies().filter(item => (item === +id) ? document.cookie = `cart[${id}]=;expires=Thu, 01 Jan 1970 00:00:00 GMT` : null);
}

export function getCookie(id) {
 return getCookies().filter(item => (item === +id) ? item : null);
}