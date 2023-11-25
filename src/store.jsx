/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import activeChatSlice from "./slices/activeChatSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    activeChatSlice: activeChatSlice,
  },
});
