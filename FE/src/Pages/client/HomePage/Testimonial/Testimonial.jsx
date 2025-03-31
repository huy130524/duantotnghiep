const Testimonial = () => {
  return (
    <section className="grey-bg text-center testimonial">
      <div className="container">
        <div className="row text-center">
          <div className="col-xl-8 col-lg-10 col-md-12 ml-auto mr-auto">
            <div className="tab">
              {/* Tab panes */}
              <div className="tab-content" id="nav-tabContent">
                <div
                  role="tabpanel"
                  className="tab-pane fade show active"
                  id="tab1-1"
                >
                  <div className="testimonial-content">
                    {" "}
                    <i className="fas fa-quote-left" />
                    <p>
                      Quae adipisci quam laudantium nulla modi, Consectetur
                      adipisicing elit, Totam mollitia incidunt vero cupiditate
                      obcaecati iusto tempora unde! Numquam officiis, adipisci
                      quam laudantium nulla modi.
                    </p>
                  </div>
                  <div className="testimonial-caption">
                    <h6>Kelly Rain</h6>
                    <label>- Manager</label>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tab1-2">
                  <div className="testimonial-content">
                    {" "}
                    <i className="fas fa-quote-left" />
                    <p>
                      Aaudantium Quae adipisci quam nulla modi, Consectetur
                      adipisicing elit, Totam mollitia incidunt vero cupiditate
                      obcaecati iusto tempora unde! Numquam officiis, adipisci
                      quam laudantium nulla modi.
                    </p>
                  </div>
                  <div className="testimonial-caption">
                    <h6>John Doe</h6>
                    <label>- Manager</label>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tab1-3">
                  <div className="testimonial-content">
                    {" "}
                    <i className="fas fa-quote-left" />
                    <p>
                      Numquam adipisci quam laudantium nulla modi, Consectetur
                      adipisicing elit, Totam mollitia incidunt vero cupiditate
                      obcaecati iusto tempora unde! officiis, adipisci quam
                      laudantium nulla modi.
                    </p>
                  </div>
                  <div className="testimonial-caption">
                    <h6>Jamy Lynn</h6>
                    <label>- Advisor</label>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="tab1-4">
                  <div className="testimonial-content">
                    {" "}
                    <i className="fas fa-quote-left" />
                    <p>
                      Consectetur buae adipisci quam laudantium nulla modi,
                      adipisicing elit, Totam mollitia incidunt vero cupiditate
                      obcaecati iusto tempora unde! Numquam officiis, adipisci
                      quam laudantium nulla modi.
                    </p>
                  </div>
                  <div className="testimonial-caption">
                    <h6>John Methew</h6>
                    <label>- Manager</label>
                  </div>
                </div>
              </div>
              {/* Nav tabs */}
              <nav>
                <div className="nav nav-tabs mt-5" id="nav-tab" role="tablist">
                  <a
                    className="nav-item nav-link active"
                    id="nav-tab1"
                    data-toggle="tab"
                    href="#tab1-1"
                    role="tab"
                    aria-selected="true"
                  >
                    <img
                      className="img-center"
                      src="images/thumbnail/01.png"
                      alt=""
                    />
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-tab2"
                    data-toggle="tab"
                    href="#tab1-2"
                    role="tab"
                    aria-selected="false"
                  >
                    <img
                      className="img-center"
                      src="images/thumbnail/02.png"
                      alt=""
                    />
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-tab3"
                    data-toggle="tab"
                    href="#tab1-3"
                    role="tab"
                    aria-selected="false"
                  >
                    <img
                      className="img-center"
                      src="images/thumbnail/01.png"
                      alt=""
                    />
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-tab4"
                    data-toggle="tab"
                    href="#tab1-4"
                    role="tab"
                    aria-selected="false"
                  >
                    <img
                      className="img-center"
                      src="images/thumbnail/02.png"
                      alt=""
                    />
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
