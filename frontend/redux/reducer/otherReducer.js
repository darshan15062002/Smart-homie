import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer({}, (builder) => {
    builder.addCase("loadDeviceRequest", (state) => {
        state.loading = true
    }).addCase("addDeviceRequest", (state) => {
        state.loading = true
    }).addCase("removeDeviceRequest", (state) => {
        state.loading = true
    }).addCase("updateDeviceRequest", (state) => {
        state.loading = true
    }).addCase("deleteDeviceRequest", (state) => {
        state.loading = true
    })

    builder.addCase("loadDeviceSuccess", (state, action) => {
        state.loading = false
        state.devices = action.payload
    }).addCase("addDeviceSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    }).addCase("removeDeviceSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    }).addCase("updateDeviceSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    }).addCase("deleteDeviceSuccess", (state, action) => {
        state.loading = false
        state.message = action.payload
    })


    builder.addCase("loadDeviceFail", (state, action) => {
        state.loading = false
        state.devices = action.payload
    }).addCase("addDeviceFail", (state, action) => {
        state.loading = false
        state.error = action.payload


    }).addCase("removeDeviceFail", (state, action) => {
        state.loading = false
        state.error = action.payload

    }).addCase("updateDeviceFail", (state, action) => {
        state.loading = false
        state.error = action.payload

    }).addCase("deleteDeviceFail", (state, action) => {
        state.loading = false
        state.error = action.payload

    })



    builder.addCase("clearError", (state) => {

        state.error = null;
    })
    builder.addCase("clearMessage", (state) => {

        state.message = null;
    })






}

)