import { create } from './RenderData'

function Home () {
  this.title = 'Home'

  this.init = () => {
    return create('div', [{ label: 'class', value: 'home_page' }], `<h1>Home Page</h1>`)
  }
}

let home = new Home()
let title = home.title

export default home
export { title }