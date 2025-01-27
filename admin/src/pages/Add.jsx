import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [bestseller, setBestSeller] = useState(false); // Changed to boolean
  const [sizes, setSizes] = useState([]); // Changed to array

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Product name is required');
      return false;
    }
    if (!description.trim()) {
      toast.error('Product description is required');
      return false;
    }
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      toast.error('Price must be a positive number');
      return false;
    }
    if (!category || category === 'All') {
      toast.error('Category is required');
      return false;
    }
    if (!subCategory || subCategory === 'All') {
      toast.error('Sub-category is required');
      return false;
    }
    if (sizes.length === 0) {
      toast.error('At least one size must be selected');
      return false;
    }
    if (!image1) {
      toast.error('At least one image is required');
      return false;
    }
    return true;
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!validateForm()) return ;
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description );
      formData.append('price', parseFloat(price) ); // Ensure price is a valid number
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestSeller', bestseller); // Pass as boolean
      formData.append('sizes', JSON.stringify(sizes)); // Pass sizes as JSON string

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      // Log FormData content
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      console.log("token from add .js  page in admin", token);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form data
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setSubCategory('');
        setBestSeller(false);
        setSizes([]);
        setImage1('');
        setImage2('');
        setImage3('');
        setImage4('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <h1 className='mb-2'>Upload Image</h1>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img
              className='w-20 cursor-pointer'
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=''
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type='file'
              id='image1'
              hidden
            />
          </label>

          <label htmlFor='image2'>
            <img
              className='w-20 cursor-pointer'
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=''
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type='file'
              id='image2'
              hidden
            />
          </label>

          <label htmlFor='image3'>
            <img
              className='w-20 cursor-pointer'
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=''
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type='file'
              id='image3'
              hidden
            />
          </label>

          <label htmlFor='image4'>
            <img
              className='w-20 cursor-pointer'
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=''
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type='file'
              id='image4'
              hidden
            />
          </label>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            className='w-full max-w-[500px] px-3 py-2'
            placeholder='Type here...'
            required
          />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className='w-full max-w-[500px] px-3 py-2'
            placeholder='Write product description here...'
            required
          />
        </div>

        <div className='flex flex-col sm:flex-row sm:gap-8 gap-3'>
          <div>
            <p className='mb-2'>Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={'All'}
              className='w-full px-3 py-2'
            >
              <option value='All'>All</option>
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Brands</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className='w-full px-3 py-2'
              value={subCategory}
              defaultValue={'All'}
            >
              <option value='All'>All</option>
              <option value='Addidas'>Addidas</option>
              <option value='Puma'>Puma</option>
              <option value='Bata'>Bata</option>
              <option value='Reebok'>Reebok</option>
              <option value='Servis'>Servis</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className='w-full sm:w-[120px] px-3 py-2'
              type='number'
              placeholder='25'
            />
          </div>
        </div>

        <div>
          <p className='mb-2'>Sizes</p>
          <div className='flex gap-3'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div
                key={size}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(size)
                      ? prev.filter((item) => item !== size)
                      : [...prev, size]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                  } px-3 py-1 cursor-pointer`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestseller}
          type='checkbox'
          id='bestseller'
        />
        <label className='cursor-pointer' htmlFor='bestseller'>
          Add to bestseller
        </label>
      </div>

      <button type='submit' className='w-28 py-2 mt-4 bg-black text-white'>
        Submit
      </button>
    </form>
  );
};

export default Add;
