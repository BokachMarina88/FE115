import GeneralComponent from "./GeneralCompanent";

class Home extends GeneralComponent {

 init() {
  return this.create('div', [{label: 'class', value: 'home_page'}], `<h1>Home Page</h1>`);
 }
}

export default new Home().init();