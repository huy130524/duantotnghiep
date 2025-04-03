const PageTitle = ({ productName }) => {
  return (
    <section className="page-title o-hidden tw-bg-[url(/images/bg/02.jpg)]">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <h1 className="mb-3">
              Product <span className="text-theme">Details</span>
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-4 justify-content-end">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="fas fa-home" />
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Shop</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {productName}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
