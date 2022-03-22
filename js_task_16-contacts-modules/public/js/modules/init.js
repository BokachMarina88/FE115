import RenderAddForm from "./renderAddForm.js";
import RenderContactsForm from "./renderContactsForm.js";
import getData from "./getUserAPIData.js";
import ContactsApp from "./contactsApp.js";

export default async function init() {
 RenderAddForm();
 let contact = new ContactsApp();
 if (!contact.storage.length) {
  await getData();
 }
 RenderContactsForm();
}