class User {
 constructor(data) {
  this.user = {};
  if (data) {
   this.user = data;
  }
 }

 edit(obj) {
  Object.assign(this.user, obj);
 }

 getUser() {
  return this.user;
 }
}

class Contacts {
 constructor() {
  this.contacts = [];
 }

 add(data) {
  if (data) {
   let userId = this.getId();

   let user = new User(data);
   user.edit({id: userId});
   this.contacts.push(user);
   this.storage = this.contacts;
  }
 }

 edit(id, data) {
  let editContact = this.contacts.find(elem => {
   return elem.user.id === id ? elem : null;
  });

  let user = new User();
  user.edit(data);

  Object.assign(editContact, user);
 }

 remove(id) {
  this.contacts = this.contacts.filter(elem => elem.user.id !== id ? elem : null);
 }

 getContacts() {
  if (this.storage && this.storage.length > 0) {
   this.contacts = this.storage;
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

class ContactsApp extends Contacts {
 constructor() {
  super();
  this.init();
 }

 async init() {
  this.renderForm();
  if (!this.storage.length) {
   await this.getData();
  }
  this.contactInfo();
 }

 addContact(event) {
  event.preventDefault();
  let data = this.inputs.reduce((obj, elem) => ({...obj, [elem.name]: elem.value}), {});

  this.add(data);
  this.inputs.forEach(elem => elem.value = '');

  this.contactInfo();
 }

 contactInfo() {
  this.contactsList.innerHTML = '';
  let dataList = this.getContacts();

  dataList.map(elem => {
   let elemList = this.createField('li', new Map([
    ['class', 'contacts_list_item']
   ]));

   let listName = this.createField('div', new Map([
    ['class', 'contacts_list_item_name']
   ]));
   listName.innerText = elem.user.name;

   let listEmail = this.createField('div', new Map([
    ['class', 'contacts_list_item_email']
   ]));
   listEmail.innerText = elem.user.email;

   let listAddress = this.createField('div', new Map([
    ['class', 'contacts_list_item_address']
   ]));
   listAddress.innerText = elem.user.address;

   let listPhone = this.createField('div', new Map([
    ['class', 'contacts_list_item_phone']
   ]));
   listPhone.innerText = elem.user.phone;

   let div = this.createField('div', new Map([
    ['class', 'buttons']
   ]));

   let editBtn = this.createField('button', new Map([
    ['class', 'contacts_list_item_edit_button']
   ]));
   editBtn.innerText = 'Edit';

   let removeBtn = this.createField('button', new Map([
    ['class', 'contacts_list_item_remove_button']
   ]));
   removeBtn.innerText = 'Remove';

   div.append(editBtn, removeBtn);
   elemList.append(listName, listEmail, listAddress, listPhone, div);
   this.contactsList.append(elemList);

   editBtn.addEventListener('click', _ => {
    this.editContact(elem.user.id, listName, listEmail, listAddress, listPhone);
   })

   removeBtn.addEventListener('click', _ => this.removeContact(elem.user.id));
  });

 }

 editContact(id, name, email, address, phone) {
  name.setAttribute('contenteditable', 'true');
  email.setAttribute('contenteditable', 'true');
  address.setAttribute('contenteditable', 'true');
  phone.setAttribute('contenteditable', 'true');

  let data = {};
  let editList = document.querySelector('.contacts_list_item');
  this.inputs.forEach((item) => {
   data[item.name] = editList.querySelector('.contacts_list_item_' + item.name).textContent;
  });

  this.edit(id, data);
  this.storage = this.contacts;
 }

 removeContact(id) {
  this.remove(id);
  this.storage = this.contacts;
  this.contactInfo();
 }

 createField(formElem, elemAttrs) {
  let exceptTags = ['div', 'li', 'button'];
  let field = document.createElement(formElem);

  if (!exceptTags.includes(formElem)) {
   field.setAttribute('class', formElem);
  }

  if (elemAttrs.size > 0) {
   elemAttrs.forEach((item, key) => {
    field.setAttribute(key, item);
   })
  }

  return field;
 }

 renderForm() {
  let div = this.createField('div', new Map([
   ['class', 'container']
  ]));
  let form = this.createField('form', new Map([
   ['id', 'form'],
   ['class', 'form']
  ]));

  let name = this.createField('input', new Map([
   ['name', 'name'],
   ['type', 'text'],
   ['placeholder', 'Name']
  ]));

  let email = this.createField('input', new Map([
   ['name', 'email'],
   ['type', 'email'],
   ['placeholder', 'email@email.com']
  ]));

  let address = this.createField('input', new Map([
   ['name', 'address'],
   ['type', 'text'],
   ['placeholder', 'Address']
  ]));

  let phone = this.createField('input', new Map([
   ['name', 'phone'],
   ['type', 'tel'],
   ['placeholder', 'Phone']
  ]));

  let submitBtn = this.createField('input', new Map([
   ['type', 'submit'],
   ['class', 'button']
  ]));
  submitBtn.value = 'Add contact';

  let contactsList = document.createElement('ul');
  contactsList.setAttribute('class', 'contacts_list');
  this.contactsList = contactsList;

  form.append(name, email, address, phone, submitBtn);
  document.body.append(div);
  div.append(form, contactsList);

  this.inputs = [name, email, address, phone];

  form.addEventListener('submit', (event) => {
   this.addContact(event)
  });

 }

 set storage(data) {
  localStorage.setItem('contacts', JSON.stringify(this.contacts));
  document.cookie = 'storageExpiration=1; max-age: 864000';

  // if (!getCookie('storageExpiration') && localStorage.getItem('contacts')) {
  //  localStorage.removeItem('contacts');
  // }
 }

 get storage() {
  let localContactData = localStorage.getItem('contacts');
  if (localContactData && localContactData.length > 0) {
   return JSON.parse(localContactData);
  }

  return {};
 }

 async getData() {

  console.log("getData");
  let url = 'https://jsonplaceholder.typicode.com/users';

  await fetch(url)
  .then(response => response.json())
  .then(data => {
   data.forEach(item => {
    this.add(item);
   });
  });
 }
}

function getCookie(name) {
 let matches = document.cookie.match(new RegExp(
  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
 ));
 return matches ? decodeURIComponent(matches[1]) : undefined;
}

new ContactsApp();
