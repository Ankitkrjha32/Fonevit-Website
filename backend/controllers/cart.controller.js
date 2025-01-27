// import userModel from "../models/userModel.js";

// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, itemSize } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;

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
//     await userModel.findByIdAndUpdate(userId, { cartData });
//     res.json({ success: true, message: "Added to cart" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// const updateToCart = async (req, res) => {
//   try {
//     const { userId, itemId, itemSize, quantity } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;
//     cartData[itemId][itemSize] = quantity;

//     await userModel.findByIdAndUpdate(userId, { cartData });
//     res.json({ success: true, message: "Updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// const getToCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;

//     res.json({ success: true, cartData });
//   } catch (error) {
//     console.log(error);
//     res.json({ sucess: false, message: error.message });
//   }
// };

// export { addToCart, updateToCart, getToCart };
import userModel from "../models/userModel.js";

// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, itemSize } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = userData.cartData || {}; // Ensure it's initialized

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

//     userData.cartData = cartData; // Update the cartData on the user model
//     await userData.save();

//     res.json({ success: true, message: "Added to cart" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const addToCart = async (req, res) => {
    try {
      const { userId, itemId, itemSize } = req.body;
  
      const userData = await userModel.findById(userId);
      let cartData = await userData.cartData;
  
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
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Added to cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
// const updateToCart = async (req, res) => {
//   try {
//     const { userId, itemId, itemSize, quantity } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;
//     cartData[itemId][itemSize] = quantity;

//     await userModel.findByIdAndUpdate(userId, { cartData });
//     res.json({ success: true, message: "Updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const updateToCart = async (req, res) => {
  try {
    const { userId, itemId, itemSize, quantity } = req.body;

    // Fetch the user's cart data from the database
    const userData = await userModel.findById(userId);
    let cartData = { ...userData.cartData };

    // Ensure `cartData` has the required structure
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (quantity > 0) {
      // Update the quantity if greater than 0
      cartData[itemId][itemSize] = quantity;
    } else {
      // Delete the specific size entry if quantity is 0
      delete cartData[itemId][itemSize];

      // If the item has no sizes left, delete the entire item
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    // Save the updated cart data back to the database
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Cart updated successfully." });
  } catch (error) {
    console.error("Error in updateToCart:", error);
    res.json({ success: false, message: error.message });
  }
};


const getToCart = async (req, res) => {
  try {
    console.log("starting getcart from cart controller");
    const { userId } = req.body;
    console.log("userId after startign getcart controllr", userId);

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateToCart, getToCart };
