import { configureStore } from "@reduxjs/toolkit";
import parseReducer from "./slices/parseSlice";
import chatReducer from "./slices/chatSlice";
import statsReducer from "./slices/statsSlice";
export const store = configureStore({
	reducer: {
		parse: parseReducer,
		chat: chatReducer,
		stats: statsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
