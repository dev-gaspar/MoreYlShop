import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constantes/productConstants";

export const getProducts =
  (currentPage = 1, keyword = "", precio = 1000) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

      let link = `/api/productos?keyword=${keyword}&precio[gte]=${precio[0]}&precio[lte]=${precio[1]}&page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: e.response.data.message,
      });
    }
  };

//VER DETALLES DE PRODUCTOS
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/productos/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.respuesta,
    });
  } catch (e) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: e.response.data.message,
    });
  }
};

//clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
