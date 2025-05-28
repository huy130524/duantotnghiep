import { Link } from "react-router-dom";
import { getImageUrl } from "../../../../utils/image";

const CategoryList = ({ data = [] }) => {
  return (
    <section className="pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mr-auto">
            <div className="section-title">
              <h2 className="title">Danh Mục Sản Phẩm </h2>
            </div>
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-12 tw-gap-4">
          {data?.slice(0, 4).map((it) => (
            <Link
              to={`/products?category=${it.id}`}
              className="item tw-col-span-3"
              key={it.id}
            >
              <div className="product-item">
                <div className="product-img">
                  <img
                    className="img-fluid tw-h-[300px] tw-object-cover"
                    src={getImageUrl(it.image)}
                    alt=""
                  />
                </div>
                <div className="product-desc !tw-block !tw-py-3 !tw-translate-y-full">
                  {" "}
                  <p className="product-name tw-m-0 tw-text-center">
                    {it.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
