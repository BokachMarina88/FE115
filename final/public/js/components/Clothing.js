import { create, render } from './RenderData'

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

    render(clothingSection, container)
    render(container, catalogRow)
    render(catalogRow, clothingFilterDiv)
    render(catalogRow, clothingCatalogDiv)

    import(`./CollectionForm.js`).then(module => {
      clothingFilterDiv.append(module.default.init())
    })

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