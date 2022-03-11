class User {
 constructor(data) {
  this.user = {};
  if (data) {
   this.user.id = data.id;
   this.user.name = data.name;
   this.user.email = data.email;
   this.user.address = data.address;
   this.user.phone = data.phone;
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
   let userId = data.id ? data.id : this.getId();

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

  let user = new User(data);
  user.edit({id: id});

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

   let labelId = this.createField('div', new Map([
    ['class', 'label_email']
   ]));
   labelId.innerText = elem.user.id;

   let divName = this.createField('div', new Map([
    ['class', 'name']
   ]));
   let labelName = this.createField('span', new Map([
    ['class', 'label_name']
   ]));
   let listName = this.createField('span', new Map([
    ['class', 'contacts_list_item_name']
   ]));

   labelName.textContent = 'Client name: ';
   listName.innerText = elem.user.name;

   let divEmail = this.createField('div', new Map([
    ['class', 'email']
   ]));
   let labelEmail = this.createField('span', new Map([
    ['class', 'label_email']
   ]));
   let listEmail = this.createField('span', new Map([
    ['class', 'contacts_list_item_email']
   ]));
   labelEmail.textContent = 'Client email: ';

   listEmail.innerText = elem.user.email;

   let divAddress = this.createField('div', new Map([
    ['class', 'address']
   ]));
   let labelAddress = this.createField('span', new Map([
    ['class', 'label_address']
   ]));
   let listAddress = this.createField('span', new Map([
    ['class', 'contacts_list_item_address']
   ]));

   labelAddress.textContent = 'Client address: ';
   let addressData = '';
   if (elem.user.address.city && elem.user.address.street && elem.user.address.zipcode) {
    addressData = `${elem.user.address.city} ${elem.user.address.street} ${elem.user.address.zipcode}`;
   } else {
    addressData = elem.user.address;
   }
   listAddress.innerText = addressData;

   let divPhone = this.createField('div', new Map([
    ['class', 'phone']
   ]));
   let labelPhone = this.createField('span', new Map([
    ['class', 'label_phone']
   ]));
   let listPhone = this.createField('span', new Map([
    ['class', 'contacts_list_item_phone']
   ]));

   labelPhone.textContent = 'Client phone: ';
   listPhone.innerText = elem.user.phone;

   let divButtons = this.createField('div', new Map([
    ['class', 'buttons']
   ]));

   let editBtn = this.createField('button', new Map([
    ['class', 'contacts_list_item_edit_button']
   ]));
   editBtn.innerText = 'Edit';

   let saveBtn = this.createField('button', new Map([
    ['class', 'contacts_list_item_save_button']
   ]));
   saveBtn.innerText = 'Save';

   let removeBtn = this.createField('button', new Map([
    ['class', 'contacts_list_item_remove_button']
   ]));
   removeBtn.innerText = 'Remove';

   divName.append(labelName, listName);
   divEmail.append(labelEmail, listEmail);
   divAddress.append(labelAddress, listAddress);
   divPhone.append(labelPhone, listPhone);
   divButtons.append(editBtn, saveBtn, removeBtn);

   elemList.append(labelId, divName, divEmail, divAddress, divPhone, divButtons);
   this.contactsList.append(elemList);

   editBtn.addEventListener('click', event => {
    this.editContact(event);
   })

   saveBtn.addEventListener('click', event => {
    this.saveContact(event, elem.user.id, listName, listEmail, listAddress, listPhone);
   })

   removeBtn.addEventListener('click', _ => this.removeContact(elem.user.id));
  });

 }

 editContact(event) {
  this.setContenteditableField(event.target.parentNode.parentNode, 'true');
  this.changeButtons(event.target);
 }

 saveContact(event, id) {
  let data = {};
  let editList = event.target.parentNode.parentNode;
  this.inputs.forEach((item) => {
   data[item.name] = editList.querySelector('.contacts_list_item_' + item.name).textContent;
  });
  this.edit(id, data);
  this.storage = this.contacts;

  this.setContenteditableField(event.target.parentNode.parentNode, 'false');
  this.changeButtons(event.target);
 }

 removeContact(id) {
  this.remove(id);
  this.storage = this.contacts;
  this.contactInfo();
 }

 createField(formElem, elemAttrs) {
  let exceptTags = ['div', 'li', 'button', 'span'];
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

 setContenteditableField(fields, boolValue) {
  this.inputs.forEach(item => {
   fields.querySelector('.contacts_list_item_' + item.name).setAttribute('contenteditable', boolValue);
  });
 }

 changeButtons(target) {
  let saveButton;
  let editButton = target;

  if (target.className === 'contacts_list_item_edit_button') {
   saveButton = target.nextSibling;
  } else if (target.className === 'contacts_list_item_save_button') {
   saveButton = target.previousSibling;
  }

  saveButton.style.display = 'block';
  editButton.style.display = 'none';
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
    data.forEach(item => {
     this.add(item);
    });
   }
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
