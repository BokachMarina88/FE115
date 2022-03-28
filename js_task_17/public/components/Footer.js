import GeneralComponent from "./GeneralCompanent";

export default class Footer extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  this.show();
 }

 show() {
  let element = this.create('footer', [{label: 'class', value: 'footer'}]);
  this.render(document.getElementById('app'), element);
 }
}


