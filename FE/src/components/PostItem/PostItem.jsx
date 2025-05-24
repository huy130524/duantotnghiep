import { getImageUrl2 } from "../../utils/image";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const PostItem = ({ data }) => {
  return (
    <div className="tw-col-span-4">
      <div className="post tw-h-full">
        <div className="post-image">
          <img
            className="img-fluid w-100 tw-h-[240px] tw-object-cover"
            src={getImageUrl2(data.image)}
            alt=""
          />
          <div className="post-date">
            {dayjs(data.created_at).date()}{" "}
            <span>{dayjs(data.created_at).format("MMM")}</span>
          </div>
        </div>
        <div className="post-desc">
          <div className="post-title">
            <h5>
              <Link to={`/blog/${data.slug}`}>{data.title}</Link>
            </h5>
          </div>
          <p className="tw-line-clamp-4 tw-whitespace-pre-line">{data.desc}</p>
          <Link className="post-btn" to={`/blog/${data.slug}`}>
            Xem thêm
            <i className="ml-2 fas fa-long-arrow-alt-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
