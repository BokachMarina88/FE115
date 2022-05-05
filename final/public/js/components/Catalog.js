import { addClasses, create, removeClasses, render } from './RenderData'
import { getStorage } from './Storage'
import { getCookie, getCookies, setCookie } from './Cookies'
import { cartCount } from './Cart'

function Catalog () {
  this.title = 'Catalog'

  this.init = () => {
    return this.render()
  }

  this.render = () => {
    let itemsLimit = 11
    let сatalogName = 'Featured'
    let catalogList = getStorage()

    let catalogSection = create('section', [{ label: 'class', value: 'catalog' }])
    let container = create('div', [{ label: 'class', value: 'container' }])
    let catalogSectionHeader = create('h2', [{ label: 'class', value: 'catalog-header' }])
    let catalogFeatures = create('div', [{ label: 'class', value: 'feature-product' }])
    let catalogProduct = create('div', [{ label: 'class', value: 'product-list' }])
    let catalogRow = create('div', [{ label: 'class', value: 'row' }])

    render(catalogSection, container)
    render(container, catalogSectionHeader)
    render(container, catalogFeatures)
    render(catalogFeatures, catalogProduct)
    render(catalogProduct, catalogRow)

    if (catalogList.length) {
      let items = catalogList
      if (!location.hash) {
        items = catalogList.filter(item => item.id <= itemsLimit ? item : null)
      } else {
        let value = location.hash.split('/')
        let categoryName = ''

        switch (value[1]) {
          case 'men':
            categoryName = 'men\'s clothing'

            break
          case 'women':
            categoryName = 'women\'s clothing'
            break
          default:
            categoryName = value[1]
            break
        }

        if (categoryName) {
          items = catalogList.filter(item => item.category === categoryName ? item : null)
          if (!items.length) {
            items = catalogList
          } else {
            сatalogName = items[0].category
          }
        }
      }

      catalogSectionHeader.innerText = сatalogName

      let arrCart = []
      getCookies().forEach(item => arrCart.push(+item.key))

      items.map(elem => {
        let catalogItem = create('div', [{
          label: 'class',
          value: 'col-lg-4 col-md-6 col-sm-6 col-xs-12 d-flex justify-content-center'
        }])
        let singleItem = create('div', [{ label: 'class', value: 'single-product' }])
        let singleItemLink = create('a', [{ label: 'href', value: `/#product/${elem.id}` }, {
          label: 'class',
          value: 'image-link'
        }])
        let className = arrCart.includes(elem.id) ? 'in-cart' : ''
        let singleItemImg = create('img', [{ label: 'src', value: `${elem.image}` }, {
          label: 'alt',
          value: `${elem.title}`
        }, { label: 'class', value: className }])

        let itemDetails = create('div', [{ label: 'class', value: 'product-details' }])
        let itemDetailsHeader = create('h2')
        let itemDetailsHeaderLink = create('a', [{ label: 'href', value: `/#product/${elem.id}` }], `${elem.title}`)
        let itemDetailsDescription = create('p', [{ label: 'class', value: 'popular-price' }], `$ ${elem.price}`)

        let classAdd = !arrCart.includes(elem.id) ? 'cart-details' : 'cart-details-clicked'
        let cartAdd = create('a', [{ label: 'class', value: `button add-cart-button ${classAdd}` }], 'Add to cart')

        render(catalogRow, catalogItem)
        render(catalogItem, singleItem)
        render(singleItem, singleItemLink)
        render(singleItemLink, singleItemImg)

        render(singleItem, itemDetails)
        render(itemDetails, itemDetailsHeader)
        render(itemDetailsHeader, itemDetailsHeaderLink)
        render(itemDetails, itemDetailsDescription)
        render(itemDetails, cartAdd)

        cartAdd.addEventListener('click', _ => {
          setCookie('1', +elem.id)
          if (getCookie(+elem.id).length) {
            if (cartAdd.classList.contains('cart-details')) {
              addClasses('in-cart', singleItemImg)
              removeClasses('cart-details', cartAdd)
              addClasses('cart-details-clicked', cartAdd)
            }
            cartCount()
          }
        })
      })

      if (!location.hash) {
        let learnMoreRow = create('div', [{ label: 'class', value: 'row justify-content-center' }])
        let learnMoreItem = create('div', [{ label: 'class', value: 'col-lg-3 col-md-3 col-sm-6 col-xs-12' }])
        let learnMoreDiv = create('div', [{ label: 'class', value: 'more-feature-area' }])
        let learnMoreLink = create('a', [{ label: 'href', value: '/#clothing' }], 'Load more...')

        render(container, learnMoreRow)
        render(learnMoreRow, learnMoreItem)
        render(learnMoreItem, learnMoreDiv)
        render(learnMoreDiv, learnMoreLink)
      }
    }

    return catalogSection
  }
}

let catalog = new Catalog()
let title = catalog.title

export default catalog
export { title }