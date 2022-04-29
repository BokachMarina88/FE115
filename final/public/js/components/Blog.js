import {create} from "./RenderData";

function Blog() {
 this.title = 'Blog';

 this.init = () => {
  return create('div', [{label: 'class', value: 'home_page'}], `<h1>Blog Page</h1>`);
 }
}

let blog = new Blog();
let title = blog.title;

export default blog;
export {title};