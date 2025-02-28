import { ADD_TO_LIST_SEEN_PRODUCTS } from "../action/productAction";

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_LIST_SEEN_PRODUCTS:
      // Filter out any existing product with same id
      const filteredProducts = state.products.filter(
        product => product._id !== action.payload._id
      );
      
      // Add new product at start
      const newProducts = [action.payload, ...filteredProducts];
      
      // Keep only first 8 items
      return {
        ...state,
        products: newProducts.slice(0, 8)
      };

    default:
      return state;
  }
};

export default productReducer;