import { setCategoryStorage, setStorage } from './Storage'

const url = 'https://fakestoreapi.com/products'

export async function getData () {
  await fetch(url)
  .then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }
  )
  .then(data => {
    if (data) {
      setStorage(data)

      let categoryData = []
      const category = [...new Set(data.reduce((f, i) => [...f, i.category], []))]

      Object.values(category).forEach((item, key) => {
        let arr = data.filter(it => it.category === category[key] ? it : null)
        categoryData.push({ name: item, items: arr.length })
      })

      setCategoryStorage(categoryData)
    }
  })
}


