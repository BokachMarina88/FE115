import { create, render } from './RenderData'
import { getCategoryStorage } from './Storage'

function Categories () {

  this.init = () => {
    return this.render()
  }

  this.render = () => {
    let categoryList = getCategoryStorage()

    let categoriesSection = create('section', [{ label: 'class', value: 'categories' }])
    let container = create('div', [{ label: 'class', value: 'container' }])
    let categoryDiv = create('div', [{ label: 'class', value: 'categories-list' }])

    render(categoriesSection, container)
    render(container, categoryDiv)

    if (categoryList.length) {
      categoryList.map(elem => {
        let elemClass = elem.split('\'')

        let singleImage = create('div', [{ label: 'class', value: `single-image categories-img ${elemClass[0]}` }])
        let singleImageH2 = create('h2', [], `${elem} collection`)
        let singleImageDiv = create('div', [{ label: 'class', value: 'shop-collection' }])
        let singleImageHref = create('a', [{ label: 'href', value: '/#catalog' }], `${elem} Collection`)
        let singleImageSpan = create('span')
        let singleImageImg = create('img', [{ label: 'src', value: '/image/arrow_right.png' }, {
          label: 'alt',
          value: `${elem} collection`
        }])

        render(categoryDiv, singleImage)
        render(singleImage, singleImageH2)
        render(singleImage, singleImageDiv)
        render(singleImageDiv, singleImageHref)
        render(singleImageHref, singleImageSpan)
        render(singleImageSpan, singleImageImg)
      })
    }

    return categoriesSection
  }

}

let categories = new Categories()

export default categories
