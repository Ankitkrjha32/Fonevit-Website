// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from './Title';
// import ProductItem from './ProductItem';

// const BestSeller = () => {
//  const {products} =useContext(ShopContext); // Access products from ShopContext
//   const [bestSellers, setBestSellers] = useState([]);
//   const [loading, setLoading] = useState(true);

  

//   console.log("prodeuct in best seller page is",products);
//   console.log("intial bestsaller item is",bestSellers);

//   useEffect(() => {
//     if (products && products.length > 0) {
//       // Filter best sellers and limit to top 5
//       const filteredBestSellers = products.filter((item) => item.bestseller).slice(0, 5);

//       console.log("fileter best sekker from best saler page is",filteredBestSellers);
//       setBestSellers(filteredBestSellers);
//       setLoading(false);
//     }

//     else{
//       console.log("product not found in useeffect in bestsalle page");
//     }
//   }, [products]);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading best sellers...</p>;
//   }

//   return (
//     <div className="my-10">
//       {/* Section Header */}
//       <div className="text-center text-3xl py-8">
//         <Title text1="BEST" text2="SELLER" />
//         <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
//           Check out our best sellers! Discover top-rated styles loved by our customers, perfect for elevating your wardrobe with timeless and trendy pieces.
//         </p>
//       </div>

//       {/* Best Sellers Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6">
//         {bestSellers.length > 0 ? (
//           bestSellers.map((item) => (
//             <ProductItem
//               key={item._id} // Unique key for each product
//               id={item._id}
//               name={item.name}
//               image={item.image}
//               price={item.price}
//             />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">
//             No best sellers available at the moment.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BestSeller;

// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from './Title';
// import ProductItem from './ProductItem';

// const BestSeller = () => {
//   const { products } = useContext(ShopContext); // Access products from ShopContext
//   const [bestSellers, setBestSellers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (products && Array.isArray(products)) {
//       // Filter best sellers and limit to top 5
//       const filteredBestSellers = products.filter(item => item.bestseller).slice(0, 5);

//       if (filteredBestSellers.length > 0) {
//         setBestSellers(filteredBestSellers);
//       } else {
//         // If no bestsellers found, show message
//         setBestSellers([]);
//       }

//       setLoading(false);
//     } else {
//       console.error('Products are not available or not an array!');
//       setLoading(false);  // Set loading false if no products
//     }
//   }, [products]);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading best sellers...</p>;
//   }

//   return (
//     <div className="my-10">
//       {/* Section Header */}
//       <div className="text-center text-3xl py-8">
//         <Title text1="BEST" text2="SELLER" />
//         <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
//           Check out our best sellers! Discover top-rated styles loved by our customers, perfect for elevating your wardrobe with timeless and trendy pieces.
//         </p>
//       </div>

//       {/* Best Sellers Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6">
//         {bestSellers.length > 0 ? (
//           bestSellers.map((item) => (
//             <ProductItem
//               key={item._id} // Unique key for each product
//               id={item._id}
//               name={item.name}
//               image={item.image}
//               price={item.price}
//             />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">
//             No best sellers available at the moment.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BestSeller;

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext); // Access products from ShopContext
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("object in best seller page is",products);
    // Ensure products are an array and are fetched properly
    if (products && Array.isArray(products)) {
      // Filter products with 'bestseller' true (ensure it's a boolean or truthy value)
      // console.log(products.filter(item => item. bestSeller === true));
      const filteredBestSellers = products.filter(item => item. bestSeller === true).slice(0, 20);
      console.log("fileter best sekker from best saler page is",filteredBestSellers);
      // If best sellers are found, update the state
      if (filteredBestSellers.length > 0) {
        setBestSellers(filteredBestSellers);
      } else {
        // If no best sellers found, set an empty array
        setBestSellers([]);
      }

      // Stop loading after processing
      setLoading(false);
    } else {
      console.error('Products are not available or not an array!');
      setLoading(false); // Stop loading if products are not available
    }
  }, [products]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading best sellers...</p>;
  }

  return (
    <div className="my-10">
      {/* Section Header */}
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLER" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Check out our best sellers! Discover top-rated styles loved by our customers, perfect for elevating your wardrobe with timeless and trendy pieces.
        </p>
      </div>

      {/* Best Sellers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.length > 0 ? (
          bestSellers.map((item) => (
            <ProductItem
              key={item._id} // Unique key for each product
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No best sellers available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
