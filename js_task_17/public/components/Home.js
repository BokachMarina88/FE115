import {create} from "./RenderData";

function Home() {
 this.title = 'Home';

 this.init = () => {
  return create('div', [{label: 'class', value: 'home_page'}], `<h1>Home Page</h1>`);
 }
}

let elem = new Home();
let init = elem.init();
let title = elem.title;

export default init;
export {title};