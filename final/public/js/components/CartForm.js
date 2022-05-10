import { addClasses, create, removeClasses, render } from './RenderData'
import { getStorage } from './Storage'
import { getCookie, removeCookie, setCookie } from './Cookies'
import { cartCount } from './Cart'

function CartForm () {

  this.init = () => {
    return this.render()
  }

  this.render = (id) => {
    let product = getStorage().filter(elem => elem.id === +id ? elem : null)

    let productCart = create('div', [{ label: 'class', value: 'product-cart-area' }])
    let productForm = create('form', [{ label: 'action', value: '#' }, { label: 'method', value: 'POST' }])
    let cartDiv = create('div', [{ label: 'class', value: 'form-field' }])
    let cartLabel = create('label', [{ label: 'class', value: 'input-quantity' }, { label: 'for', value: 'quantity' }])
    let cartDesc = create('p', [{ label: 'class', value: 'label' }], 'Quantity')
    let cartInput = create('input', [
      { label: 'type', value: 'number' }, { label: 'value', value: '1' },
      { label: 'step', value: '1' }, { label: 'min', value: '0' },
      { label: 'max', value: '100' }, { label: 'id', value: 'quantity' }, { label: 'class', value: 'form-control' }
    ])

    let cartsAddBtn = create('div', [{ label: 'class', value: 'form-field' }])
    let cartAdd = create('button', [{ label: 'class', value: 'button add-cart-button show-button' }], 'Add to cart')

    let cartsRemoveBtn = create('div', [{ label: 'class', value: 'form-field' }])
    let cartRemove = create('button', [{
      label: 'class',
      value: 'button remove-cart-button hide-button'
    }], 'Remove from cart')

    let cartsFavBtn = create('div', [{ label: 'class', value: 'add-favourite' }])
    let cartFav = create('a', [{ label: 'class', value: 'ico button icon-like' }, {
      label: 'href',
      value: `/#product/${product[0].id}`
    }])

    render(productCart, productForm)
    render(productForm, cartDiv)
    render(cartDiv, cartLabel)
    render(cartLabel, cartDesc)
    render(cartLabel, cartInput)

    render(cartDiv, cartsAddBtn)
    render(cartsAddBtn, cartAdd)
    render(cartDiv, cartsRemoveBtn)
    render(cartsRemoveBtn, cartRemove)
    render(cartDiv, cartsFavBtn)
    render(cartsFavBtn, cartFav)

    if (getCookie(+product[0].id).length) {
      addClasses('hide-button', cartAdd)
      removeClasses('hide-button', cartRemove)
      addClasses('show-button', cartRemove)
    } else {
      addClasses('show-button', cartAdd)
    }

    cartsAddBtn.addEventListener('click', event => {
      event.preventDefault()
      setCookie(document.querySelector('#quantity').value, +product[0].id)
      if (getCookie(+product[0].id).length) {
        if (cartAdd.classList.contains('show-button')) {
          removeClasses('show-button', cartAdd)
          addClasses('hide-button', cartAdd)
          removeClasses('hide-button', cartRemove)
          addClasses('show-button', cartRemove)
        }
        cartCount()
      }
    })

    cartsRemoveBtn.addEventListener('click', event => {
      event.preventDefault()
      removeCookie(+product[0].id)
      if (cartRemove.classList.contains('show-button')) {
        removeClasses('show-button', cartRemove)
        addClasses('hide-button', cartRemove)
        removeClasses('hide-button', cartAdd)
        addClasses('show-button', cartAdd)
      }
      cartCount()
    })


    return productCart
  }
}

let cartForm = new CartForm()

export default cartForm
