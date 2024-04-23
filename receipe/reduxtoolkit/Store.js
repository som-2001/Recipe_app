import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";
import { persistReducer,persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'


const reducer=combineReducers({
    msg:Slice
})

const persistConfig={
    key:'root',
    storage,
    version:1,

}
const persistedReducer=persistReducer(persistConfig,reducer)

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor=persistStore(Store);
