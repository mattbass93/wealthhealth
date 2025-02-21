import { configureStore, createSlice } from "@reduxjs/toolkit";

// État initial
const initialState = {
    employees: JSON.parse(localStorage.getItem("employees")) || [],
    searchTerm: "",
    itemsPerPage: 10,
    currentPage: 1,
};

// Création du slice Redux
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
            state.currentPage = 1; // Réinitialiser à la première page
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

// Export des actions
export const { addEmployee, deleteEmployee, setSearchTerm, setItemsPerPage, setCurrentPage } = employeeSlice.actions;

// Création du store Redux
const store = configureStore({
    reducer: {
        employees: employeeSlice.reducer,
    },
});

export default store;
