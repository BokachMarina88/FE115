import RenderAddForm from "./renderAddForm.js";
import RenderContactsForm from "./renderContactsForm.js";
import getData from "./getUserAPIData.js";
import {getStorage} from "./storage";

export default async function init() {
 RenderAddForm();
 if (!getStorage().length) {
  await getData();
 }
 RenderContactsForm();
}