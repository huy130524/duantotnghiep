import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api/api";
import { getImageUrl2 } from "../../../../utils/image";

const Banner = () => {
  const carouselRef = useRef(null);

  const { data } = useQuery({
    queryKey: ["BANNER"],
    queryFn: () => api.get("/banners"),
  });

  return (
    <section>
      <div className="container tw-mt-20">
        <div className="tw-relative tw-group">
          <Carousel ref={carouselRef} draggable arrows={false}>
            {data?.map((it) => (
              <div className="tw-h-[400px] tw-outline-none" key={it.id}>
                <img
                  src={getImageUrl2(it.image.slice(1))}
                  alt="Banner"
                  className="tw-w-full tw-h-full tw-object-cover tw-rounded-md tw-block"
                />
              </div>
            ))}
          </Carousel>

          <div
            className="custom-prev-arrow tw-absolute tw-left-5 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-z-10 tw-cursor-pointer tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity"
            onClick={() => {
              carouselRef.current?.prev();
            }}
          >
            <LeftOutlined className="tw-text-white tw-opacity-65 hover:tw-opacity-100 tw-text-xl" />
          </div>

          <div
            className="custom-next-arrow tw-absolute tw-right-5 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-z-10 tw-cursor-pointer tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity"
            onClick={() => {
              carouselRef.current?.next();
            }}
          >
            <RightOutlined className="tw-text-white tw-opacity-65 hover:tw-opacity-100 tw-text-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
