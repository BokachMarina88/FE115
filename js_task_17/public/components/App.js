import Head from "./Head";
import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import {create, render} from "./RenderData";

export default function App() {

 this.init = async () => {
  this.renderHead();
  render(document.body, create('div', [{label: 'id', value: 'app'}]));
  render(document.getElementById('app'), Head, Nav, Main, Footer);
 }

 this.renderHead = () => {
  let meta = create('meta', [{label: 'charset', value: 'UTF-8'}]);
  let title = create('title', [], 'E_shop');
  let link = create('link', [{label: 'href', value: "./css/style.css"}, {
   label: 'rel',
   value: "stylesheet"
  }]);
  let linkLoader = create('link', [{label: 'href', value: "./css/loader.css"}, {
   label: 'rel',
   value: "stylesheet"
  }]);

  render(document.head, meta, title, link, linkLoader);
 }
}


