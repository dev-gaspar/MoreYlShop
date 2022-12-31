import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
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

//get productos admin

export const getProductosAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });
    const { data } = await axios.get(`/api/admin/productos/`);
    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: data.respuesta,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
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

//NUEVO PRODUCTO -ADMIN
export const newProduct = ( productData ) => async (dispatch)=>{
  try {
      dispatch({type: NEW_PRODUCT_REQUEST})

      const config ={ 
          header: { 
              'Content-Type':'application/json'
          }
      }

      const {data} = await axios.post('/api/productos', productData, config)

      dispatch({
          type: NEW_PRODUCT_SUCCESS,
          payload: data
      })
  }catch(error){
      dispatch({
          type: NEW_PRODUCT_FAIL,
          payload: error.response.data.message
      })
  }
}

//clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
