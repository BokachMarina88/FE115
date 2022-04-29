import { clearTags } from './RenderData'
import { getData } from './ProductAPI'
import { getStorage } from './Storage'
import home from './Home'
import product from './Product'

function Main () {
  this.init = () => {
    this.element = document.querySelector('.main')
    window.addEventListener('hashchange', async _ => {
      await this.routing()
    })

    window.addEventListener('load', async _ => {
      const a = document.querySelectorAll('a.nav-link')
      a.forEach(a => {
        a.addEventListener('click', async _ => {
          await this.routing()
        })
      })
      await this.routing()
    })

    return this.element
  }

  this.getHash = () => {
    let hash = location.hash.slice(1)
    if (hash.indexOf('/') !== -1) {
      let value = hash.split('/')
      hash = value[0]
    }

    if (hash === '') {
      hash = 'home'
    }

    clearTags('.active-link', hash)

    return hash[0].toUpperCase() + hash.substring(1)
  }

  this.routing = async () => {
    if (!getStorage().length) {
      await getData()
    }

    let hash = this.getHash()

    if (hash === 'Home') {
      this.element.innerHTML = ''
      import(`./Slider.js`).then(module => {
        this.element.append(module.default.init())
      })
      import(`./Categories.js`).then(module => {
        this.element.append(module.default.init())
      })
      import(`./Catalog.js`).then(module => {
        this.element.append(module.default.init())
      })
      document.title = home.title
    } else if (hash === 'Product') {
      let localHash = window.location.hash.slice(1)
      if (localHash.indexOf('/') !== -1) {
        let value = localHash.split('/')
        let item = product.render(value[1])
        this.element.innerHTML = ''
        this.element.append(item)
        document.title = product.title
      }
    } else {
      import(`./${hash}.js`).then(module => {
        this.element.innerHTML = ''
        this.element.append(module.default.init())
        document.title = module.title
      })
    }
  }
}

export default new Main().init()


