import { useMemo } from "react";
import { getImageUrl } from "../../../../utils/image";
import { Select } from "antd";

const Content = ({ data }) => {
  const { uniqueColors, uniqueSizes } = useMemo(() => {
    const uniqueColors = [
      ...new Map(data?.product_variants.map((item) => [item.color_id, item])),
    ].map(([, item]) => ({
      color_id: item.color_id,
      color_code: item.color.color_code,
    }));

    const uniqueSizes = [
      ...new Map(data?.product_variants.map((item) => [item.size_id, item])),
    ].map(([, item]) => ({
      size_id: item.size_id,
      size_name: item.size.name,
    }));

    return {
      uniqueColors,
      uniqueSizes,
    };
  }, [data?.product_variants]);

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <div className="tw-flex tw-justify-center tw-items-center tw-h-full tw-border tw-border-solid tw-border-[#ececec] tw-rounded-md">
              <img
                className="img-fluid w-100 tw-block"
                src={getImageUrl(data?.image)}
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-7 col-md-12 md-mt-5">
            <div className="product-details">
              <h4>{data?.name}</h4>
              <div className="product-price my-4">
                <span className="mr-3">
                  {" "}
                  $179.99 <del>$279.00</del>
                </span>
                <span className="review-rating">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="far fa-star" />
                  <i className="far fa-star" />
                </span>
              </div>
              <ul className="portfolio-meta list-unstyled mb-4">
                <li>
                  <span> Categories :</span> {data?.category?.name}
                </li>
              </ul>
              <p>{data?.description}</p>
              <div className="row my-4">
                <div className="col-sm-4">
                  <ul className="product-meta list-unstyled">
                    <li>
                      <h6 className="mb-2 text-black">Size</h6>

                      <Select
                        options={uniqueSizes?.map((it) => ({
                          label: it.size_name,
                          value: it.size_id,
                        }))}
                        className="tw-w-24"
                      />
                    </li>
                  </ul>
                </div>
                <div className="col-sm-8 xs-mt-3">
                  <div className="filter-color">
                    <h6 className="mb-2 text-black">Color</h6>
                    <ul className="list-inline">
                      {uniqueColors?.map((it) => (
                        <li key={it.color_id}>
                          <input
                            type="checkbox"
                            name={`color-filter-${it.color_id}`}
                            id={`color-filter-${it.color_id}`}
                            className="checkbox-color-filter"
                          />
                          <label
                            htmlFor={`color-filter-${it.color_id}`}
                            className="color-filter"
                            data-bg-color={it.color_code}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row my-4 align-items-end">
                <div className="col-sm-6">
                  <div>
                    <h6 className="mb-2 text-black">Quantity</h6>
                    <button className="btn-product btn-product-up">
                      <i className="fas fa-minus" />
                    </button>
                    <input
                      className="form-product"
                      type="number"
                      name="form-product"
                      defaultValue={1}
                    />
                    <button className="btn-product btn-product-down">
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                </div>
                <div className="col-sm-6 xs-mt-3">
                  <div className="product-overlay">
                    <ul className="list-inline">
                      <li className="list-inline-item mb-0">
                        <a href="#">
                          {" "}
                          <i className="far fa-heart" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item mb-0">
                        <a href="#">
                          {" "}
                          <i className="far fa-eye" />{" "}
                        </a>
                      </li>
                      <li className="list-inline-item mb-0">
                        <a href="#">
                          {" "}
                          <i className="fas fa-signal" />{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <button className="btn btn-theme btn-iconic mt-3">
                Add to Cart <i className="fa fa-shopping-cart ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
