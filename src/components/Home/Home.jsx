import React, { useContext, useState } from "react";
import axios from "axios";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import toast from "react-hot-toast";

export default function Home() {
  let { addToCart, setCart } = useContext(CartContext);
  let { setWishlist, addToWishlist } = useContext(WishlistContext);
  let [page, setpage] = useState(1);
  const [wishlistState, setWishlistState] = useState({});

  const GetAllProducts = ({ queryKey }) => {
    const [, page] = queryKey;
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${page}`
    );
  };
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", page],
    queryFn: GetAllProducts,
    keepPreviousData: true,
  });

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      setCart(response.data);
      toast.success("Product added successfully to your cart", {
        duration: 5000,
        position: "bottom-left",
      });
    } else {
      toast.error("Error adding product. Please try again.", {
        duration: 5000,
        position: "bottom-left",
      });
    }
  }

  async function addWishlistProduct(productId) {
    let response = await addToWishlist(productId);
    if (response.data.status === "success") {
      setWishlist(response.data);
      setWishlistState((prev) => ({ ...prev, [productId]: true }));
      toast.success("Product added successfully to your wishlist", {
        duration: 5000,
        position: "bottom-left",
      });
    } else {
      toast.error("Error adding product. Please try again.", {
        duration: 5000,
        position: "bottom-left",
      });
    }
  }

  return (
    <div className="mt-14">
      {isLoading ? (
        <div className="flex bg-slate-300 justify-center items-center h-screen w-full">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-11/12 mx-auto">
          <MainSlider />
          <CategorySlider />

          {isError && (
            <h2 className="text-red-600 text-center">
              {error?.response?.data?.message || "Error loading products"}
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data?.data?.data?.map((product) => {
              let { _id, title, imageCover, price, category, ratingsAverage } = product;
              let categoryName = category?.name || "unknown-category";

              return (
                <div
                  key={_id}
                  className="hover:shadow-2xl transition-shadow duration-300 border rounded-md p-3"
                >
                  <Link to={`/ProductDetails/${_id}/${categoryName}`}>
                    <div className="p-2">
                      <img src={imageCover} alt={title} className="w-full h-40 object-cover" />
                      <h5 className="text-gray-500 text-sm">{categoryName}</h5>
                      <h2 className="text-lg font-bold">{title.split(" ").slice(0, 2).join(" ")}</h2>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{price} EGP</span>
                        <span className="flex items-center">
                          <i className="fa-solid fa-star text-yellow-300 mr-1"></i>
                          {ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center mt-3">
                    <i
                      onClick={() => addWishlistProduct(product._id)}
                      className={`fa-solid fa-heart text-2xl cursor-pointer ${wishlistState[product._id] ? "text-red-500" : "text-black"}`}
                    ></i>
                    <button
                      onClick={() => addProduct(_id)}
                      className="btn bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-5 mb-5">
<nav aria-label="Page navigation">
  <ul className="flex items-center -space-x-px h-8 text-sm">
    {/* Previous Button */}
    <li>
      <button
        onClick={() => setpage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={`flex items-center justify-center px-3 h-8 leading-tight border rounded-md ${
          page === 1
            ? "text-gray-400 cursor-not-allowed bg-gray-200"
            : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        <span className="sr-only">Previous</span>
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
    </li>

    {/* Page Numbers */}
    {new Array(data?.data?.metadata?.numberOfPages)
      .fill("")
      .map((_, i) => (
        <li key={i}>
          <button
            onClick={() => setpage(i + 1)}
            className={`cursor-pointer px-3 h-8 leading-tight border border-gray-300 rounded-md ${
              page === i + 1
                ? "text-white font-bold"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
            style={{
              backgroundColor:
                page === i + 1 ? "#0aad0a" : "white",
            }}
          >
            {i + 1}
          </button>
        </li>
      ))}

    {/* Next Button */}
    <li>
      <button
        onClick={() =>
          setpage((prev) =>
            Math.min(
              prev + 1,
              data?.data?.metadata?.numberOfPages
            )
          )
        }
        disabled={page === data?.data?.metadata?.numberOfPages}
        className={`flex items-center justify-center px-3 h-8 leading-tight border rounded-md ${
          page === data?.data?.metadata?.numberOfPages
            ? "text-gray-400 cursor-not-allowed bg-gray-200"
            : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        <span className="sr-only">Next</span>
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </li>
  </ul>
</nav>
</div>
        </div>
      )}
    </div>
  );
}



