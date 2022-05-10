import { create, render, removeClasses, addClasses } from './RenderData'
import { getStorage } from './Storage'
import cartForm from './CartForm'

function Product () {
  this.title = 'Product'

  this.render = (id) => {
    let limitRate = 5
    let product = getStorage().filter(elem => elem.id === +id ? elem : null)

    let productSection = create('section', [{ label: 'class', value: 'product' }])
    let container = create('div', [{ label: 'class', value: 'container' }])
    let catalogRow = create('div', [{ label: 'class', value: 'row mb-5 justify-content-around' }])
    let productImageDiv = create('div', [{
      label: 'class',
      value: 'col-lg-5 col-md-12 col-sm-12 col-xs-12 product-info'
    }])
    let productImage = create('img', [{ label: 'src', value: `${product[0].image}` },
      { label: 'alt', value: `${product[0].title}` }, { label: 'class', value: 'product-img' }])
    let productDescDiv = create('div', [{ label: 'class', value: 'col-lg-5 col-md-12 col-sm-12 col-xs-12' }])
    let productDescHeader = create('h2', [{
      label: 'class',
      value: 'product-heading product-info'
    }], `${product[0].title}`)
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

    let productPrice = create('div', [{ label: 'class', value: 'pricing-rate product-info' }])
    let productPriceSpan = create('span', [], `$ ${product[0].price}`)
    let productText = create('div', [{ label: 'class', value: 'product-text' }], `${product[0].description}`)

    let descriptionSection = create('div', [{ label: 'class', value: 'product-description' }])
    let descriptionList = create('ul', [{ label: 'class', value: 'nav nav-pills' }])
    let descriptionItem1 = create('li', [{ label: 'class', value: 'nav-pills-tab active' }])
    let descriptionLink1 = create('a', [{ label: 'class', value: 'button' }, { label: 'href', value: '#1b' },
      { label: 'data-toggle', value: 'tab' }], 'Product Description')
    let descriptionItem2 = create('li', [{ label: 'class', value: 'nav-pills-tab' }])
    let descriptionLink2 = create('a', [{ label: 'class', value: 'button' }, { label: 'href', value: '#2b' },
      { label: 'data-toggle', value: 'tab' }], 'Reviews')
    let descriptionItem3 = create('li', [{ label: 'class', value: 'nav-pills-tab' }])
    let descriptionLink3 = create('a', [{ label: 'class', value: 'button' }, { label: 'href', value: '#3b' },
      { label: 'data-toggle', value: 'tab' }], 'Data sheet')

    let descriptionTabs = create('div', [{ label: 'class', value: 'tab-content clearfix' }])
    let descriptionTab1 = create('div', [{ label: 'class', value: 'tab-pane active' }, { label: 'id', value: '1b' }])
    let descriptionTab1Text = create('p', [], `${product[0].description}`)
    let descriptionTab2 = create('div', [{ label: 'class', value: 'tab-pane' }, { label: 'id', value: '2b' }])
    let descriptionTab2Text = create('p', [], 'Reviews')
    let descriptionTab3 = create('div', [{ label: 'class', value: 'tab-pane' }, { label: 'id', value: '3b' }])
    let descriptionTab3Text = create('p', [], 'Data sheet')

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

    let item = cartForm.render(id)
    productDescDiv.append(item)

    render(container, descriptionSection)
    render(descriptionSection, descriptionList)
    render(descriptionList, descriptionItem1)
    render(descriptionItem1, descriptionLink1)
    render(descriptionList, descriptionItem2)
    render(descriptionItem2, descriptionLink2)
    render(descriptionList, descriptionItem3)
    render(descriptionItem3, descriptionLink3)

    render(descriptionSection, descriptionTabs)
    render(descriptionTabs, descriptionTab1)
    render(descriptionTab1, descriptionTab1Text)
    render(descriptionTabs, descriptionTab2)
    render(descriptionTab2, descriptionTab2Text)
    render(descriptionTabs, descriptionTab3)
    render(descriptionTab3, descriptionTab3Text)

    import(`./RelatedProducts.js`).then(module => {
      container.append(module.default.init())
    })

    return productSection
  }
}

let product = new Product()
let title = product.title

export default product
export { title }