import createField from './renderData.js';
import Contacts from "./contactsApp.js";

export default function renderForm() {
  let contact = new Contacts();

  let div = createField('div', new Map([
   ['class', 'container']
  ]));
  let form = createField('form', new Map([
   ['id', 'form'],
   ['class', 'form']
  ]));

  let name = createField('input', new Map([
   ['name', 'name'],
   ['type', 'text'],
   ['placeholder', 'Name']
  ]));

  let email = createField('input', new Map([
   ['name', 'email'],
   ['type', 'email'],
   ['placeholder', 'email@email.com']
  ]));

  let address = createField('input', new Map([
   ['name', 'address'],
   ['type', 'text'],
   ['placeholder', 'Address']
  ]));

  let phone = createField('input', new Map([
   ['name', 'phone'],
   ['type', 'tel'],
   ['placeholder', 'Phone']
  ]));

  let submitBtn = createField('input', new Map([
   ['type', 'submit'],
   ['class', 'button']
  ]));
  submitBtn.value = 'Add contact';

  let contactsList = document.createElement('ul');
  contactsList.setAttribute('class', 'contacts_list');

  form.append(name, email, address, phone, submitBtn);
  document.body.append(div);
  div.append(form, contactsList);

  form.addEventListener('submit', (event) => {
   event.preventDefault();
   contact.addContact();
  });
}