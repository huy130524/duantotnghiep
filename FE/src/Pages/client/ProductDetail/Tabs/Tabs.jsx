import Reviews from "./Reviews";

const Tabs = ({ description, comments = [] }) => {
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
                    Reviews {comments.length > 0 && `(${comments.length})`}
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
                  <Reviews comments={comments} />
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
