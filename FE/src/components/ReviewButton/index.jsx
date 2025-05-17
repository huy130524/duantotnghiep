/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Modal, Rate, Input, message } from "antd";
import PropTypes from "prop-types";
import { getImageUrl } from "../../utils/image";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/api";

const { TextArea } = Input;

const ReviewButton = ({ orderId, orderDetails, refetch }) => {
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);

  const ratingMutation = useMutation({
    mutationKey: ["RATING_PRODUCT"],
    mutationFn: (data) => {
      const ratingPromises = data.map((it) => {
        return api.post(`/comments/send/${orderId}`, {
          product_id: it.productId,
          content: it.content,
          rating: it.stars,
        });
      });

      return Promise.all(ratingPromises);
    },
    onSuccess: () => {
      message.success("Gửi đánh giá thành công");
      setIsReviewModalVisible(false);
      refetch();
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi gửi đánh giá");
    },
  });

  const handleReviewClick = () => {
    const initialReviews = orderDetails.map((item) => ({
      productId: item.variant?.product?.id,
      productName: item.variant?.product?.name,
      productImage: item.variant?.product?.image,
      variantId: item.variant?.id,
      color: item.variant?.color?.name,
      size: item.variant?.size?.name,
      stars: 5,
      content: "",
    }));

    setReviews(initialReviews);
    setIsReviewModalVisible(true);
  };

  const handleSubmitReviews = async () => {
    const emptyReviews = reviews.filter((review) => !review.content);
    if (emptyReviews.length > 0) {
      message.warning("Vui lòng nhập nội dung đánh giá cho tất cả sản phẩm");
      return;
    }

    ratingMutation.mutate(reviews);
  };

  const handleRateChange = (value, index) => {
    const newReviews = [...reviews];
    newReviews[index].stars = value;
    setReviews(newReviews);
  };

  const handleContentChange = (e, index) => {
    const newReviews = [...reviews];
    newReviews[index].content = e.target.value;
    setReviews(newReviews);
  };

  return (
    <>
      <Button type="primary" onClick={handleReviewClick}>
        Đánh giá
      </Button>

      <Modal
        title="Đánh giá sản phẩm"
        open={isReviewModalVisible}
        onCancel={() => setIsReviewModalVisible(false)}
        onOk={handleSubmitReviews}
        width={800}
        okText="Gửi đánh giá"
        cancelText="Hủy"
        okButtonProps={{
          disabled: ratingMutation.isLoading,
          loading: ratingMutation.isLoading,
        }}
      >
        <div className="tw-max-h-[70vh] tw-overflow-y-auto tw-pr-2">
          {reviews.map((review, index) => (
            <div key={index} className="tw-border-b tw-border-gray-200 tw-py-4">
              <div className="tw-flex tw-items-center tw-gap-4">
                <div className="tw-w-16 tw-h-16">
                  <img
                    src={getImageUrl(review.productImage)}
                    alt={review.productName}
                    className="tw-w-full tw-h-full tw-object-cover"
                  />
                </div>

                <div className="tw-flex-1">
                  <p className="tw-font-medium tw-text-[16px] tw-mb-1">
                    {review.productName}
                  </p>
                  <p className="tw-text-gray-500 tw-text-[14px] tw-mb-1">
                    Màu: {review.color}, Size: {review.size}
                  </p>
                </div>
              </div>

              <div className="tw-mt-3">
                <div className="tw-flex tw-items-center tw-mb-2">
                  <span className="tw-mr-2 tw-text-[14px] tw-font-medium">
                    Đánh giá sao:
                  </span>
                  <Rate
                    value={review.stars}
                    onChange={(value) => handleRateChange(value, index)}
                  />
                </div>

                <div>
                  <p className="tw-mb-1 tw-text-[14px] tw-font-medium">
                    Nội dung đánh giá:
                  </p>
                  <TextArea
                    placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
                    rows={4}
                    value={review.content}
                    onChange={(e) => handleContentChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

ReviewButton.propTypes = {
  orderId: PropTypes.string.isRequired,
  orderDetails: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  refetch: PropTypes.func,
};

export default ReviewButton;
