import React, { useContext, useState,useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/frontend assets/assets'; 
import { ShopContext } from '../context/ShopContext';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
const backendUrl = import.meta.env.VITE_BACKEND_URL||'http://localhost:4000';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItem } = useContext(ShopContext);
 

  useEffect(() => {
    if (token) {
      try {
        
        // Decode the JWT to get the user ID
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);    
        const userId = decodedToken.id;
       
        

        // Fetch user name from the backend using the user ID
        axios
          .get(`${backendUrl}/api/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            
            
            if (response.data.success && response.data.name) {
              setUserName(response.data.name); 
              toast.success(`Welcome! ${ response.data.name}`);
             
            } else {
              console.log('User not found');
            }

            
          })
          .catch((error) => {
        
            console.error('Error fetching user data:', error);
      
          });
      } catch (error) {
        console.error('Invalid token:', error);
       
      }
    }
  }, [token]);

  const logout = () => {
    navigate('/login');
    toast.success("Logout");
    localStorage.removeItem('token');
    setToken('');
    setUserName('');
    setCartItem({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>
      
      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm font-serif  text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 nav-link ${isActive ? 'underline' : ''}`
          }
        >
          <p>HOME</p>
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 nav-link ${isActive ? 'underline' : ''}`
          }
        >
          <p>COLLECTION</p>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 nav-link ${isActive ? 'underline' : ''}`
          }
        >
          <p>ABOUT</p>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 nav-link ${isActive ? 'underline' : ''}`
          }
        >
          <p>CONTACT</p>
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="Search Icon"
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <Link to={token ? "#" : "/login"}>
            <img
              src={assets.profile_icon}
              alt="Profile Icon"
              className="w-5 cursor-pointer"
            />
          </Link>
          
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate('/orders')}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
         {/* Display user's name */}
         {token && (
          <div className="lg:text-[15px] font-serif  text-gray-700 hidden sm:block ">
          <span className="capitalize font-medium">{userName}</span>
          
          </div>
        )}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="Cart Icon"
            className="w-5 min-w-5"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-5 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu Icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              alt="Back Icon"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? 'underline' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? 'underline' : ''}`
            }
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? 'underline' : ''}`
            }
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className={({ isActive }) =>
              `py-2 pl-6 border ${isActive ? 'underline' : ''}`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
