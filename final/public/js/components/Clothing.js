import { create, render } from './RenderData'
import { getCategoryStorage, getStorage } from './Storage'

function Clothing () {
  this.title = 'Clothing'

  this.init = () => {
    return this.render()
  }

  this.render = () => {
    let clothingSection = create('section', [{ label: 'class', value: 'clothing' }])
    let container = create('div', [{ label: 'class', value: 'container' }])
    let catalogRow = create('div', [{ label: 'class', value: 'row' }])
    let clothingFilterDiv = create('div', [{ label: 'class', value: 'col-lg-3 col-md-3 col-sm-12 col-xs-12' }])
    let clothingCatalogDiv = create('div', [{ label: 'class', value: 'col-lg-9 col-md-9 col-sm-12 col-xs-12' }])

    let categoryArea = create('div', [{ label: 'class', value: 'category-product-area' }])
    let categoryFilterArea = create('div', [{ label: 'class', value: 'category-area' }])
    let categoryFilterAreaHeader = create('h2', [], 'Collections')
    let categoryFilterAreaList = create('ul', [{ label: 'class', value: 'category' }])

    render(clothingSection, container)
    render(container, catalogRow)
    render(catalogRow, clothingFilterDiv)
    render(clothingFilterDiv, categoryArea)

    render(categoryArea, categoryFilterArea)
    render(categoryFilterArea, categoryFilterAreaHeader)
    render(categoryFilterArea, categoryFilterAreaList)

    let categoryFilterAreaItemAll = create('li', [])
    let categoryFilterAreaItemLinkAll = create('a', [{
      label: 'href',
      value: '/#clothing'
    }], 'all collection')

    render(categoryFilterAreaList, categoryFilterAreaItemAll)
    render(categoryFilterAreaItemAll, categoryFilterAreaItemLinkAll)

    let categoryList = getCategoryStorage()
    if (categoryList.length) {
      categoryList.map(elem => {
        let elemClass = elem.split('\'')

        let categoryFilterAreaItem = create('li', [])
        let categoryFilterAreaItemLink = create('a', [{
          label: 'href',
          value: `/#clothing/${elemClass[0]}`
        }], `${elem} collection`)

        render(categoryFilterAreaList, categoryFilterAreaItem)
        render(categoryFilterAreaItem, categoryFilterAreaItemLink)

      })
    }

    let bannerImage = create('div', [{ label: 'class', value: 'banner-promo' }])

    render(categoryArea, bannerImage)

    render(catalogRow, clothingCatalogDiv)
    import(`./Catalog.js`).then(module => {
      clothingCatalogDiv.append(module.default.init())
    })

    return clothingSection
  }
}

let clothing = new Clothing()
let title = clothing.title

export default clothing
export { title }