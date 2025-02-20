import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

export default function Products() {
  let { addToCart, setCart } = useContext(CartContext);
  let { setWishlist, addToWishlist } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState("");

   const [wishlistState, setWishlistState] = useState({}); 
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

  const GetAllProducts = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  };
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["product"],
    queryFn: GetAllProducts,
    keepPreviousData: true,
  });
  // Filter products based on search input
  const filteredProducts = data?.data?.data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div className="mt-14">
        {isLoading ? (
          <div className="flex bg-slate-300 justify-center items-center h-screen w-full">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="w-10/12 mx-auto mb-5">
            <form class="max-w-md mx-auto ">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <input
                  type="search"
                  id="default-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-3 mb-5 border border-gray-300 rounded focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                  placeholder="Search ..."
                  required
                />
              </div>
            </form>

            <Toaster />

            {isError && (
              <h2 className="text-red-600 text-center">
                {error?.response?.data?.message || "Error loading products"}
              </h2>
            )}

            <div className="flex flex-wrap">
              {filteredProducts.map((product) => {
                let {
                  _id,
                  title,
                  imageCover,
                  price,
                  category,
                  ratingsAverage,
                } = product;
                let categoryName = category?.name || "unknown-category";

                return (
                  <div
                    key={_id}
                    className="hover:shadow-2xl transition-shadow duration-300  lg:w-2/12 item md:w-3/12 overflow-hidden sm:w-6-12 w-full"
                  >
                    <Link to={`/ProductDetails/${_id}/${categoryName}`}>
                      <div className="p-2">
                        <img src={imageCover} alt={title} className="w-full" />
                        <h5>{categoryName}</h5>
                        <h2>{title.split(" ").slice(0, 2).join(" ")}</h2>
                        <div className="flex justify-between mt-2">
                          <span>{price} EGP</span>
                          <span>
                            <i className="fa-solid fa-star text-yellow-300"></i>{" "}
                            {ratingsAverage}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <span>
                      <i
                        onClick={() => addWishlistProduct(product._id)}
                        className={`fa-solid fa-heart text-2xl cursor-pointer ${
                          wishlistState[product._id]
                            ? "text-red-500"
                            : "text-black"
                        }`}
                      ></i>
                    </span>

                    <button
                      onClick={() => addProduct(_id)}
                      className="btn mt-3 duration-500 translate-y-24"
                    >
                      Add To Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
