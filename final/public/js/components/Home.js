import { create } from './RenderData'

function Home () {
  this.title = 'Home'

  this.init = () => {
    return create('div', [{ label: 'class', value: 'home_page' }])
  }
}

let home = new Home()
let title = home.title

export default home
export { title }