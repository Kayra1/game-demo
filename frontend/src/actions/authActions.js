import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER
} from "./types"

// Action to log user in
export const loginUser = userData => dispatch => {
    axios.post("/login", userData)
        .then(res => {
            // Save token for use in axios
            const {token} = res.data
            localStorage.setItem("jwtToken", token);
            setAuthToken(token)

            // Decode for user data
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Setting logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Setting loading user
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

// Logging user out (no need to do anything serverside)
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken")
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}