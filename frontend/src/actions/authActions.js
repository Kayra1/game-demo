import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    USER_LOADING,
    SET_CURRENT_USER
} from "./types"

// Action to log user in
export const loginUser = userData => dispatch => {
    fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
            // Save token for use
            const {token} = data
            localStorage.setItem("jwtToken", token);

            // Decode for user data
            const decoded = jwt_decode(token)
            console.log(decoded)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err
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
    dispatch(setCurrentUser({}))
}