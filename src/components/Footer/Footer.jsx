import React, { useEffect, useState } from 'react'
import Style from'./Footer.module.css'
export default function Footer() {
  return (
    <footer className="bg-[#0aad0a] text-white py-10 mt-10">
      <div className="container mx-auto px-5 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">E-Shop</h2>
          <p className="text-sm">
            Your one-stop shop for the best products at unbeatable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Subscribe</h2>
          <p className="text-sm mb-3">Get the latest updates and offers.</p>
          <div className="flex justify-center md:justify-start">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 rounded-l text-black"
            />
            <button className="bg-white text-[#0aad0a] px-4 py-2 rounded-r">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="text-center mt-8 border-t border-white pt-5">
        <p>© 2024 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
