import { Link } from "react-router-dom";

const PageTitle = ({ keyword, category }) => {
  return (
    <section className="page-title o-hidden tw-bg-[url(images/bg/02.jpg)]">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12">
            <h1 className="mb-3">
              {keyword ? (
                <>
                  Tìm kiếm  &quot;
                  <span className="text-theme">{keyword}</span>&quot;
                </>
              ) : category ? (
                category
              ) : (
                "All Products"
              )}
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-4 justify-content-end">
                <li className="breadcrumb-item">
                  <Link to="/" href="index.html">
                    <i className="fas fa-home" />
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Shop</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">ProductS</a>
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
