import GeneralComponent from "./GeneralCompanent";

export default class Header extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  this.show();
 }

 show() {
  let element = this.create('header', [{label: 'class', value: 'header'}]);
  this.render(document.getElementById('app'), element);
 }
}


