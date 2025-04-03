import { Empty, Select } from "antd";
import ProductItem from "../../../../components/ProductItem/ProductItem";

const Content = ({ isSearch, data, isCategory, sortBy, onSortChange }) => {
  return (
    <div className="tw-flex-1">
      <div className="row mb-5 align-items-center">
        <div className="col-md-5">
          {/* <h5 className="text-capitalize mb-0">
                      Showing 1 to 18 of 20 total
                    </h5> */}
        </div>
        <div className="col-md-7 sm-mt-3 d-sm-flex justify-content-md-end align-items-center">
          {!isSearch && !isCategory && (
            <div className="sort-filter mr-4 d-flex align-items-center">
              <h5 className="mr-2">SORT BY :</h5>

              <Select
                value={sortBy}
                onChange={onSortChange}
                options={[
                  { label: "Product latest", value: "latest" },
                  { label: "Product oldest", value: "oldest" },
                  {
                    label: "Price from low to high",
                    value: "price_asc",
                  },
                  {
                    label: "Price from high to low",
                    value: "price_desc",
                  },
                ]}
                defaultValue="latest"
                className="tw-w-[170px]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="row">
        {data?.map((it) => (
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6" key={it.id}>
            <div className="tw-mb-8">
              <ProductItem data={it} />
            </div>
          </div>
        ))}

        {!data?.length && (
          <Empty className="tw-mx-auto tw-my-20" description="Empty product" />
        )}
      </div>

      {data?.length > 0 && (
        <nav aria-label="Page navigation" className="mt-5">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                <i className="fas fa-arrow-left" />
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                <i className="fas fa-arrow-right" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Content;
