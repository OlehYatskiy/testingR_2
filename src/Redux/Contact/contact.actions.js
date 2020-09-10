import {apiCall} from "../actionApi";
import {SET_CONTACTS} from '../types';

export const setContacts = () => {
    return apiCall({
        types: SET_CONTACTS,
        endpoint: '/users'
    })
}
