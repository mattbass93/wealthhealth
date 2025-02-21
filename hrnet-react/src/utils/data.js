// Liste des États
export const states = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "California", abbreviation: "CA" },
    { name: "Florida", abbreviation: "FL" },
    { name: "New York", abbreviation: "NY" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Washington", abbreviation: "WA" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" },
];

// Valeurs initiales du formulaire
export const initialFormState = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "AL", // Premier état de la liste par défaut
    zipCode: "",
    department: "Sales",
};

// Valeurs pour le remplissage automatique du formulaire
export const autoFillData = {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-05-15",
    startDate: "2023-09-01",
    street: "123 Main Street",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    department: "Engineering",
};
