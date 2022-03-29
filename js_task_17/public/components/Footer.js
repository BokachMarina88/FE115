import GeneralComponent from "./GeneralCompanent";

class Footer extends GeneralComponent {
 constructor() {
  super();
 }

 init() {
  return this.create('footer', [{label: 'class', value: 'footer'}]);
 }
}

export default new Footer().init();

