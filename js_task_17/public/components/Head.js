import GeneralComponent from "./GeneralCompanent";

class Head extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  return this.create('header', [{label: 'class', value: 'header'}]);
 }
}

export default new Head().init();