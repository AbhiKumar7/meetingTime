import { configureStore } from "@reduxjs/toolkit";
import { authreducer } from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});
