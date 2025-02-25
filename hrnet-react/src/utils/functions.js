// Vérification de l'âge minimum (18 ans)
export const isValidBirthDate = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    return birthDate <= minAgeDate; // Doit être une date d'il y a au moins 18 ans
};

// Vérification que la date de début n'est pas dans le futur
export const isValidStartDate = (startDate) => {
    const selectedDate = new Date(startDate);
    const today = new Date();
    return selectedDate <= today; // Doit être aujourd'hui ou une date passée
};

// Vérification que le prénom et le nom respectent la regex (uniquement lettres, tirets et accents)
export const isValidName = (name) => {
    const nameRegex = /^[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ-]*$/;
    return nameRegex.test(name);
};

// Vérification que le département est un nombre entier
export const isValidDepartment = (department) => {
    const departmentRegex = /^[0-9]+$/; // Seulement des chiffres
    return departmentRegex.test(department);
};

// Vérification que la ville commence par une majuscule et ne contient que des lettres et espaces
export const isValidCity = (city) => {
    const cityRegex = /^[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]*(?:[\s-][A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]*)*$/;
    return cityRegex.test(city);
};



// Gestion des changements des champs
export const handleInputChange = (e, setFormData) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

// Réinitialisation du formulaire après soumission
export const resetForm = (setFormData, initialFormState) => {
    setFormData(initialFormState);
};
