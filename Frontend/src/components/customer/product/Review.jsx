import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Star, Edit2, Trash2, Send, User } from "lucide-react";
import apiService from "../../../services/api";
const Review = (props) => {
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [reviews, setReviews] = useState([]);
  // Giả lập auth từ props
  const auth = useSelector((state) => state.auth);

  // Sắp xếp reviews để comment của user đăng nhập lên đầu
  const sortedReviews = [...reviews].sort((a, b) => {
    if (a.customer?._id === auth.id) return -1;
    if (b.customer?._id === auth.id) return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const userHasReviewed = reviews.some(
    (review) => review.customer?._id === auth.id,
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService
      .postReview(props.productInfo._id, userComment, userRating)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    setUserComment("");
    setUserRating(5);
  };

  const handleUpdate = (reviewId) => {
    apiService
      .putReview(reviewId, props.productInfo._id, editComment, editRating)
      .then((res) => {
        // console.log(res.data);
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    setEditingId(null);
  };

  const handleDelete = (reviewId) => {
    apiService
      .deleteReview(reviewId)
      .then((res) => {
        // console.log(res.data);
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  useEffect(() => {
    setReviews(props?.productInfo?.reviews ? props.productInfo.reviews : []);
  }, [props]);

  const StarRating = ({ rating, onRatingChange, isEditable = false }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          className={`cursor-pointer ${
            star <= rating ? "fill-[#FF3D00] text-[#FF3D00]" : "text-gray-300"
          }`}
          onClick={() => isEditable && onRatingChange(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="mx-auto w-full p-4">
      {/* Form thêm review mới */}
      {!userHasReviewed && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-lg bg-white p-4 shadow"
        >
          <h3 className="mb-4 text-lg font-semibold">Viết đánh giá của bạn</h3>
          <div className="mb-4">
            <StarRating
              rating={userRating}
              onRatingChange={setUserRating}
              isEditable={true}
            />
          </div>
          <div className="mb-4">
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-[#FF3D00]"
              rows="3"
              placeholder="Nhập đánh giá của bạn..."
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-[#FF3D00] px-4 py-2 text-white hover:bg-[#FF5722]"
          >
            <Send size={16} />
            Gửi đánh giá
          </button>
        </form>
      )}

      {/* Danh sách reviews */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review._id} className="rounded-lg bg-white p-4 shadow">
            {editingId === review._id ? (
              // Form chỉnh sửa
              <div className="space-y-4">
                <StarRating
                  rating={editRating}
                  onRatingChange={setEditRating}
                  isEditable={true}
                />
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(review._id)}
                    className="rounded-lg bg-[#FF3D00] px-3 py-1 text-white hover:bg-[#FF5722]"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded-lg bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              // Hiển thị review
              <>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {review.customer?.name ? (
                      <span className="font-semibold">
                        {review.customer.name}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-600">
                        <User size={16} />
                        <span>Ẩn danh</span>
                      </div>
                    )}
                  </div>
                  {review.customer?._id === auth.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(review._id);
                          setEditRating(review.rating);
                          setEditComment(review.comment);
                        }}
                        className="p-1 text-gray-500 hover:text-[#FF3D00]"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="p-1 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {formatDate(review.createdAt)}
                </div>
                <div className="my-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
