import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialFormState } from "../utils/data";

const initialState = {
    employees: JSON.parse(localStorage.getItem("employees")) || [],
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
            localStorage.setItem("employees", JSON.stringify(state.employees));
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter((_, i) => i !== action.payload);
            localStorage.setItem("employees", JSON.stringify(state.employees));
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



const store = configureStore({
    reducer: {
        employees: employeeSlice.reducer,
    },
});

export default store;
