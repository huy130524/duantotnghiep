import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupon: null,
  },
  reducers: {
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    clearCoupon: (state) => {
      state.coupon = null;
    },
  },
});

export const { setCoupon, clearCoupon } = couponSlice.actions;
export const selectCoupon = (state) => state.coupon.coupon;
export default couponSlice.reducer;
