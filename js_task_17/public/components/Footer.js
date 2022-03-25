import GeneralComponent from "./GeneralCompanent";

export default class Footer extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  this.render();
 }

 render() {
  let element = this.create('footer', [{label: 'class', value: 'footer'}]);
  document.getElementById('app').append(element);
 }
}


