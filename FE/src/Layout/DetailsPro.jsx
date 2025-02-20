import React from 'react'

const DetailsPro = () => {
  return (
    <div>
<div>


    <div className="search">
      <button id="btn-search-close" className="btn-search-close" aria-label="Close search form"><i className="flaticon-cancel" />
      </button>
      <form className="search-form">
        <input className="search-input" name="search" type="search" placeholder="drones" /> <span className="search-info">Hit enter to search or ESC to close</span>
      </form>
    </div>
    {/*header end*/}
    {/*page title start*/}
    <section className="page-title o-hidden" data-bg-img="images/bg/02.jpg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <h1 className="mb-3">Product <span className="text-theme">Details</span></h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-4 justify-content-end">
                <li className="breadcrumb-item"><a href="index.html"><i className="fas fa-home" /></a>
                </li>
                <li className="breadcrumb-item"><a href="#">Shop</a>
                </li>
                <li className="breadcrumb-item"><a href="#">Product Single</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Product Single 2</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
    {/*page title end*/}
    {/*body content start*/}
    <div className="page-content">
      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="row">          
                <div className="col-sm-9 order-sm-12">
                  <div className="slick3">
                    <div className="item-slick3" data-thumb="images/product-thumb/02.jpg">
                      <img className="img-fluid w-100" src="images/product/02.jpg" alt />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 order-sm-1">            
                  <div className="slick3-dots-main product-details2" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 md-mt-5">
              <div className="product-details">
                <h4>
                  Boxy Jacket Sleeve
                </h4>
                <div className="product-price my-4"> <span className="mr-3"> $179.99 <del>$279.00</del></span>
                  <span className="review-rating">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="far fa-star" />
                    <i className="far fa-star" />
                  </span>
                </div>
                <p>Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. suscipit risus nec eleifend. Pellentesque eu quam sem, ac malesuada leo sem quam pellente. Awesome sliders give you the opportunity to showcase your content.</p>
                <div className="row my-4">
                  <div className="col-sm-4">
                    <ul className="product-meta list-unstyled">
                      <li>
                        <h6 className="mb-2 text-black">Size</h6>
                        <span>
                          <select className="form-control">
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                          </select>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-8 xs-mt-3">
                    <div className="filter-color">
                      <h6 className="mb-2 text-black">Color</h6>
                      <ul className="list-inline">
                        <li>
                          <input type="checkbox" name="color-filter1" id="color-filter1" className="checkbox-color-filter" />
                          <label htmlFor="color-filter1" className="color-filter" data-bg-color="#3cb371" />
                        </li>
                        <li>
                          <input type="checkbox" name="color-filter2" id="color-filter2" className="checkbox-color-filter" />
                          <label htmlFor="color-filter2" className="color-filter" data-bg-color="#4876ff" />
                        </li>
                        <li>
                          <input type="checkbox" name="color-filter3" id="color-filter3" className="checkbox-color-filter" />
                          <label htmlFor="color-filter3" className="color-filter" data-bg-color="#000" />
                        </li>
                        <li>
                          <input type="checkbox" name="color-filter4" id="color-filter4" className="checkbox-color-filter" />
                          <label htmlFor="color-filter4" className="color-filter" data-bg-color="#dddddd" />
                        </li>
                        <li>
                          <input type="checkbox" name="color-filter5" id="color-filter5" className="checkbox-color-filter" />
                          <label htmlFor="color-filter5" className="color-filter" data-bg-color="#ee4000" />
                        </li>
                        <li>
                          <input type="checkbox" name="color-filter6" id="color-filter6" className="checkbox-color-filter" />
                          <label htmlFor="color-filter6" className="color-filter" data-bg-color="#ffc300" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> 
                <div className="row my-4 align-items-end no-gutters">
                  <div className="col-sm-6">
                    <div>
                      <h6 className="mb-2 text-black">Quantity</h6>  
                      <button className="btn-product btn-product-up"> <i className="fas fa-minus" />
                      </button>            
                      <input className="form-product" type="number" name="form-product" defaultValue={1} />
                      <button className="btn-product btn-product-down"> <i className="fas fa-plus" />
                      </button>              
                    </div> 
                  </div>
                  <div className="col-sm-6">
                    <button className="btn btn-theme btn-iconic xs-mt-3">Add to Cart <i className="fa fa-shopping-cart ml-2" />
                    </button>
                  </div>
                </div>           
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*tab start*/}
      <section className="grey-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tab text-center">
                {/* Nav tabs */}
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist"> <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#tab3-1" role="tab" aria-selected="true">Description</a>
                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#tab3-2" role="tab" aria-selected="false">Additional information</a>
                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#tab3-3" role="tab" aria-selected="false">Reviews (1)</a>
                  </div>
                </nav>
                {/* Tab panes */}
                <div className="tab-content text-left">
                  <div role="tabpanel" className="tab-pane fade show active" id="tab3-1">
                    <h5 className="mb-3">Product <span className="text-theme">Description</span></h5>
                    <p className="lead mb-0">ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat Praesent pharetra, justo ut scelerisque mattis, leo quam aliquet diam, congue laoreet elit metus eget diam. Proin ac metus diam. In quis scelerisque velit. Proin pellentesque neque ut scelerisque dapibus. Praesent elementum feugiat dignissim. Nunc placerat mi id nisi interdum mollis. Praesent pharetra, justo ut scelerisque mattis, leo quam aliquet diam, nisi interdum mollis. Praesent pharetra, justo ut scelerisque mattis, leo quam aliquet diam.</p>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="tab3-2">
                    <h5 className="mb-3">Additional <span className="text-theme">information</span></h5>
                    <table className="table table-striped table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td>Size</td>
                          <td>Small, Medium, Large &amp; Extra Large</td>
                        </tr>
                        <tr>
                          <td>Color</td>
                          <td>Read, Blue, Green &amp; Black</td>
                        </tr>
                        <tr>
                          <td>Chest</td>
                          <td>38 inches</td>
                        </tr>
                        <tr>
                          <td>Waist</td>
                          <td>20 cm</td>
                        </tr>
                        <tr>
                          <td>Length</td>
                          <td>35 cm</td>
                        </tr>
                        <tr>
                          <td>Fabric</td>
                          <td>Cotton, Silk &amp; Synthetic</td>
                        </tr>
                        <tr>
                          <td>Warranty</td>
                          <td>6 Months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="tab3-3">
                    <h5 className="mb-3">Product <span className="text-theme">Reviews (2) </span></h5>
                    <div className="media-holder review-list">
                      <div className="media">
                        <img className="img-center rounded-circle mr-3" alt="image" src="images/product-thumb/01.jpg" />
                        <div className="media-body">
                          <h6>John Glemean</h6>
                          <p>The sweeping the cloud what might be right for you may not be right for some here is the story of a man named Brady who was busy with three right for you may not be right.</p> <span className="review-rating">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                          </span>
                        </div>
                      </div>
                      <div className="media mt-5">
                        <img className="img-center rounded-circle mr-3" alt="image" src="images/product-thumb/02.jpg" />
                        <div className="media-body">
                          <h6>John Glemean</h6>
                          <p>The sweeping the cloud what might be right for you may not be right for some here is the story of a man named Brady who was busy with three right for you may not be right.</p> <span className="review-rating">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="post-comments mt-5 pos-r">
                      <div className="section-title mb-3">
                        <h5>Add <span className="text-theme">REVIEW</span></h5>
                      </div>
                      <form id="contact-form" method="post" action="https://themeht.com/template/oveltyshop/html/ltr/contact.php">
                        <div className="messages" />
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Name</label>
                              <input id="form_name" type="text" name="name" className="form-control" placeholder="Type name" required="required" data-error="Name is required." />
                              <div className="help-block with-errors" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Email Address</label>
                              <input id="form_email" type="email" name="email" className="form-control" placeholder="Type Email" required="required" data-error="Valid email is required." />
                              <div className="help-block with-errors" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <select className="form-control">
                                <option value>Rating -- Select</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Comment</label>
                              <textarea id="form_message" name="message" className="form-control" placeholder="Type Comment" rows={4} required="required" data-error="Please,leave us a message." defaultValue={""} />
                              <div className="help-block with-errors" />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <button className="btn btn-theme btn-iconic"><span>Comment <i className="fas fa-long-arrow-alt-right" /></span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*tab end*/}
      {/*product start*/}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mr-auto">
              <div className="section-title">
                <h2 className="title">Related <span>Products</span></h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="owl-carousel no-pb slide-arrow-2" data-dots="false" data-nav="true" data-items={4} data-lg-items={3} data-md-items={2} data-sm-items={2} data-margin={30} data-autoplay="true">
                <div className="item">
                  <div className="product-item">
                    <div className="product-img">
                      <img className="img-fluid" src="images/product/01.jpg" alt />
                      <div className="product-overlay">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#"> <i className="far fa-heart" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="fas fa-signal" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-desc"> <a href="product-detail.html" className="product-name">
                        Curvas Cap
                      </a>
                      <span className="product-price">
                        $22.00
                      </span> 
                    </div>
                    <div className="product-btn">
                      <button className="btn btn-theme btn-block"><span>Add to Cart</span>  <i className="fas fa-shopping-cart" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="product-item">
                    <div className="product-img">
                      <img className="img-fluid" src="images/product/02.jpg" alt />
                      <div className="product-overlay">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#"> <i className="far fa-heart" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="fas fa-signal" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-desc"> <a href="product-detail.html" className="product-name">
                        Curvas Cap
                      </a>
                      <span className="product-price">
                        $22.00
                      </span> 
                    </div>
                    <div className="product-btn">
                      <button className="btn btn-theme btn-block"><span>Add to Cart</span>  <i className="fas fa-shopping-cart" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="product-item">
                    <div className="product-img">
                      <img className="img-fluid" src="images/product/03.jpg" alt />
                      <div className="product-overlay">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#"> <i className="far fa-heart" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="fas fa-signal" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-desc"> <a href="product-detail.html" className="product-name">
                        Curvas Cap
                      </a>
                      <span className="product-price">
                        $22.00
                      </span> 
                    </div>
                    <div className="product-btn">
                      <button className="btn btn-theme btn-block"><span>Add to Cart</span>  <i className="fas fa-shopping-cart" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="product-item">
                    <div className="product-img">
                      <img className="img-fluid" src="images/product/04.jpg" alt />
                      <div className="product-overlay">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#"> <i className="far fa-heart" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="fas fa-signal" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-desc"> <a href="product-detail.html" className="product-name">
                        Curvas Cap
                      </a>
                      <span className="product-price">
                        $22.00
                      </span> 
                    </div>
                    <div className="product-btn">
                      <button className="btn btn-theme btn-block"><span>Add to Cart</span>  <i className="fas fa-shopping-cart" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="product-item">
                    <div className="product-img">
                      <img className="img-fluid" src="images/product/05.jpg" alt />
                      <div className="product-overlay">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#"> <i className="far fa-heart" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="far fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="#"> <i className="fas fa-signal" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-desc"> <a href="product-detail.html" className="product-name">
                        Curvas Cap
                      </a>
                      <span className="product-price">
                        $22.00
                      </span> 
                    </div>
                    <div className="product-btn">
                      <button className="btn btn-theme btn-block"><span>Add to Cart</span>  <i className="fas fa-shopping-cart" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*product end*/}
      {/*newsletter start*/} 
      <section className="theme-bg py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <h2 className="title">News<span>letter</span></h2>
            </div>
            <div className="col-lg-8 col-md-12 md-mt-3">
              <div className="subscribe-form">
                <form id="mc-form" className="group row align-items-center">
                  <div className="col-sm-8">
                    <input type="email" defaultValue name="EMAIL" className="email box-shadow" id="mc-email" placeholder="Email Address" required />
                  </div>
                  <div className="col-sm-4 xs-mt-1">
                    <input className="btn btn-white" type="submit" name="subscribe" defaultValue="Subscribe" />
                  </div>
                  <label htmlFor="mc-email" className="subscribe-message" />            
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*newsletter end*/} 
    </div>
    {/*body content end*/} 
    {/*footer start*/}
   
  </div>
 

</div>

   
  )
}

export default DetailsPro
