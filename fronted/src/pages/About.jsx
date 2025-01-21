import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className="py-10">
      {/* About Us Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-lg"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="leading-relaxed text-base">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people engage with quality products. Founded 
            on the principles of integrity, creativity, and customer-centric 
            values, Forever started as a small initiative aimed at bridging the 
            gap between affordability and premium quality. Over the years, 
            it has grown into a symbol of trust and excellence.
          </p>
          <ul className="list-disc pl-5 text-base">
            <li>Committed to delivering the best customer experience.</li>
            <li>Emphasis on sustainability and ethical practices.</li>
            <li>Driven by the belief that quality should be accessible to all.</li>
          </ul>
          <b className="text-lg text-gray-800">Our Mission</b>
          <p className="leading-relaxed text-base">
            Our mission is to create a lasting impact by offering products that 
            enhance everyday lives. We aim to inspire and empower our customers 
            with innovative solutions that are not only functional but also 
            environmentally responsible. At Forever, we strive to be a brand 
            that people can rely on, fostering a sense of belonging and trust 
            through every interaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700 mb-20">
        <div className="border rounded-lg shadow-md px-6 py-8 flex flex-col gap-5">
          <b className="text-lg">Quality Assurance</b>
          <p className="leading-relaxed">
            We meticulously select and vet each product to ensure it meets 
            our stringent quality standards, providing only the best for 
            our customers.
          </p>
        </div>
        <div className="border rounded-lg shadow-md px-6 py-8 flex flex-col gap-5">
          <b className="text-lg">Convenience</b>
          <p className="leading-relaxed">
            With our user-friendly interface and hassle-free ordering 
            process, shopping has never been easier or more enjoyable.
          </p>
        </div>
        <div className="border rounded-lg shadow-md px-6 py-8 flex flex-col gap-5">
          <b className="text-lg">Reliability</b>
          <p className="leading-relaxed">
            We ensure timely delivery and dependable customer support to 
            make every interaction seamless and worry-free.
          </p>
        </div>
        
      </div>
      <NewsLetterBox/>
     
    </div>
  );
};

export default About;
