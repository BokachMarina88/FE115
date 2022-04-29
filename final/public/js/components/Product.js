import { create, render } from './RenderData'
import { getStorage } from './Storage'
import CartForm from './CartForm'


function Product () {
  this.title = 'Product'

  this.render = (id) => {
    let limitRate = 5
    let product = getStorage().filter(elem => elem.id === +id ? elem : null)

    let productSection = create('section', [{ label: 'class', value: 'product' }], `<h1>Product Page</h1>`)
    let container = create('div', [{ label: 'class', value: 'container' }])
    let catalogRow = create('div', [{ label: 'class', value: 'row' }])
    let productImageDiv = create('div', [{ label: 'class', value: 'col-lg-5 col-md-5 col-sm-5 col-xs-12' }])
    let productImage = create('img', [{ label: 'src', value: `${product[0].image}` },
      { label: 'alt', value: `${product[0].title}` }, { label: 'class', value: 'product-img' }])
    let productDescDiv = create('div', [{ label: 'class', value: 'col-lg-5 col-md-5 col-sm-5 col-xs-12' }])
    let productDescHeader = create('h2', [{ label: 'class', value: 'product-heading' }], `${product[0].title}`)
    let productDescRatingDiv = create('div', [{ label: 'class', value: 'product-rating' }])

    let productRateInt = Math.round(product[0].rating.rate)
    if (productRateInt > 0) {
      for (let i = 1; i <= limitRate; i++) {
        if (i <= Math.round(product[0].rating.rate)) {
          productDescRatingDiv.appendChild(create('span', [{ label: 'class', value: 'icon-star icon-star-full' }]))
        } else {
          productDescRatingDiv.appendChild(create('span', [{ label: 'class', value: 'icon-star icon-star-empty' }]))
        }
      }
    } else {
      productDescRatingDiv.appendChild(create('span', [{ label: 'class', value: 'product-rate-caption' }], 'No review'))
    }

    let productPrice = create('div', [{ label: 'class', value: 'pricing-rate' }])
    let productPriceSpan = create('span', [], `$ ${product[0].price}`)
    let productText = create('div', [{ label: 'class', value: 'product-text' }], `${product[0].description}`)

    render(productSection, container)
    render(container, catalogRow)
    render(catalogRow, productImageDiv)
    render(productImageDiv, productImage)
    render(catalogRow, productDescDiv)
    render(productDescDiv, productDescHeader)
    render(productDescDiv, productDescRatingDiv)
    render(productDescDiv, productPrice)
    render(productPrice, productPriceSpan)
    render(productDescDiv, productText)

    import(`./CartForm.js`).then(module => {
        productDescDiv.append(module.default.init())
    })

    return productSection
  }
}

let product = new Product()
let title = product.title

export default product
export { title }