import ProductItem from "../../../../components/ProductItem/ProductItem";

const ProductLatest = ({ data = [] }) => {
  return (
    <section>
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-8 col-md-12 ml-auto mr-auto">
            <div className="section-title">
              <h2 className="title">
                New <span>Arrivals</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="grid row columns-3">
              {data.slice(0, 6).map((it) => (
                <ProductItem key={it.id} data={it} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLatest;
