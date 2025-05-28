import ProductItem from "../../../../components/ProductItem/ProductItem";

const ProductLatest = ({ data = [] }) => {
  return (
    <section>
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-8 col-md-12 ml-auto mr-auto">
            <div className="section-title">
              <h2 className="title">
                Sản Phẩm <span>Mới </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="tw-grid tw-grid-cols-3 tw-gap-6">
          {data.slice(0, 6).map((it) => (
            <ProductItem key={it.id} data={it} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductLatest;
