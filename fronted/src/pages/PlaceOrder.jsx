import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { assets, products } from "../assets/frontend assets/assets";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate,backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
 
  
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  //onSubmit Handler 
  const onSubmitHandler = async (e) => {
    e.preventDefault();

try {
  let orderItems = [];

  for(const items in cartItems){
    for(const itemSize in cartItems[items]){
      if(cartItems[items][itemSize]){
        const itemInfo = structuredClone(products.find(product => product._id === items))
        if(itemInfo){
          itemInfo.size = itemSize;
          itemInfo.quantity = cartItems[items][itemSize];
          orderItems.push(itemInfo);
        }
      }
    }
  }
  console.log(orderItems);
  let orderData = {
    address: formData,
    items: orderItems,
    amount: getCartAmount() + delivery_fee,

  }
  switch(method){
    case 'cod':
      const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers: {token}});
      if(response.data.success){
        setCartItems({});
        navigate('/orders');
      }else{
        console.log("Something went wrong");
      } 
    break;
    case 'stripe':
      const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers: {token}});
      if(responseStripe.data.success){
        setCartItems({});
        const {session_url} = responseStripe.data;
        window.location.replace(session_url);
      }else{
        toast.error(response.data.message);
      }
      break;
    default:
  }

} catch (error) {
  console.log(error);
}
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-10 pt-5 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
            type="text"
            placeholder="First name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          type="text"
          placeholder="Street"
          required
        />

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
            type="number"
            placeholder="Zip code"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
            type="text"
            placeholder="Counrty"
            required
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 px-3.5 py-1.5 rounded w-full"
          type="number"
          placeholder="Phone"
          required
        />
      </div>
      {/*Right Side*/}
      <div className="mt-10">
        <div className="mt-10 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
        </div>

        {/*Pyament Method Selction*/}
        <div className="flex gap-3 flex-col sm:flex-row">
          <div
            onClick={() => setMethod("stripe")}
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "stripe" ? "bg-green-500" : ""
              }`}
            ></p>
            <img className="h-5 mx-auto" src={assets.stripe_logo} alt="" />
          </div>

          <div
            onClick={() => setMethod("razorpay")}
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "razorpay" ? "bg-green-500" : ""
              }`}
            ></p>
            <img className="h-5 mx-auto" src={assets.razorpay_logo} alt="" />
          </div>

          <div
            onClick={() => setMethod("cod")}
            className="flex items-center gap-3 border py-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "cod" ? "bg-green-500" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              Cash on Delivery
            </p>
          </div>
        </div>

        <div className="w-full text-end mt-5">
          <button
          type="submit"
            onClick={() => navigate("/orders")}
            className="bg-black text-gray-100 px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
