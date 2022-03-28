import User from "./userData.js"
import {getStorage, setStorage} from "./storage";

export default class Contacts {
 constructor() {
  this.contacts = [];
 }

 add(data) {
  if (data) {
   let userId = data.id ? data.id : this.getId();

   let user = new User(data);
   if (getStorage().length) {
    this.contacts = getStorage();
   }

   user.edit({id: userId});
   this.contacts.push(user);
   setStorage(this.contacts);
  }
 }

 edit(id, data) {
  if (getStorage().length) {
   this.contacts = getStorage();
  }
  let editContact = this.contacts.find(elem => {
   return elem.user.id === id ? elem : null;
  });

  let user = new User(data);
  user.edit({id: id});

  Object.assign(editContact, user);
 }

 remove(id) {
  if (getStorage().length) {
   this.contacts = getStorage();
  }
  this.contacts = this.contacts.filter(elem => elem.user.id !== id ? elem : null);
 }

 getContacts() {
  let store = getStorage();
  if (store && store.length > 0) {
   this.contacts = store;
  }

  return this.contacts;
 }

 getId() {
  let userId = Math.floor(Math.random() * 100);
  if (this.contacts.some(data => data.id === userId)) {

   return this.getId();
  }

  return userId;
 }
}