import { configureStore } from '@reduxjs/toolkit';
import paymentreducer from "./slice/PaymentSlice";
import resultreducer from "./slice/ResultSlice";
import authLoginreducer from "./slice/userAuthSlice";
import userDatareducer from "./slice/userStoreSlice";
export const store = configureStore({
    reducer: {
        payment: paymentreducer,
        result: resultreducer,
        authLogin: authLoginreducer,
        userData: userDatareducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
