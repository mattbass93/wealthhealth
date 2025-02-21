import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/store";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "../assets/CreateEmployee.css";
import { states, initialFormState, autoFillData } from "../utils/data";
import { handleInputChange, handleFormSubmit, resetForm } from "../utils/functions";

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  return (
    <div>
      <h1>HRnet - Redux</h1>

      {/* Lien vers la liste des employés */}
      <Link to="/employees" className="employee-list-link">
        📋 Voir la liste des employés
      </Link>

      {/* Bouton pour remplir automatiquement */}
      <button className="fill-form-btn" onClick={() => setFormData(autoFillData)}>
        Remplir automatiquement
      </button>

      <div className="create-employee">
        <h2>Créer un employé</h2>
        <form onSubmit={(e) => handleFormSubmit(e, formData, dispatch, addEmployee, setIsModalOpen, () => resetForm(setFormData, initialFormState))}>
          <label>Prénom :</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={(e) => handleInputChange(e, setFormData)} required />

          <label>Nom :</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={(e) => handleInputChange(e, setFormData)} required />

          <label>Date de naissance :</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={(e) => handleInputChange(e, setFormData)} required />

          <label>Date de début :</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={(e) => handleInputChange(e, setFormData)} required />

          <fieldset className="address">
            <legend>Adresse</legend>

            <label>Rue :</label>
            <input type="text" name="street" value={formData.street} onChange={(e) => handleInputChange(e, setFormData)} required />

            <label>Ville :</label>
            <input type="text" name="city" value={formData.city} onChange={(e) => handleInputChange(e, setFormData)} required />

            <label>État :</label>
            <select name="state" value={formData.state} onChange={(e) => handleInputChange(e, setFormData)} required>
              {states.map((st) => (
                <option key={st.abbreviation} value={st.abbreviation}>
                  {st.name}
                </option>
              ))}
            </select>

            <label>Code Postal :</label>
            <input type="text" name="zipCode" value={formData.zipCode} onChange={(e) => handleInputChange(e, setFormData)} required />
          </fieldset>

          <label>Département :</label>
          <select name="department" value={formData.department} onChange={(e) => handleInputChange(e, setFormData)}>
            <option value="Sales">Ventes</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Ingénierie</option>
            <option value="Human Resources">Ressources humaines</option>
            <option value="Legal">Juridique</option>
          </select>

          <button type="submit">Créer</button>
        </form>

        {/* Modale de confirmation */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Employé ajouté avec succès !</h2>
        </Modal>
      </div>
    </div>
  );
};

export default CreateEmployee;
