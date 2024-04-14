import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import { Middleware } from "@reduxjs/toolkit";
import CityWeatherReducer from "@/redux/slices/CityWeather";
import ForecastReducer from "@/redux/slices/ForecastSlice";
import CurrentHourlyForecastReducer from "@/redux/slices/CurrentHourlyForecast";
import UnitSlice from "@/redux/slices/UnitSlice";


const rootReducer = combineReducers({
    Unit:UnitSlice,
    CityWeather:CityWeatherReducer,
    Forecast : ForecastReducer,
    CurrentHourlyForecast:CurrentHourlyForecastReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    blacklist: ["Unit","CityWeather"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware: Middleware[] = getDefaultMiddleware({
//     serializableCheck: false,
//     immutableCheck: false
// });

const store = configureStore({
    reducer: persistedReducer,
    // middleware: middleware
});

export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
