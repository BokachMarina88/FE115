import { setCategoryStorage, setStorage } from './Storage'

const url = 'https://fakestoreapi.com/products';

export async function getData() {
 await fetch(url)
 .then(response => {
   if (response.status === 200) {
    return response.json();
   }
  }
 )
 .then(data => {
  if (data) {
   setStorage(data);

   const category = [...new Set(data.reduce((f, i) => [...f, i.category], []))];
   setCategoryStorage(category);
  }
 });
}


