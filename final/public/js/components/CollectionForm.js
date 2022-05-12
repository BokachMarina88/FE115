import { create, render } from './RenderData'
import { getCategoryStorage } from './Storage'

function CollectionForm () {

  this.init = () => {
    return this.render()
  }

  this.render = () => {
    let all = 0
    let collectionArea = create('div', [{ label: 'class', value: 'collection-product-area' }])
    let collectionFilterArea = create('div', [{ label: 'class', value: 'collection-area' }])
    let collectionFilterAreaHeader = create('h2', [], 'Collections')
    let collectionFilterAreaList = create('ul', [{ label: 'class', value: 'collection' }])

    render(collectionArea, collectionFilterArea)
    render(collectionFilterArea, collectionFilterAreaHeader)
    render(collectionFilterArea, collectionFilterAreaList)

    let collectionFilterAreaItemAll = create('li', [])
    let collectionFilterAreaItemLinkAll = create('a', [{
      label: 'href',
      value: '/#clothing'
    }], 'all collection')

    render(collectionFilterAreaList, collectionFilterAreaItemAll)
    render(collectionFilterAreaItemAll, collectionFilterAreaItemLinkAll)

    let collectionList = getCategoryStorage()
    if (collectionList.length) {
      collectionList.map(elem => {
        let elemClass = elem.name.split('\'')

        let collectionFilterAreaItem = create('li', [])
        let collectionFilterAreaItemLink = create('a', [{
          label: 'href',
          value: `/#clothing/${elemClass[0]}`
        }], `${elem.name} collection`)
        let collectionFilterAreaItemCount = create('span', [], `(${elem.items})`)

        all += elem.items

        render(collectionFilterAreaList, collectionFilterAreaItem)
        render(collectionFilterAreaItem, collectionFilterAreaItemLink)
        render(collectionFilterAreaItem, collectionFilterAreaItemCount)

      })

      let collectionFilterAreaItemCountAll = create('span', [], `(${all.toString()})`)

      render(collectionFilterAreaItemAll, collectionFilterAreaItemCountAll)
    }

    let bannerImage = create('div', [{ label: 'class', value: 'banner-promo' }])

    render(collectionArea, bannerImage)

    return collectionArea
  }
}

let collectionForm = new CollectionForm()

export default collectionForm
