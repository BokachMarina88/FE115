import { create, render } from './RenderData'
import { getCookies, removeCookie, updateValueCookie } from './Cookies'
import { getStorage } from './Storage'

function Cart () {
  this.title = 'Cart'

  this.init = () => {
    return this.render()
  }

  this.render = () => {
    let cartSection = create('section', [{ label: 'class', value: 'cart' }], `<h1>Cart Page</h1>`)
    let container = create('div', [{ label: 'class', value: 'container' }])
    let cartForm = create('form', [{ label: 'action', value: '#' }, { label: 'method', value: 'POST' }])
    let cartRow = create('div', [{ label: 'class', value: 'row' }])
    let cartItems = create('div', [{ label: 'class', value: 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }])
    let cartSectionHeaderDiv = create('div', [{ label: 'class', value: 'cart-title' }])
    let cartSectionHeader = create('h2', [{ label: 'class', value: 'cart-title' }], 'Shopping cart')

    render(cartSection, container)
    render(container, cartForm)
    render(cartForm, cartRow)
    render(cartRow, cartItems)
    render(cartItems, cartSectionHeaderDiv)
    render(cartSectionHeaderDiv, cartSectionHeader)

    let getCook = getCookies()
    if (getCook.length) {

      let cartTableDiv = create('div', [])
      let cartTable = create('table', [{ label: 'class', value: 'table cart-items' }])
      let cartTableHeader = create('tbody', [])
      let cartTableColumn = create('tr', [])
      let cartTableColumnHeader1 = create('th', [], 'Remove')
      let cartTableColumnHeader2 = create('th', [], 'Images')
      let cartTableColumnHeader3 = create('th', [], 'Product Name')
      let cartTableColumnHeader4 = create('th', [], 'Unit Price')
      let cartTableColumnHeader5 = create('th', [], 'Qty')
      let cartTableColumnHeader6 = create('th', [], 'Subtotal')

      render(cartItems, cartTableDiv)
      render(cartTableDiv, cartTable)
      render(cartTable, cartTableHeader)
      render(cartTableHeader, cartTableColumn)
      render(cartTableColumn, cartTableColumnHeader1)
      render(cartTableColumn, cartTableColumnHeader2)
      render(cartTableColumn, cartTableColumnHeader3)
      render(cartTableColumn, cartTableColumnHeader4)
      render(cartTableColumn, cartTableColumnHeader5)
      render(cartTableColumn, cartTableColumnHeader6)

      let arrCart = []
      getCook.forEach(item => arrCart.push(item.key))
      let dataList = getStorage().filter(item => (arrCart.includes(item.id)) ? item : null)

      dataList.map(elem => {
        let cartTableBody = create('tbody', [])
        let cartTableColumnBody = create('tr', [])
        let cartTableColumnBody1 = create('td', [])
        let cartBodyColumnLink = create('a', [{ label: 'class', value: 'trash' }])
        let cartBodyColumnLinkImg = create('img', [{ label: 'src', value: '/image/trash.png' }, {
          label: 'alt',
          value: 'remove'
        }])

        let cartTableColumnBody2 = create('td', [])
        let cartBodyColumnLink2 = create('a', [{ label: 'href', value: `/#product/${elem.id}` },
          { label: 'target', value: '_blank' }])
        let cartBodyColumnLinkImg2 = create('img', [{ label: 'src', value: `${elem.image}` },
          { label: 'alt', value: `${elem.title}` }, { label: 'class', value: 'cart-img' }
        ])

        let cartTableColumnBody3 = create('td', [])
        let cartBodyColumnLink3 = create('a', [{ label: 'href', value: `/#product/${elem.id}` },
          { label: 'target', value: '_blank' }], `${elem.title}`)

        let cartTableColumnBody4 = create('td', [])
        let cartBodyColumn4 = create('p', [{ label: 'class', value: 'price' }], `$ ${elem.price}`)

        let qty
        getCook.forEach(item => {
          if (item.key === elem.id) {
            qty = item.value
          }
        })

        let cartTableColumnBody5 = create('td', [])
        let cartBodyColumn5 = create('input', [
          { label: 'type', value: 'number' }, { label: 'step', value: '1' }, { label: 'min', value: '0' },
          { label: 'max', value: '100' }, { label: 'id', value: 'quantity' }, {
            label: 'class',
            value: 'input-text qty'
          }
        ])
        cartBodyColumn5.value = qty

        let total = this.cartAmount(elem, qty)

        let cartTableColumnBody6 = create('td', [])
        let cartBodyColumn6 = create('p', [{ label: 'class', value: 'total' }], `$ ${total}`)

        render(cartTable, cartTableBody)
        render(cartTableBody, cartTableColumnBody)
        render(cartTableColumnBody, cartTableColumnBody1)
        render(cartTableColumnBody1, cartBodyColumnLink)
        render(cartBodyColumnLink, cartBodyColumnLinkImg)
        render(cartTableColumnBody, cartTableColumnBody2)
        render(cartTableColumnBody2, cartBodyColumnLink2)
        render(cartBodyColumnLink2, cartBodyColumnLinkImg2)
        render(cartTableColumnBody, cartTableColumnBody3)
        render(cartTableColumnBody3, cartBodyColumnLink3)
        render(cartTableColumnBody, cartTableColumnBody4)
        render(cartTableColumnBody4, cartBodyColumn4)
        render(cartTableColumnBody, cartTableColumnBody5)
        render(cartTableColumnBody5, cartBodyColumn5)
        render(cartTableColumnBody, cartTableColumnBody6)
        render(cartTableColumnBody6, cartBodyColumn6)

        cartBodyColumnLink.addEventListener('click', event => {
          removeCookie(+elem.id)
          event.target.closest('tr').remove();
          cartCount()
        })

        cartBodyColumn5.addEventListener('change', _ => {
          updateValueCookie(document.querySelector('#quantity').value, +elem.id)
          cartCount()
          let newTotalPrice = this.cartAmount(elem, document.querySelector('#quantity').value)
          document.querySelector('.total').textContent = `$ ${newTotalPrice.toString()}`
        })
      })
    }
    else {
      let cartSectionEmpty = create('p', [])
      cartSectionEmpty.innerHTML = 'Your cart is currently empty'
      let cartSectionLink = create('a', [{ label: 'href', value: '/#catalog' }], 'here' )
      let cartSectionSpan = create('span', [], 'Countinue browsing ' )

      render(cartSectionHeaderDiv, cartSectionEmpty)
      render(cartSectionHeaderDiv, cartSectionSpan)
      render(cartSectionSpan, cartSectionLink)
    }

    return cartSection
  }

  this.cartCount = () => {
    let count = 0
    let elemCount = document.querySelector('.cart-zero')
    getCookies().forEach(item => count += item.value)

    if (elemCount) {
      elemCount.textContent = count.toString()
    }
  }

  this.cartAmount = (el, qty) => {
    return el.price * qty
  }
}

let cart = new Cart()
let title = cart.title
let cartCount = cart.cartCount

export default cart
export { title, cartCount }
