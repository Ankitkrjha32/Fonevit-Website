import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      let productCopy = products.slice(); // Copy the products array
      productCopy = productCopy.filter((item) => category === item.category); // Filter by category
      productCopy = productCopy.filter((item) => subCategory === item.subCategory); // Filter by subCategory
      setRelatedProduct(productCopy.slice(0, 5)); // Take the first 5 related products
    }
  }, [products, category, subCategory]); // Added dependencies for proper useEffect execution

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCT'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 gap-y-6'>
        {relatedProduct.map((item) => (
          <ProductItem
            key={item._id} // Use unique `_id` as `key`
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
