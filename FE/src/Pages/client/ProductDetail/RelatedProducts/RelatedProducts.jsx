import { Empty } from "antd";
import ProductItem from "../../../../components/ProductItem/ProductItem";

const RelatedProducts = ({ data = [] }) => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mr-auto">
            <div className="section-title">
              <h2 className="title">
                Sản phẩm  <span> liên quan </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-12">
          {data.slice(0, 4).map((item) => (
            <div className="tw-col-span-4" key={item.id}>
              <ProductItem data={item} />
            </div>
          ))}

          {data.length === 0 && (
            <Empty className="tw-mx-auto tw-col-span-12 tw-my-20" />
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
