export  function setStorage(data) {
 localStorage.setItem('data', JSON.stringify(data));
}

export  function getStorage() {
 let localContactData = localStorage.getItem('data');
 if (localContactData && localContactData.length > 0) {
  return JSON.parse(localContactData);
 }

 return {};
}