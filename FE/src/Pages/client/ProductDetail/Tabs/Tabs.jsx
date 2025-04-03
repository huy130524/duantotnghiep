const Tabs = ({ description }) => {
  return (
    <section className="grey-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="tab">
              {/* Nav tabs */}
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="nav-tab1"
                    data-toggle="tab"
                    href="#tab3-1"
                    role="tab"
                    aria-selected="true"
                  >
                    Description
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-tab2"
                    data-toggle="tab"
                    href="#tab3-2"
                    role="tab"
                    aria-selected="false"
                  >
                    Additional information
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-tab3"
                    data-toggle="tab"
                    href="#tab3-3"
                    role="tab"
                    aria-selected="false"
                  >
                    Reviews (2)
                  </a>
                </div>
              </nav>
              {/* Tab panes */}
              <div className="tab-content">
                <div
                  role="tabpanel"
                  className="tab-pane fade show active"
                  id="tab3-1"
                >
                  <h5 className="mb-3">
                    Product <span className="text-theme">Description</span>
                  </h5>
                  <p className="lead mb-0">{description}</p>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tab3-2">
                  <h5 className="mb-3">
                    Additional <span className="text-theme">information</span>
                  </h5>
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
                  <h5 className="mb-3">
                    Product <span className="text-theme">Reviews (2) </span>
                  </h5>
                  <div className="media-holder review-list">
                    <div className="media">
                      <img
                        className="img-center rounded-circle mr-3"
                        alt="image"
                        src="images/product-thumb/01.jpg"
                      />
                      <div className="media-body">
                        <h6>John Glemean</h6>
                        <p>
                          The sweeping the cloud what might be right for you may
                          not be right for some here is the story of a man named
                          Brady who was busy with three right for you may not be
                          right.
                        </p>
                        <span className="review-rating">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                        </span>
                      </div>
                    </div>
                    <div className="media mt-5">
                      <img
                        className="img-center rounded-circle mr-3"
                        alt="image"
                        src="images/product-thumb/02.jpg"
                      />
                      <div className="media-body">
                        <h6>John Glemean</h6>
                        <p>
                          The sweeping the cloud what might be right for you may
                          not be right for some here is the story of a man named
                          Brady who was busy with three right for you may not be
                          right.
                        </p>
                        <span className="review-rating">
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
                      <h5>
                        Add <span className="text-theme">REVIEW</span>
                      </h5>
                    </div>
                    <form
                      id="contact-form"
                      method="post"
                      action="https://themeht.com/template/oveltyshop/html/ltr/contact.php"
                    >
                      <div className="messages" />
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              id="form_name"
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Type name"
                              required="required"
                              data-error="Name is required."
                            />
                            <div className="help-block with-errors" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Email Address</label>
                            <input
                              id="form_email"
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Type Email"
                              required="required"
                              data-error="Valid email is required."
                            />
                            <div className="help-block with-errors" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <select className="form-control">
                              <option value="">Rating -- Select</option>
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
                            <textarea
                              id="form_message"
                              name="message"
                              className="form-control"
                              placeholder="Type Comment"
                              rows={4}
                              required="required"
                              data-error="Please,leave us a message."
                              defaultValue={""}
                            />
                            <div className="help-block with-errors" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button className="btn btn-theme btn-iconic">
                            <span>
                              Comment
                              <i className="fas fa-long-arrow-alt-right" />
                            </span>
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
  );
};

export default Tabs;
