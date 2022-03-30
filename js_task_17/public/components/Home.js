import {create} from "./RenderData";

function Home() {

 this.init = () => {
  return create('div', [{label: 'class', value: 'home_page'}], `<h1>Home Page</h1>`);
 }
}

export default new Home().init();