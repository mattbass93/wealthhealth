import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialFormState } from "../utils/data";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    employees: [],
    searchTerm: "",
    itemsPerPage: 10,
    currentPage: 1,
    formData: initialFormState,
    errorMessage: "",
    isModalOpen: false,
    sortConfig: { key: null, direction: null }
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter((_, i) => i !== action.payload);
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        },
        setSortConfig: (state, action) => {
            state.sortConfig = action.payload;
        }
    },
});

export const {
    addEmployee, deleteEmployee,
    setSearchTerm, setItemsPerPage, setCurrentPage,
    setFormData, setErrorMessage, setIsModalOpen, setSortConfig
} = employeeSlice.actions;

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["employees"],
};

const persistedReducer = persistReducer(persistConfig, employeeSlice.reducer);

const store = configureStore({
    reducer: {
        employees: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
