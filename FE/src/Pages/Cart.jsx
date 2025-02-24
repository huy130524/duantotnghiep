import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

const Cart = () => {
  return (
   
<div>
<Header />
  <section className="page-title o-hidden" data-bg-img="images/bg/02.jpg">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12 col-md-12">
          <h1 className="mb-3">Product <span className="text-theme">Cart</span></h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-4 justify-content-end">
              <li className="breadcrumb-item"><a href="index.html"><i className="fas fa-home" /></a>
              </li>
              <li className="breadcrumb-item"><a href="#">Shop</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Product Cart</li>
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
          <div className="col-md-12">
            <div className="table-responsive">
              <table className="table cart-table text-center">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>                
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="cart-img">
                        <a href="#">
                          <img className="img-center" alt src="images/product-thumb/01.jpg" />
                        </a>
                      </div>
                    </td>
                    <td><a href="#">Jacket</a>
                    </td>
                    <td>$ 122.00</td>
                    <td>
                      <div className="cart-action">
                        <button className="btn-product btn-product-up"> <i className="fas fa-minus" />
                        </button>
                        <input className="form-product" type="number" name="form-product" defaultValue={1} />
                        <button className="btn-product btn-product-down"> <i className="fas fa-plus" />
                        </button>                    
                      </div>
                    </td>
                    <td>
                      <button type="submit" className="btn-delet"><i className="far fa-trash-alt" />
                      </button>
                    </td>                
                    <td>$ 122.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cart-img">
                        <a href="#">
                          <img className="img-center" alt src="images/product-thumb/02.jpg" />
                        </a>
                      </div>
                    </td>
                    <td><a href="#">Shirt</a>
                    </td>
                    <td>$ 122.00</td>
                    <td>
                      <div className="cart-action">
                        <button className="btn-product btn-product-up"> <i className="fas fa-minus" />
                        </button>
                        <input className="form-product" type="number" name="form-product" defaultValue={1} />
                        <button className="btn-product btn-product-down"> <i className="fas fa-plus" />
                        </button> 
                      </div>
                    </td>
                    <td>
                      <button type="submit" className="btn-delet"><i className="far fa-trash-alt" />
                      </button>
                    </td>                
                    <td>$ 122.00</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cart-img">
                        <a href="#">
                          <img className="img-center" alt src="images/product-thumb/03.jpg" />
                        </a>
                      </div>
                    </td>
                    <td><a href="#">Curvas Cap</a>
                    </td>
                    <td>$ 122.00</td>
                    <td>
                      <div className="cart-action">
                        <button className="btn-product btn-product-up"> <i className="fas fa-minus" />
                        </button>
                        <input className="form-product" type="number" name="form-product" defaultValue={1} />
                        <button className="btn-product btn-product-down"> <i className="fas fa-plus" />
                        </button> 
                      </div>
                    </td>
                    <td>
                      <button type="submit" className="btn-delet"><i className="far fa-trash-alt" />
                      </button>
                    </td>                
                    <td>$ 122.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 text-right">
                <button className="btn btn-border">Cancel</button>
                <button className="btn btn-theme">Update Cart</button>
              </div>
            </div>
            <div className="row align-items-end sm-mt-3">
              <div className="col-md-7">
                <h5>Coupon Code</h5>
                <p>Enter Your Coupon Code</p>
                <form className="form-inline coupon-form">
                  <div className="form-group">
                    <input type="text" className="form-control" />
                    <button className="btn btn-theme" type="submit">Apply Coupon</button>
                  </div>
                </form>
              </div>
              <div className="col-md-5 text-md-right">
                <div className="checkout-box white-bg box-shadow mt-5">
                  <ul className="list-unstyled mb-3">
                    <li className="mb-2"><span> Sub Total : </span> $ 2404.00</li>
                    <li className="mb-2"><span> VAT (20%) : </span> $ 498.00</li>
                    <li><span><strong className="cart-total"> Total :</strong></span>  <strong className="cart-total">$ 2830.00 </strong>
                    </li>
                  </ul>
                  <button className="btn btn-sm btn-theme">Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
  </div>

  <Footer />
</div>

  )
}

export default Cart
