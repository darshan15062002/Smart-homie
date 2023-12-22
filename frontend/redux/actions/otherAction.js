import axios from "axios"
import { server } from "../store";

export const createDevices = (formData) => async (dispatch) => {


    try {
        dispatch({
            type: 'addDeviceRequest',
        })

        const res = await axios.post(`${server}/api/v1/device/create`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                "withCredentials": true
            }
        )


        dispatch({
            type: "addDeviceSuccess",
            payload: res.data.message
        })

    } catch (error) {

        dispatch({
            type: "addDeviceFail",
            payload: error.response.data.message
        })
    }
}

export const loadDevice = () => async (dispatch) => {
    try {
        dispatch({ type: 'loadDeviceRequest' })

        const res = await axios.get(`${server}/api/v1/device`, {
            "withCredentials": true
        })




        dispatch({
            type: "loadDeviceSuccess",
            payload: res.data.device
        })
    } catch (error) {

        dispatch({
            type: "loadDeviceFail",
            payload: error.response.data.message
        })
    }
}

export const updateDevice = (deviceId, newState) => async (dispatch) => {
    try {
        dispatch({ type: 'updateDeviceRequest' });

        const res = await axios.put(
            `${server}/api/v1/device/update/${deviceId}`,
            { state: newState },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                "withCredentials": true
            }
        );

        dispatch({
            type: "updateDeviceSuccess",
            payload: res.data.message
        });
    } catch (error) {
        dispatch({
            type: "updateDeviceFail",
            payload: error.response.data.message
        });
    }
};

export const deleteDevice = (deviceId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteDeviceRequest' });

        const res = await axios.delete(`${server}/api/v1/device/delete/${deviceId}`, {
            "withCredentials": true
        });

        dispatch({
            type: "deleteDeviceSuccess",
            payload: res.data.message
        });
    } catch (error) {
        dispatch({
            type: "deleteDeviceFail",
            payload: error.response.data.message
        });
    }
};