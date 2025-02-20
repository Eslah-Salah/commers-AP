import React from 'react';

import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';



export default function Layout() {
  return (
    <>
    <Navbar/>
   <div className="my-10 py-10">
    <Outlet></Outlet>
   </div>
   <Footer/>

    
    
    </>
  )
}
