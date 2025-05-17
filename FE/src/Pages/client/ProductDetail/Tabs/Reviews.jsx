import { getImageUrl } from "../../../../utils/image";
import dayjs from "dayjs";

const Reviews = ({ comments }) => {
  return (
    <>
      <h5 className="mb-3">
        Product{" "}
        <span className="text-theme">
          Reviews {comments.length > 0 && `(${comments.length})`}{" "}
        </span>
      </h5>

      <div className="media-holder review-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="media [&:last-child]:tw-border-none tw-mb-5 [&:not(:last-child)]:tw-pb-5 [&:not(:last-child)]:tw-border-b tw-border-x-0 tw-border-t-0 tw-border-solid tw-border-gray-200"
            >
              <img
                className="img-center rounded-circle mr-3 tw-w-12 tw-h-12 tw-object-cover"
                alt={comment.user.fullname}
                src={
                  comment.user.avatar
                    ? getImageUrl(comment.user.avatar)
                    : "/images/avatar-default.jpg"
                }
              />
              <div className="media-body">
                <h6 className="!tw-flex tw-items-center tw-gap-x-2">
                  <p className="!tw-m-0">{comment.user.fullname} </p>
                  <p className="tw-text-gray-500 tw-text-lg !tw-m-0">&bull;</p>
                  <p className="tw-text-xs tw-text-gray-400 tw-font-normal !tw-m-0">
                    {dayjs(comment.created_at).format("DD/MM/YYYY, HH:mm")}
                  </p>
                </h6>

                <p className="tw-whitespace-pre-line">{comment.content}</p>

                <div className="tw-flex tw-items-center tw-gap-x-3 tw-mb-2">
                  <span className="review-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={
                          star <= comment.rating ? "fas fa-star" : "far fa-star"
                        }
                      />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="tw-text-center tw-py-4">
            <p className="tw-text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
