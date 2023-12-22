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
    }).addCase("createRoomRequest", (state) => {
        state.loading = true;
    }).addCase("updateRoomRequest", (state) => {
        state.loading = true;
    }).addCase("deleteRoomRequest", (state) => {
        state.loading = true;
    }).addCase("loadRoomRequest", (state) => {
        state.loading = true;
    }).addCase("turnOnRoomRequest", (state) => {
        state.loading = true;
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
    }).addCase("createRoomSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
    }).addCase("updateRoomSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
    }).addCase("deleteRoomSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
    }).addCase("loadRoomSuccess", (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
    }).addCase("turnOnRoomSuccess", (state, action) => {
        state.loading = false;
        state.message = action.payload;
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

    }).addCase("createRoomFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
        .addCase("updateRoomFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("deleteRoomFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase("loadRoomFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase("turnOnRoomFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });



    builder.addCase("clearError", (state) => {

        state.error = null;
    })
    builder.addCase("clearMessage", (state) => {

        state.message = null;
    })






}

)