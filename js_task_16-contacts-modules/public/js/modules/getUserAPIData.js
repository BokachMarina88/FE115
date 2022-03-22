import Contacts from "./contactData.js";

export default async function getData() {
 let url = 'https://jsonplaceholder.typicode.com/users';
 await fetch(url)
 .then(response => {
   if (response.status === 200) {
    return response.json();
   }
  }
 )
 .then(data => {
  if (data) {
   let contact = new Contacts();
   data.forEach(item => {
    contact.add(item);
   });
  }
 });
}
