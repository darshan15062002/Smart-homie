import axios from "axios"
import { server } from "../store"

export const login = (text, password) => async (dispatch) => {
    console.log(text, password);
    try {
        dispatch({
            type: "loginRequest",

        })

        // Axios
        await axios.post(`${server}/api/v1/user/login`, {
            email: text, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            "withCredentials": true
        })

        dispatch({
            type: "loginSuccess",
            payload: "Welcome Back"
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: "loginFailed",
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest",

        })

        // Axios
        const { data } = await axios.get(`${server}/api/v1/user/me`, {
            "withCredentials": true
        })

        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "loadUserFailed",
            payload: error.response.data.message
        })
    }

}
export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest",
        })

        // Axios
        const { data } = await axios.get(`${server}/api/v1/user/logout`, {
            "withCredentials": true
        })
        console.log(data.message);
        dispatch({
            type: "logoutSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "logoutFailed",
            payload: error.response.data.message
        })
    }

}

export const register = (formData) => async (dispatch) => {
    console.log(formData);
    try {
        dispatch({
            type: "registerRequest",

        })

        // Axios
        const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
            headers: {
                "Content-Type": "application/json"
            },
            "withCredentials": true
        })
        console.log(data);

        dispatch({
            type: "registerSuccess",
            payload: data.message || "register successfully"
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: "registerFailed",
            payload: error.response.data.message
        })
    }
}