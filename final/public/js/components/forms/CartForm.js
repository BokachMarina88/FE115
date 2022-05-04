import { create } from '../RenderData'

function CartForm () {

  const elem = create('div', [{ label: 'class', value: 'product-cart-area' }])
  elem.innerHTML = `    
        <form action="#" method="POST">
            <div class="form-field">
                <label class="input__quantity" for="quantity">
                    <p class="label">Quantity</p>
                        <input type="number" value="1" step="1" min="0" max="100" placeholder="something@website.com" id="quantity"
                            class="form-control">
                </label>
            </div>
            <div class="form-field">
                <button class="button add-cart-button">Add to cart</button>
            </div>
            <div class="add-favourite">
                <a href="/#"><span class="ico button icon-like"></span></a>
            </div>
        </form>
  `
  this.init = () => {
    return elem
  }
}

export default new CartForm()