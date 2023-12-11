import { configureStore } from '@reduxjs/toolkit'
import { userReeducer } from './reducer/userReducer'



export const store = configureStore({
    reducer: {
        user: userReeducer,


    }
})


export const server = "http://localhost:4000"