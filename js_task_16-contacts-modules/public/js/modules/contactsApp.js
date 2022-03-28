import Contacts from "./contactData.js";
import RenderContactsForm from "./renderContactsForm.js";
import {inputs} from "./renderData.js"
import {setContenteditableField, changeButtons, getCookie} from "./renderData.js";
import {setStorage} from "./storage";

export default class ContactsApp extends Contacts {
 constructor() {
  super();
 }

 addContact() {
  let data = inputs.reduce((obj, elem) => ({...obj, [elem[0].name]: elem[0].value}), {});
  this.add(data);
  inputs.forEach(elem => elem[0].value = '');

  RenderContactsForm();
 }

 editContact(event) {
  setContenteditableField(event.target.parentNode.parentNode, 'true');
  changeButtons(event.target);
 }

 saveContact(event, id) {
  let data = {};
  let editList = event.target.parentNode.parentNode;
  inputs.forEach((item) => {
   data[item[0].name] = editList.querySelector('.contacts_list_item_' + item[0].name).textContent;
  });
  this.edit(id, data);
  setStorage(this.contacts);

  setContenteditableField(event.target.parentNode.parentNode, 'false');
  changeButtons(event.target);
 }

 removeContact(id) {
  this.remove(id);
  setStorage(this.contacts);

  RenderContactsForm();
 }
}
