import {setStorage} from "./Storage";

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
  }
 });
}

export async function itemData(id) {
 return await fetch(`${url}/${id}`)
 .then(resp => resp.json())
 .then(data => {
  return data;
 })
}

