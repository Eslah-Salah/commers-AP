import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Checkout from "./../Checkout/Checkout";
import toast, { Toaster } from "react-hot-toast";

export default function Cart() {
  let { setCart, getCartItems, removeCartItem, updateCartItem,clearCart } =
    useContext(CartContext);
  let [CartDetails, setCartDetails] = useState(null);
  async function removeItem(productId) {
    let response = await removeCartItem(productId);
    setCartDetails(response.data);
    setCart(response.data);
    toast.success("Product Deleted");
  }
  async function getCart() {
    let response = await getCartItems();
    setCartDetails(response.data);
    console.log(response.data);
    
  }
  async function clearallCart() {
    let response = await clearCart();
    if(response.data.message== 'success'){
      setCartDetails(null);
      setCart(null);
    }
  
    
    
  }
  async function updateQuantity(productId, count) {
    let response = await updateCartItem(productId, count);
    setCartDetails(response.data);
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Toaster />

      <div className="relative bg-gray-300 w-10/12 mx-auto mt-14 shadow-md sm:rounded-lg">
        <h1 className="text-2xl p-3">Shop Cart</h1>

        <div className="flex justify-between mb-3 me-6">
        <h2 className="text-2xl text-main">Total Cart Price:{CartDetails?.data.totalCartPrice}</h2>
        <button  onClick={clearallCart} className="bg-main px-3 py-2 rounded">Clear Cart</button>
        </div>

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
                Qty
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
            {CartDetails?.data?.products?.map((product) => (
              <tr
                key={product.product.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateQuantity(product.product.id, product.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Decrease quantity</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() =>
                        updateQuantity(product.product.id, product.count + 1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Increase quantity</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeItem(product.product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/checkout/${CartDetails?.
cartId
}`}>
          <button className="btn mt-3 duration-500">Checkout Now</button>
        </Link>
      </div>
    </>
  );
}
