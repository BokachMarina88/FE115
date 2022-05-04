import { create } from './RenderData'
import { getCookies } from './Cookies'

function Cart () {
  this.title = 'Cart'

  this.init = () => {
    console.log('rendCarter')
    return this.render()
  }
  this.render = () => {

    let page = create('div', [{ label: 'class', value: 'cart_page' }], `<h1>Cart Page</h1>`)

    return page
  }

  this.cartCount = () => {
    let count = 0
    let elemCount = document.querySelector('.cart-zero')
    getCookies().forEach(item => count += item.value)

    if (elemCount) {
      elemCount.textContent = count.toString()
    }
  }
}

let cart = new Cart()
let title = cart.title
let cartCount = cart.cartCount

export default cart
export { title, cartCount }
