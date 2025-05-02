import { configureStore } from "@reduxjs/toolkit";
import couponReducer from "./couponReducer";

const store = configureStore({
  reducer: {
    coupon: couponReducer,
  },
});

export default store;
