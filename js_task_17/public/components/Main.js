import GeneralComponent from "./GeneralCompanent";

export default class Main extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  this.render();
 }

 render() {
  let element = this.create('main', [{label: 'class', value: 'main'}]);
  document.getElementById('app').append(element);
 }

}


