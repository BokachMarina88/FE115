export default class User {
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
