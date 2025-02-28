import Review from "./Review";
import apiService from "../../../services/api";

const { useState, useEffect } = require("react");

const ProductView = (props) => {
  const [mainImg, setMainImg] = useState(
    props.productInfo?.imageUrl ? props.productInfo?.imageUrl[0] : "",
  );
  const [color, setColor] = useState("");
  const [sizeOfColor, setSizeOfColor] = useState([]);
  const [size, setSize] = useState("");

  const [isShowReview, setIsShowReview] = useState(false);

  const colorSummary = {
    Black: "#000000",
    Gray: "#808080",
    Orange: "#FFA500",
    Red: "#FF0000",
    Yellow: "#FFFF00",
    Green: "#008000",
    Blue: "#0000FF",
    Purple: "#800080",
    Pink: "#FFC0CB",
    White: "#FFFFFF",
    Gold: "#FFD700",
  };
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAddToCart = () => {
    apiService
      .postCarts(props?.productInfo?._id, 1, color, size)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    setMainImg(
      props.productInfo?.imageUrl ? props.productInfo?.imageUrl[0] : "",
    );
  }, [props]);

  return (
    <div className="mx-auto my-10 max-w-2xl p-4 max-lg:mx-auto lg:max-w-6xl">
      <div className="grid grid-cols-1 items-start gap-8 max-lg:gap-16 lg:grid-cols-2">
        <div className="top-0 w-full text-center lg:sticky">
          <div className="lg:h-[560px]">
            <img
              src={mainImg}
              alt="Product"
              className="h-full w-full rounded-md object-cover object-top lg:w-11/12"
            />
          </div>

          <div className="mx-auto mt-4 flex flex-wrap justify-center gap-4">
            {props?.productInfo?.imageUrl?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Product1"
                className="w-16 cursor-pointer rounded-md outline"
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        </div>

        <div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {props.productInfo.name}
            </h2>
          </div>

          <hr className="my-8" />

          <div className="flex flex-wrap items-start gap-4">
            <div>
              {props.productInfo.promotionalPrice !== null ? (
                <>
                  <p className="text-4xl font-bold text-gray-800">
                    {formatPrice(props.productInfo.promotionalPrice)} đ
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    <strike>{formatPrice(props.productInfo.price)} đ</strike>
                  </p>
                </>
              ) : (
                <p className="text-4xl font-bold text-gray-800">
                  {formatPrice(props.productInfo.price)} đ
                </p>
              )}
            </div>

            <div className="ml-auto flex flex-wrap gap-4">
              <button
                type="button"
                className="flex items-center rounded-md bg-pink-100 px-2.5 py-1.5 text-xs text-pink-600"
              >
                <svg
                  className="mr-1 w-3"
                  fill="currentColor"
                  viewBox="0 0 14 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                {props.productInfo.totalRate}
              </button>
              <button
                type="button"
                className="flex items-center rounded-md bg-gray-100 px-2.5 py-1.5 text-xs text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 w-3"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z"
                    data-original="#000000"
                  />
                  <path
                    d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z"
                    data-original="#000000"
                  />
                </svg>
                {props?.productInfo?.reviews?.length} Reviews
              </button>
            </div>
          </div>

          <hr className="my-8" />

          <div>
            <h3 className="text-xl font-bold text-gray-800">Chọn màu</h3>
            <div className="mt-4 flex flex-wrap gap-4">
              {props?.productInfo?.colorSummary?.map((colorObject) => (
                <button
                  key={colorObject.color}
                  type="button"
                  className={`h-10 w-10 shrink-0 rounded-md border ${color !== colorObject.color ? "border-black" : "border-[#FF3D00]"} hover:border-[#FF3D00]`}
                  style={{ backgroundColor: colorSummary[colorObject.color] }}
                  onClick={() => {
                    setColor(colorObject.color);
                    setSizeOfColor(colorObject.sizes);
                    setSize("");
                  }}
                />
              ))}
            </div>
          </div>

          <hr className="my-8" />

          <div>
            <h3 className="text-xl font-bold text-gray-800">Chọn Size</h3>
            <div className="mt-4 flex flex-wrap gap-4">
              {sizeOfColor.map((sizeObject) => (
                <button
                  key={sizeObject.size}
                  onClick={() => setSize(sizeObject.size)}
                  type="button"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border text-sm hover:border-[#FF3D00] ${sizeObject.size !== size ? "border-black" : "border-[#FF3D00]"}`}
                >
                  {sizeObject.size}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-8" />

          <div className="flex justify-center">
            <button
              onClick={() => handleAddToCart()}
              type="button"
              className="min-w-[200px] rounded-md bg-[#FF3D00] px-4 py-3 text-sm text-white"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-4xl">
        <ul className="flex border-b">
          <li
            onClick={() => setIsShowReview(false)}
            className={
              !isShowReview
                ? "cursor-pointer border-b-2 border-gray-800 bg-gray-100 px-8 py-3 text-sm text-gray-800 transition-all"
                : "cursor-pointer px-8 py-3 text-sm text-gray-500 transition-all hover:bg-gray-100"
            }
          >
            Mô tả
          </li>
          <li
            onClick={() => setIsShowReview(true)}
            className={
              isShowReview
                ? "cursor-pointer border-b-2 border-gray-800 bg-gray-100 px-8 py-3 text-sm text-gray-800 transition-all"
                : "cursor-pointer px-8 py-3 text-sm text-gray-500 transition-all hover:bg-gray-100"
            }
          >
            Reviews
          </li>
        </ul>

        {isShowReview && <Review productInfo={props.productInfo} />}

        {!isShowReview && (
          <>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">
                Mô tả sản phẩm
              </h3>
              <p className="mt-4 text-sm text-gray-500">
                {props.productInfo.description}
              </p>
            </div>

            <ul className="mt-6 list-disc space-y-3 pl-4 text-sm text-gray-500">
              <li>Tên sản phẩm: {props.productInfo.name}</li>
              <li>Giá: {formatPrice(props.productInfo.price)} đ</li>
              <li>Số lượng màu: {props.productInfo.colorSummary?.length}</li>
              {props?.productInfo?.imageUrl?.map((colorObject) => (
                <img
                  key={colorObject}
                  src={colorObject}
                  alt="Product"
                  className="rounded-md object-cover object-top"
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductView;
