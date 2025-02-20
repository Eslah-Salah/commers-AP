import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/images/freshcart-logo.svg'
import { UserContext } from './../../context/UserContect';
import { CartContext } from '../../context/CartContext';


export default function Navbar() {
 let {userLogin , setuserLogin} = useContext(UserContext);
 let {Cart} = useContext(CartContext);
 let Navigate = useNavigate()
 function logout(){
  localStorage.removeItem("userToken")
  setuserLogin(null)
  Navigate('/login')
 }
 
  return (
    <>
<nav className="bg-white fixed top-0 left-0 w-full z-[1000] border-gray-200 shadow-md">
  <div className="max-w-screen-xl flex items-center justify-between mx-auto px-10 py-3">
    
   
    <Link to="/" className="flex items-center">
      <img src={logoImg} className="h-10" alt="FreshCart Logo" />
    </Link>

 
    {userLogin && (
      <ul className="flex space-x-6 font-medium">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-active" : ""}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "text-active" : ""}>Cart</NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" className={({ isActive }) => isActive ? "text-active" : ""}>Wish list</NavLink>
        </li>
        <li>
          <NavLink to="/brands" className={({ isActive }) => isActive ? "text-active" : ""}>Brands</NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={({ isActive }) => isActive ? "text-active" : ""}>Categories</NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-active" : ""}>Products</NavLink>
        </li>
        
      </ul>
    )}

    
    <ul className="flex space-x-4 text-gray-600">
      <li><a href="https://www.facebook.com" target="_blank"><i className="fa-brands fa-facebook"></i></a></li>
      <li><a href="https://twitter.com" target="_blank"><i className="fa-brands fa-twitter"></i></a></li>
      <li><a href="https://linkedin.com" target="_blank"><i className="fa-brands fa-linkedin"></i></a></li>
      <li><a href="https://www.instagram.com" target="_blank"><i className="fa-brands fa-instagram"></i></a></li>
    </ul>

   
    <ul className="flex items-center space-x-6">
      {userLogin ? (
        <>
          <li className="relative">
            <NavLink to="/cart" className="relative">
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
              {Cart?.numOfCartItems > 0 && (
                <span className="bg-green-600 text-white p-1 text-xs absolute -top-2 -right-2 rounded-full">
                  {Cart.numOfCartItems}
                </span>
              )}
            </NavLink>
          </li>
          <li>
  <button onClick={logout} className="cursor-pointer ">Logout</button>
</li>
          
 
        </>
      ) : (
        <>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
        </>
      )}
    </ul>

  </div>
</nav>



    </>
  )
}
