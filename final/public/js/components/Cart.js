import { create, render } from './RenderData'
import { clearCookie, getCookies, removeCookie, updateValueCookie } from './Cookies'
import { getStorage } from './Storage'

function Cart () {
  this.title = 'Cart'

  this.init = () => {
    return this.render()
  }

  this.render = () => {
    let cartSection = create('section', [{ label: 'class', value: 'cart' }])
    let container = create('div', [{ label: 'class', value: 'container' }])
    let cartForm = create('form', [{ label: 'action', value: '#' }, { label: 'method', value: 'POST' }])
    let cartRow = create('div', [{ label: 'class', value: 'row' }])
    let cartItems = create('div', [{ label: 'class', value: 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }])
    let cartSectionHeaderDiv = create('div', [{ label: 'class', value: 'cart-title' }])
    let cartSectionHeader = create('h3', [{ label: 'class', value: 'cart-title' }], 'Shopping cart')

    render(cartSection, container)
    render(container, cartForm)
    render(cartForm, cartRow)
    render(cartRow, cartItems)
    render(cartItems, cartSectionHeaderDiv)
    render(cartSectionHeaderDiv, cartSectionHeader)

    let getCook = getCookies()
    if (getCook.length) {
      let cartTableDiv = create('div', [{label: 'class', value: 'table-responsive-md'}])
      let cartTable = create('table', [{ label: 'class', value: 'table table-bordered cart-items' }])
      let cartTableColumn = create('tr', [])
      let cartTableColumnHeader1 = create('th', [], 'Remove')
      let cartTableColumnHeader2 = create('th', [], 'Images')
      let cartTableColumnHeader3 = create('th', [], 'Product Name')
      let cartTableColumnHeader4 = create('th', [], 'Unit Price')
      let cartTableColumnHeader5 = create('th', [], 'Qty')
      let cartTableColumnHeader6 = create('th', [], 'Subtotal')

      render(cartItems, cartTableDiv)
      render(cartTableDiv, cartTable)
      render(cartTable, cartTableColumn)
      render(cartTableColumn, cartTableColumnHeader1)
      render(cartTableColumn, cartTableColumnHeader2)
      render(cartTableColumn, cartTableColumnHeader3)
      render(cartTableColumn, cartTableColumnHeader4)
      render(cartTableColumn, cartTableColumnHeader5)
      render(cartTableColumn, cartTableColumnHeader6)

      let arrCart = []
      getCook.forEach(item => arrCart.push(item.key))
      let dataList = getStorage().filter(item => (arrCart.includes(item.id)) ? item : null)
      let cartTableBody = create('tbody', [])
      render(cartTable, cartTableBody)

      dataList.map(elem => {
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
          if (getCookies().length) {
            event.target.closest('tr').remove()
            let newCartTotalPrice = this.cartTotalAmount()
            document.querySelector('.subtotal > p span').textContent = `$ ${newCartTotalPrice.toString()}`
          } else {
            document.querySelector('.cart-items').remove()
            document.querySelector('.shopping-cart-main').remove()
            document.querySelector('.shopping-cart-final').remove()
            this.emptyMessage(cartSectionHeaderDiv)
          }
          cartCount()
        })

        cartBodyColumn5.addEventListener('change', event => {
          updateValueCookie(event.target.value, +elem.id)
          cartCount()
          let newPrice = this.cartAmount(elem, event.target.value)
          event.target.parentElement.nextSibling.textContent = `$ ${newPrice.toString()}`
          let newCartTotalPrice = this.cartTotalAmount()
          document.querySelector('.subtotal > p span').textContent = `$ ${newCartTotalPrice.toString()}`
        })
      })

      let cartBtnRow = create('div', [{ label: 'class', value: 'row' }])
      let cartBtns = create('div', [{ label: 'class', value: 'col-lg-12 col-md-12 col-sm-12 col-xs-12' }])
      let cartBtnsMain = create('div', [{ label: 'class', value: 'shopping-cart-main' }])
      let cartBtnMainDiv1 = create('div', [{ label: 'class', value: 'shopping-button' }])
      let cartBtnMainLink1 = create('a', [{ label: 'class', value: 'continue-shopping' }, {
        label: 'href',
        value: '/#clothing'
      }], 'Continue Shopping')

      let cartBtnMainDiv2 = create('div', [{ label: 'class', value: 'shopping-button' }])
      let cartBtnMainLink2 = create('a', [{ label: 'class', value: 'continue-shopping clear' }, {
        label: 'href',
        value: '/#cart'
      }], 'Clear Shopping Cart')

      cartBtnMainDiv2.addEventListener('click', _ => {
        clearCookie()
        document.querySelector('.cart-items').remove()
        document.querySelector('.shopping-cart-main').remove()
        document.querySelector('.shopping-cart-final').remove()
        cartCount()
        this.cartTotalAmount()
        this.emptyMessage(cartSectionHeaderDiv)
      })

      let cartBtnMainDiv3 = create('div', [{ label: 'class', value: 'shopping-button' }])
      let cartBtnMainLink3 = create('a', [{ label: 'class', value: 'continue-shopping' }, {
        label: 'href',
        value: '/#cart'
      }], 'Update shopping Cart')

      render(cartForm, cartBtnRow)
      render(cartBtnRow, cartBtns)
      render(cartBtns, cartBtnsMain)
      render(cartBtnsMain, cartBtnMainDiv1)
      render(cartBtnMainDiv1, cartBtnMainLink1)
      render(cartBtnsMain, cartBtnMainDiv2)
      render(cartBtnMainDiv2, cartBtnMainLink2)
      render(cartBtnsMain, cartBtnMainDiv3)
      render(cartBtnMainDiv3, cartBtnMainLink3)

      let cartDivRow = create('div', [{ label: 'class', value: 'shopping-cart-final' }])
      let row = create('div', [{ label: 'class', value: 'row' }])
      let item = create('div', [{ label: 'class', value: 'col-md-8 col-sm-12 col-xs-12' }])

      let cartLabel = create('label', [{ label: 'class', value: 'textarea w-100' }, {
        label: 'for',
        value: 'CartSpecialInstructions'
      }])
      let cartDesc = create('h3', [{ label: 'class', value: 'label' }], 'Special instructions for seller')
      let cartInput = create('textarea', [{ label: 'class', value: 'form-control w-100' }, {
        label: 'id',
        value: 'CartSpecialInstructions'
      }])

      let totalCartPrice = this.cartTotalAmount()

      let item1 = create('div', [{ label: 'class', value: 'col-md-4 col-sm-12 col-xs-12' }])
      let rowTotal = create('div', [{ label: 'class', value: 'totals' }])
      let rowSubTotal = create('div', [{ label: 'class', value: 'subtotal' }])
      let rowSubTotalText = create('p', [], 'Subtotals')
      let rowSubTotalTextPrice = create('span', [], `$ ${totalCartPrice}`)

      let divCartCheckout = create('div', [{ label: 'class', value: 'cart-checkout' }])
      let checkout = create('div', [{ label: 'class', value: 'shopping-button' }])
      let checkoutLink = create('a', [{ label: 'class', value: 'continue-shopping' }, {
        label: 'href',
        value: '/#cart'
      }], 'Proceed to Checkout')
      let checkoutDesc = create('p', [], 'Shipping &amp; taxes calculated at checkout')

      render(cartForm, cartDivRow)
      render(cartDivRow, row)
      render(row, item)
      render(item, cartLabel)
      render(cartLabel, cartDesc)
      render(cartLabel, cartInput)
      render(row, item1)
      render(item1, rowTotal)
      render(rowTotal, rowSubTotal)
      render(rowSubTotal, rowSubTotalText)
      render(rowSubTotalText, rowSubTotalTextPrice)
      render(rowTotal, divCartCheckout)
      render(divCartCheckout, checkout)
      render(checkout, checkoutLink)
      render(rowTotal, checkoutDesc)
    } else {
      this.emptyMessage(cartSectionHeaderDiv)
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

  this.cartTotalAmount = () => {
    let totalPrice = 0

    getCookies().forEach(item => {
      let it = getStorage().filter(el => (el.id === item.key) ? el : null)
      if (it) {
        totalPrice += it[0].price * item.value
      }
    })

    return totalPrice.toFixed(2)
  }

  this.emptyMessage = (elem) => {
    let cartSectionEmpty = create('p', [])
    cartSectionEmpty.innerHTML = 'Your cart is currently empty'
    let cartSectionLink = create('a', [{ label: 'href', value: '/#clothing' }], 'here')
    let cartSectionSpan = create('span', [], 'Countinue browsing ')

    render(elem, cartSectionEmpty)
    render(elem, cartSectionSpan)
    render(cartSectionSpan, cartSectionLink)
  }
}

let cart = new Cart()
let title = cart.title
let cartCount = cart.cartCount

export default cart
export { title, cartCount }
