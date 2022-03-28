export  function setStorage(data) {
 localStorage.setItem('contacts', JSON.stringify(data));
 document.cookie = 'storageExpiration=1; max-age: 864000';

 // if (!getCookie('storageExpiration') && localStorage.getItem('contacts')) {
 //  localStorage.removeItem('contacts');
 // }
}

export  function getStorage() {
 let localContactData = localStorage.getItem('contacts');
 if (localContactData && localContactData.length > 0) {
  return JSON.parse(localContactData);
 }

 return {};
}