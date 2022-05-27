import { create } from './RenderData'

function Blog () {
  this.title = 'Blog'

  let elem = create('section', [{ label: 'class', value: 'blog' }])
  elem.innerHTML = `
      <div class="container">
            <div class="row">
              <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                  <div class="post-format-area">
                      <img src="/image/blog/pic1.png" alt="Blog post">
                  </div>
                  <div class="blog-details-area">
                      <div class="blog-details-list">
                          <ul class="blog-author post-text-style">
                              <li>
                                  <a href="/#blog"><span>blog</span></a>,
                                  <a href="/#blog"><span>mohin</span></a>,
                                  <a href="/#blog"><span>nirob</span></a>,
                                  <a href="/#blog"><span>salim</span></a>
                              </li>
                              <li class="post-text-style">Boot Expertsr</li>
                              <li class="post-text-style">May 25, 2016</li>
                          </ul>
                      </div>
                      <div class="blog-info-details">
                          <h2>Praesent ornare tortor</h2>
                          <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex. Aenean posuere
                              libero eu augue condimentum rhoncus. Praesent ornare tortor ac ante egestas hendrerit.</p>
                          <p>Aliquam et metus pharetra, bibendum massa nec, fermentum odio. Nunc id leo ultrices, mollis
                              ligula in, finibus tortor. Mauris eu dui ut lectus fermentum eleifend. Pellentesque faucibus
                              sem ante, non malesuada odio varius nec. Suspendisse potenti. Proin consectetur aliquam odio
                              nec fringilla. Sed interdum at justo in efficitur. Vivamus gravida volutpat sodales. Fusce
                              ornare sit amet ligula condimentum sagittis.</p>
                          <blockquote>
                              <p>Quisque semper nunc vitae erat pellentesque, ac placerat arcu consectetur. In venenatis
                                  elit ac ultrices convallis. Duis est nisi, tincidunt ac urna sed, cursus blandit lectus.
                                  In ullamcorper sit amet ligula ut eleifend. Proin dictum tempor ligula, ac feugiat
                                  metus. Sed finibus tortor eu scelerisque scelerisque.</p>
                          </blockquote>
                          <p>Aenean et tempor eros, vitae sollicitudin velit. Etiam varius enim nec quam tempor, sed
                              efficitur ex ultrices. Phasellus pretium est vel dui vestibulum condimentum. Aenean nec
                              suscipit nibh. Phasellus nec lacus id arcu facilisis elementum. Curabitur lobortis, elit ut
                              elementum congue, erat ex bibendum odio, nec iaculis lacus sem non lorem. Duis suscipit
                              metus ante, sed convallis quam posuere quis. Ut tincidunt eleifend odio, ac fringilla mi
                              vehicula nec. Nunc vitae lacus eget lectus imperdiet tempus sed in dui. Nam molestie magna
                              at risus consectetur, placerat suscipit justo dignissim. Sed vitae fringilla enim, nec
                              ullamcorper arcu.</p>
                          <p>Suspendisse turpis ipsum, tempus in nulla eu, posuere pharetra nibh. In dignissim vitae lorem
                              non mollis. Praesent pretium tellus in tortor viverra condimentum. Nullam dignissim
                              facilisis nisl, accumsan placerat justo ultricies vel. Vivamus finibus mi a neque pretium,
                              ut convallis dui lacinia. Morbi a rutrum velit. Curabitur sagittis quam quis consectetur
                              mattis. Aenean sit amet quam vel turpis interdum sagittis et eget neque. Nunc ante quam,
                              luctus et neque a, interdum iaculis metus. Aliquam vel ante mattis, placerat orci id,
                              vehicula quam. Suspendisse quis eros cursus, viverra urna sed, commodo mauris. Cras diam
                              arcu, fringilla a sem condimentum, viverra facilisis nunc. Curabitur vitae orci id nulla
                              maximus maximus. Nunc pulvinar sollicitudin molestie.</p>
                      </div>
                  </div>
                  <div class="blog-comment-area">
                      <div class="blog-comment-count"><h3>0 comments</h3></div>
                      <div class="comments">
                          <form method="POST" action="">
                              <div class="comment-text">
                                  <h4>Add comment</h4>
                              </div>
                              <div class="row">
                                  <div class="col-lg-6">
                                      <input type="text" name="author" id="author" class="input-full"
                                             placeholder="Name" value="">
                                  </div>
                                  <div class="col-lg-6">
                                      <input type="email" name="email" id="email" class="input-full"
                                             placeholder="Email" value="">
                                  </div>
                                  <div class="col-sm-12 col-md-12 col-lg-12">
                                      <div class="comment-textarea">
                                          <textarea name="body" id="body" class="input-full"
                                                    placeholder="Message"></textarea>
                                      </div>
                                  </div>
                                  <div class="col-md-12">
                                      <p class="form-descpiption">Please note, comments must be approved before they are published</p>
                                  </div>
                                  <div class="col-lg-12">
                                      <div class="send-button">
                                          <input type="submit" value="Post comment">
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
              <div class="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                  <h2 class="blog-right-module-title"><span>newsletter</span></h2>
                  <form action="" method="POST" class="newsletter">
                      <input type="email" value="" placeholder="email@example.com" name="sub_email"
                             class="input-full">
                      <button type="submit" class="button-subscribe" name="subscribe"
                              value="Subscribe">Subscribe
                      </button>
                  </form>
                  <div class="latest-posts">
                      <h3 class="blog-right-module-title">
                          <span>Recent Posts</span>
                      </h3>
                      <div class="recent-post">
                          <div class="single-blog-post">
                              <a href="/#blog" class="blog-img img1"></a>
                              <div class="post-sidebar-info">
                                  <h6><a href="/#blog">Martin Jerry</a></h6>
                                  <span>Boot Experts</span>
                                  <span>2016-05-25</span>
                              </div>
                          </div>
                          <div class="single-blog-post">
                               <a href="/#blog" class="blog-img img2"></a>
                              <div class="post-sidebar-info">
                                  <h6><a href="/#blog">Praesent ornare tortor</a></h6>
                                  <span>Boot Experts</span>
                                  <span>2016-05-25</span>
                              </div>
                          </div>
                          <div class="single-blog-post">
                               <a href="/#blog" class="blog-img img3"></a>
                              <div class="post-sidebar-info">
                                  <h6><a href="/#blog">william eto</a></h6>
                                  <span>Boot Experts</span>
                                  <span>2016-05-25</span>
                              </div>
                          </div>
                          <div class="single-blog-post">
                            <a href="/#blog" class="blog-img img4"></a>
                            <div class="post-sidebar-info">
                                <h6><a href="/#blog">Praesent ornare tortor</a></h6>
                                <span>Boot Experts</span>
                                <span>2016-05-25</span>
                            </div>
                        </div>
                      </div>
                      </div>
              </div>
            </div>
      </div>`

  this.init = () => {
    return elem
  }
}

let blog = new Blog()
let title = blog.title

export default blog
export { title }