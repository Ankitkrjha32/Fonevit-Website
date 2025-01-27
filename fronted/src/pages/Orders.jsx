import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// const Orders = () => {
//   const {products, currency,backendUrl, token} = useContext(ShopContext);
//   const [orderData,setOrderData] = useState([]);
//   const loadDataMore = async() => {
//     try {
//       if(!token){
//         return null;
//       }
//       const response = await axios.post(backendUrl + '/api/order/user-orders',{},{headers: {token}});
//       if(response.data.success){
//         let allOrderItem = [];
//         response.data.orders.map((order) => {
//           order.items.map((item) => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             allOrderItem.push(item);
//           })
//         })
//         setOrderData(allOrderItem.reverse());
//       }
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
//   useEffect(() => {
//     loadDataMore();
//   } ,[token]);
//   return (
//     <div className='border-t pt-16'>
      
//       <div className='text-2xl '>
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//         <div>
//           {products.slice(1,4).map((item,index) =>( 
//              <div key={index} className='py-4 border-t border-b border-gray-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//                 <div className='flex items-start gap-6 text-sm'>
//                   <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
//                   <div>
//                     <p className='sm:text-base font-medium'>{item.name}</p>
//                     <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
//                     <p>{currency} {item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Size: {item.size}</p>
//                   </div>
//                   <p>Date:  <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>

//                   </div>
                 
//                 </div>
//                 <div className='md:w-1/2 flex justify-between'>
//                   <div className='flex items-center gap-2'>
//                     <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                     <p className='text-sm md:text-base'>{item.status} ready to be shipped</p>
//                   </div>
//                   <button onClick={loadDataMore} className='border px-4 text-sm font-medium rounded-sm'>
//                     Track Orders
//                   </button>
//                 </div>
//              </div>
//           ))}
//         </div>
     
//     </div>
//   )
// }

// export default Orders

// const Orders = () => {
//   const { products, currency, backendUrl, token } = useContext(ShopContext); // Include userId
//   const [orderData, setOrderData] = useState([]);

//   const userId =jwtDecode(token).id; // Decode the token and get userId
  
//     if (!userId) {
//       console.error("User ID not found in the token.");
//       return;
//     }

//     console.log("user id from order fronted is",userId);
  

//   const loadDataMore = async () => {
//     try {
//       if (!token || !userId) {
//         console.log("Missing token or userId");
//         return null;
//       }

//       const response = await axios.post(
//         `${backendUrl}/api/order/user-orders`,
//         { userId }, // Send userId in the request body
//         { headers: { Authorization: `Bearer ${token}` } })

//       if (response.data.success) {
//         const allOrderItem = [];
//         response.data.orders.forEach((order) => {
//           order.items.forEach((item) => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             allOrderItem.push(item);
//           });
//         });
//         setOrderData(allOrderItem.reverse());
//       } else {
//         console.log("Failed to load orders:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     loadDataMore();
//   }, [token, userId]);

//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl ">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       <div>
//         {orderData.map((item, index) => (
//           <div
//             key={index}
//             className="py-4 border-t border-b border-gray-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//           >
//             <div className="flex items-start gap-6 text-sm">
//               <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
//               <div>
//                 <p className="sm:text-base font-medium">{item.name}</p>
//                 <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
//                   <p>
//                     {currency} {item.price}
//                   </p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Size: {item.size}</p>
//                 </div>
//                 <p>
//                   Date:{" "}
//                   <span className="text-gray-500">
//                     {new Date(item.date).toDateString()}
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <div className="md:w-1/2 flex justify-between">
//               <div className="flex items-center gap-2">
//                 <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//                 <p className="text-sm md:text-base">{item.status} ready to be shipped</p>
//               </div>
//               <button
//                 onClick={loadDataMore}
//                 className="border px-4 text-sm font-medium rounded-sm"
//               >
//                 Track Orders
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
const Orders = () => {
  const { products, currency, backendUrl, token } = useContext(ShopContext); // Include userId
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle UI while fetching

  const userId = token ? jwtDecode(token).id : null; // Decode token only if it's available

  if (!token) {
    console.error("Token is missing.");
    return <div>You need to be logged in to view orders.</div>; // Show message if token is missing
  }

  if (!userId) {
    console.error("User ID not found in the token.");
    return <div>Error: User ID is missing.</div>; // Show error if userId is missing
  }

  const loadDataMore = async () => {
    try {
      if (!userId) {
        console.log("Missing userId");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/user-orders`,
        { userId }, // Send userId in the request body
        { headers: { Authorization: `Bearer ${token}` } } // Pass token in Authorization header
      );

      if (response.data.success) {
        const allOrderItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      } else {
        console.log("Failed to load orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    } finally {
      setIsLoading(false); // Set loading to false after the data is fetched
    }
  };

  useEffect(() => {
    if (token && userId) {
      loadDataMore();
    }
  }, [token, userId]);

  // Display loading state or error if needed
  if (isLoading) {
    return <div>Loading orders...</div>; // Display loading message while fetching data
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl ">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b border-gray-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p>
                      {currency} {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p>
                    Date:{" "}
                    <span className="text-gray-500">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status} ready to be shipped</p>
                </div>
                <button
                  onClick={loadDataMore}
                  className="border px-4 text-sm font-medium rounded-sm"
                >
                  Track Orders
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No orders found.</div> // Handle case where there are no orders
        )}
      </div>
    </div>
  );
};

export default Orders;
