export const ADD_TO_LIST_SEEN_PRODUCTS = "ADD_TO_LIST_SEEN_PRODUCTS";

export const addToListSeenProducts = (product) => ({
  type: ADD_TO_LIST_SEEN_PRODUCTS,
  payload: product,
});
