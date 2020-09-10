import {apiCall} from "../actionApi";
import {SET_PRODUCTS} from '../types';

export const setProducts = () => {
    return apiCall({
        types: SET_PRODUCTS,
        endpoint: '/get-products'
    })
}
