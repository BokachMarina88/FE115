import { create } from '../RenderData'

function AuthorForm () {

  const elem = create('section', [{ label: 'class', value: 'quote' }])
  elem.innerHTML = `    
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="quote-single d-flex">
                        <div class="author">
                            <img src="/image/bg_foto.png" alt="author">
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                                tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                                quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                                consequat.</p>
                            <p>alexmax</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `
  this.init = () => {
    return elem
  }
}

export default new AuthorForm()