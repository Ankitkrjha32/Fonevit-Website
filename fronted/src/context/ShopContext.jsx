// import { createContext, useEffect, useState } from "react";

// import { toast } from "react-toastify";
// import {products as p1} from "../assets/frontend assets/assets";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import {jwtDecode} from 'jwt-decode';




// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = "₹ ";
//   const delivery_fee = 10;
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [products, setProducts] = useState([]);
  

//   const navigate = useNavigate();

//   const backendUrl = import.meta.env.VITE_BACKEND_URL||'http://localhost:4000';
  

//   const [token, setToken] = useState('');
  
//   const addToCart = async (itemId, itemSize) => {
//     if (!itemSize) {
//       toast.error("Please select product size");
//       return;
//     }
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       if (cartData[itemId][itemSize]) {
//         cartData[itemId][itemSize] += 1;
//       } else {
//         cartData[itemId][itemSize] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][itemSize] = 1;
//     }
//     setCartItems(cartData);
//     toast.success('Added into Cart');
    
//     navigate('/cart');


//     if(token){
//       try {
//         console.log("token in shopcontext",token);
//         const userId = jwtDecode(token)?.id;
//         console.log("user id in shopcontext",userId);

//          await  axios.post(backendUrl + '/api/cart/add',{userId,itemId,itemSize}, { headers: { Authorization: `Bearer ${token}` } });
      
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       }
//     }
//   };

  
//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const size in cartItems[items]) {
//         if (cartItems[items][size] > 0) {
//           try {
//             totalCount += cartItems[items][size];
//           } catch (error) {}
//         }
//       }
//     }
//     return totalCount;
//   };

  
//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalAmount += itemInfo.price * cartItems[items][item];
//           }
//         } catch (error) {}
//       }
//     }
//     return totalAmount;
//   };
//   const updateQuantity = async (itemId, itemSize, quantity) => {
//     let cartData = structuredClone(cartItems);
    
//     cartData[itemId][itemSize] = quantity;
    
//     setCartItems(cartData);

//     //bakcend
//     if(token){
//       try {
//         await axios.post(backendUrl + '/api/cart/update',{itemId,itemSize,quantity}, { headers: { Authorization: `Bearer ${token}` } });
//       } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       }
//     }
//   };
//   const getCart = async (token) => {
   
//       try {
//         const response = await axios.post(backendUrl + '/api/cart/get',{}, { headers: { Authorization: `Bearer ${token}` } });
//         console.log("response of getcart controller in shopcontext",response);
//         if(response.data.success){
//           setCartItems(response.data.cartData);
//         }
//       } catch (error) {
//         console.log(error);
//       }
   
//   }
//   console.log("cartItems from shopcontext",cartItems);

  
//   const fetchProducts = async () => {
//     try {
//         const response = await axios.get(backendUrl + '/api/product/list');
//         if(response.data.success){
//           setProducts(p1);
//           // setProduct(products);
//         }else{
//           toast.error(response.data.message);
//         }
//     } catch (error) {
//         console.log(error);
//         toast.error(error.message);
//       }
//     }

//     // console.log(products);
    
//     useEffect(() => {
//       fetchProducts();
//     } ,[])
//     useEffect(() => {
//       if(!token && localStorage.getItem('token')){
//         setToken(localStorage.getItem('token'));
//         getCart(localStorage.getItem('token'));
       
//     }
//   } ,[])
  

//   const value = {
    
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     setCartItems,
//     cartItems,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     backendUrl,
//     products,
//     token,
//     setToken,
    
//   };

//   useEffect(() => {
//     console.log(cartItems);
//   }, [cartItems]);

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { products as p1 } from "../assets/frontend assets/assets";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹ ";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const addToCart = async (itemId, itemSize) => {
    if (!itemSize) {
      toast.error("Please select product size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][itemSize]) {
        cartData[itemId][itemSize] += 1;
      } else {
        cartData[itemId][itemSize] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][itemSize] = 1;
    }
    setCartItems(cartData);
    // navigate('/cart');
    
    if (token) {
      try {
        const userId = jwtDecode(token).id;
        await axios.post(backendUrl + '/api/cart/add', { userId, itemId, itemSize }, { headers: { Authorization: `Bearer ${token}` } });
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          try {
            totalCount += cartItems[items][size];
          } catch (error) {}
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const updateQuantity = async (itemId, itemSize, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][itemSize] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        const userId = jwtDecode(token).id;
        await axios.post(backendUrl + '/api/cart/update', { userId,itemId, itemSize, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCart = async (token) => {
    if (!token) return;

    try {
      const userId = jwtDecode(token).id;
      console.log("user id in getcart fxn in shopcontext ", userId);
      const response = await axios.post(backendUrl + '/api/cart/get', { userId }, { headers: { Authorization: `Bearer ${token}` } });
      console.log("respon for getcart after hitting backend in shopcontext", response);
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error("Failed to fetch cart data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(p1);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (token) {
      getCart(token);
    }
  }, [token]);

  const value = {
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    setCartItems,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    products,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

