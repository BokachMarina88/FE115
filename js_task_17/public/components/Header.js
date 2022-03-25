import GeneralComponent from "./GeneralCompanent";

export default class Header extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  this.render();
 }

 render() {
  let element = this.create('header', [{label: 'class', value: 'header'}]);
  document.getElementById('app').append(element);
 }
}


