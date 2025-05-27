import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { api } from "../../../../api/api";

const Sidebar = ({ activeCategory, onCategoryChange }) => {
  const { data } = useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: async () => {
      const r = await api.get("/categories/home");
      return r;
    },
  });

  return (
    <div className="tw-w-[300px] sidebar">
      <div className="widget">
        <h5 className="widget-title mt-0">Categories</h5>
        <ul className="widget-categories list-unstyled">
          {data?.map((it) => (
            <li key={it.id} onClick={() => onCategoryChange(it.id)}>
              <a
                className={classNames("tw-cursor-pointer", {
                  "!tw-text-[#dc143c]": +activeCategory == it.id,
                })}
              >
                {it.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="widget">
        <h5 className="widget-title">Price</h5>
        <div className="widget-price text-right">
          <div id="slider-range" />
          <input type="text" id="amount" readOnly="" style={{ border: 0 }} />
        </div>
      </div> */}
      <div className="widget">
        <h5 className="widget-title">Color</h5>
        <div className="widget-color">
          <ul className="list-inline">
            <li className="grey">
              <a href="#" />
            </li>
            <li className="orange">
              <a href="#" />
            </li>
            <li className="yellow">
              <a href="#" />
            </li>
            <li className="green">
              <a href="#" />
            </li>
            <li className="teal">
              <a href="#" />
            </li>
            <li>
              <a href="#" />
            </li>
          </ul>
        </div>
      </div>
      <div className="widget">
        <h5 className="widget-title">Size</h5>
        <div className="widget-size">
          <ul className="list-inline">
            <li>
              <a href="#">S</a>
            </li>
            <li>
              <a href="#">M</a>
            </li>
            <li>
              <a href="#">L</a>
            </li>
            <li>
              <a href="#">XL</a>
            </li>
            <li>
              <a href="#">XXL</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
