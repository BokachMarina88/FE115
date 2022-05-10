import { create } from './RenderData'

function Slider () {

  const elem = create('section', [{ label: 'class', value: 'slider' }])
  elem.innerHTML = `    
        <div id="carouselIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/image/sliders/slider1.jpg" class="d-block w-100" alt="...">
                    <div class="middle-text">
                        <h3 class="slider-title-top slider-title">
                            <span>Hand Cut and Crafted in soft Nenuine Leather</span>
                        </h3>
                        <h2 class="slider-title-middle slider-title"><span>Leather Bags</span></h2>
                        <div class="d-flex justify-content-center">
                            <a class="slider-readmore" href="/#">explorer</a>
                            <a class="slider-readmore" href="/#">Read more</a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/image/sliders/slider2.jpg" class="d-block w-100" alt="...">
                    <div class="middle-text">
                        <h3 class="slider-title-top slider-title"><span>MAD FOR SUMMER</span></h3>
                        <h2 class="slider-title-middle slider-title"><span>STRIPES</span></h2>
                        <div class="d-flex justify-content-center">
                            <a class="slider-readmore" href="/#">explorer</a>
                            <a class="slider-readmore" href="/#">Shopping now</a>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators"
                    data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators"
                    data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
  `
  this.init = () => {
    return elem
  }
}

export default new Slider()
