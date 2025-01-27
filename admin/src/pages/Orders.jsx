// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { useEffect } from "react";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);
  

//   const fetchAllOrders = async () => {
//     // console.log(backendUrl);
    
//     if (!token) {
//       return null;
//     }
//     try {
//       const response = await axios.post(backendUrl + '/api/order/list', {}, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.data.success) {
       
//         setOrders(response.data.orders);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchAllOrders();
//     console.log(orders.items);
//   }, [token]);

//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(backendUrl + '/api/order/status',{orderId, status: event.target.value},{headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//       if(response.data.success){
//         await fetchAllOrders();
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   }

//   return (
//     <div>
//       <h1>Order Page</h1>
//       <div>
//         {orders.map((order, index) => (
//           <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-800 bg-pink-100" key={index}>
//             <img className="w-12" src={assets.parcel_icon} alt="" />
//             <div>
//               <div>
//                 {order.items.map((item, index) => {
//                   if (index === order.items.length - 1) {
//                     return (
//                       <>
//                       <img className="w-12 my-2" src={item.image[0]} alt="" />
//                       <p className="py-0.5 border-b-2 border-pink-400" key={index}>
//                         *{item.name} X {item.quantity} <span>{item.size}</span>
//                       </p>
//                       </>
//                     );
//                   } else {
//                     return (
//                       <>
//                       <img className="w-12 my-2" src={item.image[0]} alt="" />
//                       <p className="py-0.5 border-b-2 border-pink-400" key={index}>
//                         *{item.name} X {item.quantity} <span>{item.size}</span>
//                       </p>
//                       </>
//                     );
//                   }
//                 })}
//               </div>
//               <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
//               <div>
//                 <p>{order.address.street + ", "}</p>
//                 <p>
//                   {order.address.city +
//                     ", " +
//                     order.address.state +
//                     ", " +
//                     order.address.country +
//                     ", " +
//                     order.address.zipcode}
//                 </p>
//               </div>
//               <p>{order.address.phone}</p>
        
//             </div>
//             <div>
//                 <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
//                 <p className="mt-3">Method : {order.paymentMethod}</p>
//                 <p>Payment : {order.payment ? "Done" : "Pending"}</p>
//                 <p>Date : {new Date(order.date).toLocaleDateString()}</p>
//               </div>
//               <p className="text-sm sm:text-[15px]">
//                 {currency}
//                 {order.amount}
                
//               </p>
          
//            <select onChange={(event)=> statusHandler(event, order._id)} defaultValue={order.status} className="p-2 font-semibold cursor-pointer">
//                 <option value="Order Placed">Order Placed</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Out for delivery">Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/order/list`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         // Sort orders by date (latest first)
//         const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
//         setOrders(sortedOrders);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/order/status`,
//         { orderId, status: event.target.value },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         await fetchAllOrders();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Helper function to check if the order is from today
//   const isToday = (date) => {
//     const today = new Date();
//     const orderDate = new Date(date);
//     return (
//       today.getFullYear() === orderDate.getFullYear() &&
//       today.getMonth() === orderDate.getMonth() &&
//       today.getDate() === orderDate.getDate()
//     );
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-5">Order Page</h1>
//       <div>
//         {orders.length === 0 ? (
//           <p className="text-gray-500">No orders found.</p>
//         ) : (
//           <>
//             {/* Current Date Orders */}
//             {orders.some((order) => isToday(order.date)) && (
//               <>
//                 <h2 className="text-lg font-semibold mb-3">Today</h2>
//                 {orders
//                   .filter((order) => isToday(order.date))
//                   .map((order, index) => (
//                     <OrderItem
//                       key={index}
//                       order={order}
//                       currency={currency}
//                       statusHandler={statusHandler}
//                     />
//                   ))}
//                 <hr className="my-5 border-gray-300" />
//               </>
//             )}

//             {/* Earlier Orders */}
//             <h2 className="text-lg font-semibold mb-3">Earlier</h2>
//             {orders
//               .filter((order) => !isToday(order.date))
//               .map((order, index) => (
//                 <OrderItem
//                   key={index}
//                   order={order}
//                   currency={currency}
//                   statusHandler={statusHandler}
//                 />
//               ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // OrderItem Component for rendering a single order
// const OrderItem = ({ order, currency, statusHandler }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-800 bg-pink-100">
//     <img className="w-12" src={assets.parcel_icon} alt="" />
//     <div>
//       <div>
//         {order.items.map((item, index) => (
//           <div key={index}>
//             <img className="w-12 my-2" src={item.image[0]} alt="" />
//             <p className="py-0.5 border-b-2 border-pink-400">
//               *{item.name} X {item.quantity} <span>{item.size}</span>
//             </p>
//           </div>
//         ))}
//       </div>
//       <p className="mt-3 mb-2 font-medium">
//         {order.address.firstName + " " + order.address.lastName}
//       </p>
//       <div>
//         <p>{order.address.street + ", "}</p>
//         <p>
//           {order.address.city +
//             ", " +
//             order.address.state +
//             ", " +
//             order.address.country +
//             ", " +
//             order.address.zipcode}
//         </p>
//       </div>
//       <p>{order.address.phone}</p>
//     </div>
//     <div>
//       <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
//       <p className="mt-3">Method : {order.paymentMethod}</p>
//       <p>Payment : {order.payment ? "Done" : "Pending"}</p>
//       <p>Date : {new Date(order.date).toLocaleDateString()}</p>
//     </div>
//     <p className="text-sm sm:text-[15px]">
//       {currency}
//       {order.amount}
//     </p>
//     <select
//       onChange={(event) => statusHandler(event, order._id)}
//       defaultValue={order.status}
//       className="p-2 font-semibold cursor-pointer"
//     >
//       <option value="Order Placed">Order Placed</option>
//       <option value="Packing">Packing</option>
//       <option value="Shipped">Shipped</option>
//       <option value="Out for delivery">Out for delivery</option>
//       <option value="Delivered">Delivered</option>
//     </select>
//   </div>
// );

// export default Orders;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to group orders by date
  const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders.forEach((order) => {
      const date = new Date(order.date).toLocaleDateString(); // Group by date
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(order);
    });
    return grouped;
  };

  // Sort orders by date (most recent first)
  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
  const groupedOrders = groupOrdersByDate(sortedOrders);

  return (
    <div>
      <h1>Order Page</h1>
      {Object.keys(groupedOrders).map((date, index) => (
        <div key={index}>
          {/* Display date as a heading */}
          <h2 className="text-lg font-bold mt-5 mb-3 border-b-2 pb-2">
            {date === new Date().toLocaleDateString() ? "Today" : date}
          </h2>
          {groupedOrders[date].map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-800 bg-pink-100"
              key={index}
            >
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <img className="w-12 my-2" src={item.image[0]} alt="" />
                      <p className="py-0.5 border-b-2 border-pink-400">
                        *{item.name} X {item.quantity} <span>{item.size}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">
                {currency}
                {order.amount}
              </p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                defaultValue={order.status}
                className="p-2 font-semibold cursor-pointer"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;

