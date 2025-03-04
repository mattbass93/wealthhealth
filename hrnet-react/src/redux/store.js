import { configureStore, createSlice } from "@reduxjs/toolkit";

// État initial
// État initial
const initialState = {
    employees: JSON.parse(localStorage.getItem("employees")) || [],
    searchTerm: "",
    itemsPerPage: 10,
    currentPage: 1,
    formData: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        street: "",
        city: "",
        state: "AL", // Premier état de la liste par défaut
        zipCode: "",
        department: "Sales",
    },
    errorMessage: "",
    isModalOpen: false,
    sortConfig: { key: null, direction: null } // ✅ Ajout du tri
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
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setErrorMessage: (state, action) => {  // 🔹 Ajout de la gestion des erreurs
            state.errorMessage = action.payload;
        },
        setIsModalOpen: (state, action) => {  // 🔹 Ajout du contrôle de la modale
            state.isModalOpen = action.payload;
        },
        setSortConfig: (state, action) => { // ✅ Ajout du tri
            state.sortConfig = action.payload;
        }
    },
});

// Export des actions Redux
export const {
    addEmployee, deleteEmployee,
    setSearchTerm, setItemsPerPage, setCurrentPage,
    setFormData, setErrorMessage, setIsModalOpen, setSortConfig
} = employeeSlice.actions;


// Création du store Redux
const store = configureStore({
    reducer: {
        employees: employeeSlice.reducer,
    },
});

export default store;
