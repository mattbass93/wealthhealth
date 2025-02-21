// Fonction pour gérer les changements des inputs
export const handleInputChange = (e, setFormData) => {
    setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
    }));
};

// Fonction de soumission du formulaire
export const handleFormSubmit = (e, formData, dispatch, addEmployee, setIsModalOpen, resetForm) => {
    e.preventDefault();

    dispatch(addEmployee(formData)); // Envoi à Redux
    setIsModalOpen(true); // Affiche la modal de confirmation
    resetForm(); // Réinitialise le formulaire
};

// Fonction pour réinitialiser le formulaire
export const resetForm = (setFormData, initialFormState) => {
    setFormData(initialFormState);
};
