import {API_REQUEST} from "./types";

export const apiCall = (apiData) => ({
    type: API_REQUEST,
    apiData
})