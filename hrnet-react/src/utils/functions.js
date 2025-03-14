export const isValidName = (name) => {
    const nameRegex = /^[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ-]*$/;
    return nameRegex.test(name);
};

export const isValidBirthDate = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    return birthDate <= minAgeDate;
};

export const isValidStartDate = (startDate) => {
    const selectedDate = new Date(startDate);
    const today = new Date();
    return selectedDate <= today;
};

export const isValidZipCode = (zipcode) => {
    const zipcodeRegex = /^[0-9]+$/;
    return zipcodeRegex.test(zipcode);
};

export const isValidCity = (city) => {
    const cityRegex = /^[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]*(?:[\s-][A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]*)*$/;
    return cityRegex.test(city);
};


export const handleInputChange = (e, setFormData) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export const resetForm = (setFormData, initialFormState) => {
    setFormData(initialFormState);
};
