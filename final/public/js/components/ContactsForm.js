import { create } from './RenderData'

function ContactsForm () {

  const elem = create('section', [{ label: 'class', value: 'contacts' }])
  elem.innerHTML = `    
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="contacts-list">
                        <h2>info@liendobingo.com</h2>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="contacts-list">
                        <h2>(+5555) 224 434</h2>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="contacts-list">
                        <h2>Connect us:</h2>
                        <div class="contacts-list-socials">
                            <a href="/#"><span class="ico ico-fb"></span></a>
                            <a href="/#"><span class="ico ico-tw"></span></a>
                            <a href="/#"><span class="ico ico-ln"></span></a>
                            <a href="/#"><span class="ico ico-pint"></span></a>
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

export default new ContactsForm()