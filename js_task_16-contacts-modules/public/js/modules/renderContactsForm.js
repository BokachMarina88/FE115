import createField from './renderData.js';
import Contacts from "./contactData.js";

export default function contactInfo() {
 let contactsList = document.querySelector('.contacts_list')
 contactsList.innerHTML = '';

 let contact = new Contacts();
 let dataList = contact.getContacts();

 dataList.map(elem => {
  let elemList = createField('li', new Map([
   ['class', 'contacts_list_item']
  ]));

  let labelId = createField('div', new Map([
   ['class', 'label_email']
  ]));
  labelId.innerText = elem.user.id;

  let divName = createField('div', new Map([
   ['class', 'name']
  ]));
  let labelName = createField('span', new Map([
   ['class', 'label_name']
  ]));
  let listName = createField('span', new Map([
   ['class', 'contacts_list_item_name']
  ]));

  labelName.textContent = 'Client name: ';
  listName.innerText = elem.user.name;

  let divEmail = createField('div', new Map([
   ['class', 'email']
  ]));
  let labelEmail = createField('span', new Map([
   ['class', 'label_email']
  ]));
  let listEmail = createField('span', new Map([
   ['class', 'contacts_list_item_email']
  ]));
  labelEmail.textContent = 'Client email: ';

  listEmail.innerText = elem.user.email;

  let divAddress = createField('div', new Map([
   ['class', 'address']
  ]));
  let labelAddress = createField('span', new Map([
   ['class', 'label_address']
  ]));
  let listAddress = createField('span', new Map([
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

  let divPhone = createField('div', new Map([
   ['class', 'phone']
  ]));
  let labelPhone = createField('span', new Map([
   ['class', 'label_phone']
  ]));
  let listPhone = createField('span', new Map([
   ['class', 'contacts_list_item_phone']
  ]));

  labelPhone.textContent = 'Client phone: ';
  listPhone.innerText = elem.user.phone;

  let divButtons = createField('div', new Map([
   ['class', 'buttons']
  ]));

  let editBtn = createField('button', new Map([
   ['class', 'contacts_list_item_edit_button']
  ]));
  editBtn.innerText = 'Edit';

  let saveBtn = createField('button', new Map([
   ['class', 'contacts_list_item_save_button']
  ]));
  saveBtn.innerText = 'Save';

  let removeBtn = createField('button', new Map([
   ['class', 'contacts_list_item_remove_button']
  ]));
  removeBtn.innerText = 'Remove';

  divName.append(labelName, listName);
  divEmail.append(labelEmail, listEmail);
  divAddress.append(labelAddress, listAddress);
  divPhone.append(labelPhone, listPhone);
  divButtons.append(editBtn, saveBtn, removeBtn);

  elemList.append(labelId, divName, divEmail, divAddress, divPhone, divButtons);
  contactsList.append(elemList);

  editBtn.addEventListener('click', event => {
   // this.editContact(event);
  })

  saveBtn.addEventListener('click', event => {
   // this.saveContact(event, elem.user.id, listName, listEmail, listAddress, listPhone);
  })

  removeBtn.addEventListener('click', _ => this.removeContact(elem.user.id));
 });

}