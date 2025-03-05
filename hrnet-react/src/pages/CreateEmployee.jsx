import { useDispatch, useSelector } from "react-redux";
import { addEmployee, setFormData, setErrorMessage, setIsModalOpen } from "../redux/store";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "../assets/CreateEmployee.css";
import { states, departments, autoFillData } from "../utils/data";
import { isValidBirthDate, isValidStartDate, isValidName, isValidCity, isValidDepartment } from "../utils/functions";

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const { formData, errorMessage, isModalOpen } = useSelector((state) => state.employees);

  const handleInputChange = (e) => {
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setErrorMessage("")); // Reset errors

    // Validation du prénom
    if (!isValidName(formData.firstName)) {
      dispatch(setErrorMessage("The first name must start with an uppercase letter and contain only letters, hyphens, and spaces."));
      return;
    }

    // Validation du nom
    if (!isValidName(formData.lastName)) {
      dispatch(setErrorMessage("The last name must start with an uppercase letter and contain only letters, hyphens, and spaces."));
      return;
    }

    // Validation de la ville
    if (!isValidCity(formData.city)) {
      dispatch(setErrorMessage("The city must start with an uppercase letter and contain only letters and spaces."));
      return;
    }

    // Validation du département (doit être un nombre)
    if (!isValidDepartment(formData.department)) {
      dispatch(setErrorMessage("The department must be a number."));
      return;
    }

    // Validation de la date de naissance
    if (!isValidBirthDate(formData.dateOfBirth)) {
      dispatch(setErrorMessage("The employee must be at least 18 years old."));
      return;
    }

    // Validation de la date de début
    if (!isValidStartDate(formData.startDate)) {
      dispatch(setErrorMessage("The start date cannot be in the future."));
      return;
    }

    // Ajout de l'employé via Redux
    dispatch(addEmployee(formData));
    dispatch(setIsModalOpen(true)); // Ouvrir la modale

    // Réinitialisation du formulaire
    dispatch(setFormData(autoFillData));
  };

  return (
    <div>
      <h1>HRnet - React</h1>

      <Link to="/employees" className="employee-list-link">
        📋 View Employees
      </Link>

      <button className="fill-form-btn" onClick={() => dispatch(setFormData(autoFillData))}>
        Autofill Form
      </button>

      <div className="create-employee">
        <h2>Create Employee</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleFormSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />

          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />

          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input id="dateOfBirth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />

          <label htmlFor="startDate">Start Date:</label>
          <input id="startDate" type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street:</label>
            <input id="street" type="text" name="street" value={formData.street} onChange={handleInputChange} required />

            <label htmlFor="city">City:</label>
            <input id="city" type="text" name="city" value={formData.city} onChange={handleInputChange} required />

            <label htmlFor="state">State:</label>
              <select id="state" name="state" value={formData.state} onChange={handleInputChange} required>
                {states.map((st) => (
                  <option key={st.abbreviation} value={st.abbreviation}>
                    {st.name}
                  </option>
                ))}
              </select>
            
            <label htmlFor="zipCode">Zip Code:</label>
            <input id="zipCode" type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
          </fieldset>
            
          <label htmlFor="department">Department:</label>
            <select id="department" name="department" value={formData.department} onChange={handleInputChange} required>
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.name}
                </option>
              ))}
            </select>
          
          <button type="submit">Create</button>
        </form>


        <Modal isOpen={isModalOpen} onClose={() => dispatch(setIsModalOpen(false))}>
          <h2>Employee Successfully Added!</h2>
        </Modal>
      </div>
    </div>
  );
};

export default CreateEmployee;
