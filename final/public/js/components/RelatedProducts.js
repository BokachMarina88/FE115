import {  create, render } from './RenderData'
import { getStorage } from './Storage'

function RelatedProducts () {

  this.init = () => {
    return this.render()
  }

  this.render = () => {
    let itemsLimit = 3
    let limit = 1

    let catalogList = getStorage()
    let value = location.hash.split('/')
    let productId = value[1]
    let productData = catalogList.filter(item => item.id === +productId ? item : null)

    let items = catalogList.filter(item => {
      if (item.category === productData[0].category && limit <= itemsLimit && item.id !== +productId) {
        limit++
        return item
      }
    })

    let relatedSection = create('div', [{ label: 'class', value: 'related-products' }])
    let relatedSectionHeader = create('h2', [{ label: 'class', value: 'related-products-header' }], 'Related Products')
    let relatedRow = create('div', [{ label: 'class', value: 'row' }])

    render(relatedSection, relatedSectionHeader)
    render(relatedSection, relatedRow)

    items.map(elem => {
      let relatedItem = create('div', [{
        label: 'class',
        value: 'col-lg-4 col-md-6 col-sm-6 col-xs-12 d-flex justify-content-center'
      }])
      let singleItem = create('div', [{ label: 'class', value: 'single-product' }])
      let singleItemLink = create('a', [{ label: 'data-bs-toggle', value: 'modal' }, {
        label: 'data-bs-target',
        value: '#exampleModal'
      }])

      let singleItemImg = create('img', [{ label: 'src', value: `${elem.image}` }, {
        label: 'alt',
        value: `${elem.title}`
      }, { label: 'class', value: 'related-img' }])

      let itemDetails = create('div', [{ label: 'class', value: 'product-details' }])
      let itemDetailsHeader = create('h2')
      let itemDetailsHeaderLink = create('a', [{ label: 'href', value: `/#product/${elem.id}` }], `${elem.title}`)
      let itemDetailsDescription = create('p', [{ label: 'class', value: 'popular-price' }], `$ ${elem.price}`)

      render(relatedRow, relatedItem)
      render(relatedItem, singleItem)
      render(singleItem, singleItemLink)
      render(singleItemLink, singleItemImg)
      render(singleItem, itemDetails)
      render(itemDetails, itemDetailsHeader)
      render(itemDetailsHeader, itemDetailsHeaderLink)
      render(itemDetails, itemDetailsDescription)
    })

    return relatedSection
  }
}

let relatedProducts = new RelatedProducts()

export default relatedProducts
