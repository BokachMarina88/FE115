export  function setStorage(data) {
 localStorage.setItem('data', JSON.stringify(data));
}

export function setCategoryStorage(data) {
 localStorage.setItem('categories', JSON.stringify(data));
}


export function getStorage() {
 let localContactData = localStorage.getItem('data');
 if (localContactData && localContactData.length > 0) {
  return JSON.parse(localContactData);
 }

 return {};
}

export function getCategoryStorage() {
 let localContactData = localStorage.getItem('categories');
 if (localContactData && localContactData.length > 0) {
  return JSON.parse(localContactData);
 }

 return {};
}