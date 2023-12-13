import { configureStore } from '@reduxjs/toolkit'
import { userReeducer } from './reducer/userReducer'
import { otherReducer } from './reducer/otherReducer'



export const store = configureStore({
    reducer: {
        user: userReeducer,
        otherState: otherReducer
    }

})


export const server = "https://smart-homie.onrender.com"