import User from "./userData.js"
import ContactsApp from "./contactsApp.js";

export default class Contacts {
 constructor() {
  this.contacts = [];
 }

 add(data) {
  if (data) {
   let userId = data.id ? data.id : this.getId();

   let user = new User(data);
   let contactsApp = new ContactsApp();
   if(!contactsApp.storage.length){
    this.contacts = contactsApp.storage;
   }

   console.log( this.contacts);

   user.edit({id: userId});
   this.contacts.push(user);
   contactsApp.storage = this.contacts;
  }
 }

 edit(id, data) {
  let editContact = this.contacts.find(elem => {
   return elem.user.id === id ? elem : null;
  });

  let user = new User(data);
  user.edit({id: id});

  Object.assign(editContact, user);
 }

 remove(id) {
  this.contacts = this.contacts.filter(elem => elem.user.id !== id ? elem : null);
 }

 getContacts() {
  let contactsApp = new ContactsApp();
  if (contactsApp.storage && contactsApp.storage.length > 0) {
   this.contacts = contactsApp.storage;
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