import React from 'react';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLetterBox';
import { assets } from '../assets/frontend assets/assets';

const Contact = () => {
  return (
    <div className="py-10">
      {/* Contact Us Section */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-28">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-lg"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Contact Details */}
        <div className="flex flex-col justify-center items-start gap-6">
          {/* Store Information */}
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
           Noida Sec- 18  <br />
           Near Amity University, New Delhi, India
          </p>
          <p className="text-gray-500">
            Tel: (91) 889-555-1111 <br />
            Email: admin@example.com
          </p>

          {/* Careers Information */}
          <p className="font-semibold text-xl text-gray-600">Careers at Fonevit</p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          {/* Explore Jobs Button */}
          <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-black transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>

    
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;
