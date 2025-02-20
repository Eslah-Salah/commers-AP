import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {
  let [Brands, setBrands] = useState([]);

  async function getAllBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((response) => {
        setBrands(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="container mx-auto py-5">
        {/* Title */}
    <h1 className="text-4xl font-bold text-center text-main  mb-6">
      All Brands
    </h1>
     
      <div className="flex flex-wrap gap-4 justify-center">
        
        {Brands?.map((Brands) => (
          <div
            key={Brands._id}
            className="  hover:shadow-2xl transition-shadow duration-300     w-full   sm:w-[48%] md:w-[20%] lg:w-[20%] xl:w-[20%]  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-full h-40 object-cover"
                src={Brands.image}
                alt={Brands.name}
              />
            </a>
            <div className="p-5">
              <a href="#">
                <p className="mb-2  text-center text-black tracking-tight text-gray-900 dark:text-white">
                  {Brands.name}
                </p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
