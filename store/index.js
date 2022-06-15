import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user.reducer';
import notificationsReducer from "./reducers/notifications.reducer";


export const store = configureStore({
    reducer:{
        user:userReducer,
        notifications:notificationsReducer
    }
})