import React, { useContext, useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { WishlistContext } from "../../context/WishlistContext";

export default function Wishlist() {
  let { setWishlist, getWishlistItems, removeWishlistItem } =
    useContext(WishlistContext);
  let [WishlistDetails, setWishlistDetails] = useState(null);
  async function removeItem(productId) {
    await removeWishlistItem(productId);
     await getWishlist();
    toast.success("Product Deleted");
  }
  async function getWishlist() {
    let response = await getWishlistItems();
    setWishlistDetails(response?.data);
    setWishlist(response.data);
    
   
  }
 
  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <>
      <Toaster />

      <div className="relative bg-gray-300 w-10/12 mx-auto mt-14 shadow-md sm:rounded-lg">
        <h1 className="text-4xl p-3  text-main">My wish List</h1>

        

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
             
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {WishlistDetails?.data.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </td>
               
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeItem(product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
    </>
  );
}
