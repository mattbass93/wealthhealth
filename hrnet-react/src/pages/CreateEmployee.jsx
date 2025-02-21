import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "../assets/CreateEmployee.css"; // Styles

// Liste des États
const states = [
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

const CreateEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(states[0].abbreviation);
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState("Sales");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      street,
      city,
      state,
      zipCode,
      department,
    };

    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    storedEmployees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(storedEmployees));

    setIsModalOpen(true);
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setStartDate("");
    setStreet("");
    setCity("");
    setState(states[0].abbreviation);
    setZipCode("");
    setDepartment("Sales");
  };

  // Fonction pour remplir automatiquement les champs du formulaire
  const fillFormAutomatically = () => {
    setFirstName("John");
    setLastName("Doe");
    setDateOfBirth("1990-05-15");
    setStartDate("2023-09-01");
    setStreet("123 Main Street");
    setCity("Los Angeles");
    setState("CA");
    setZipCode("90001");
    setDepartment("Engineering");
  };

  return (
    <div>
        <h1>HRnet - Nouvelle version React</h1>

      {/* Lien vers la liste des employés avant le formulaire */}
      <Link to="/employees" className="employee-list-link">
        📋 Voir la liste des employés
      </Link>

      {/* Bouton pour remplir automatiquement le formulaire */}
      <button className="fill-form-btn" onClick={fillFormAutomatically}>
        Remplir automatiquement
      </button>

      <div className="create-employee">
        <h2>Créer un employé</h2>
        <form onSubmit={handleSubmit}>
          <label>Prénom :</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

          <label>Nom :</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

          <label>Date de naissance :</label>
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />

          <label>Date de début :</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

          <fieldset className="address">
            <legend>Adresse</legend>

            <label>Rue :</label>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />

            <label>Ville :</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />

            <label>État :</label>
            <select value={state} onChange={(e) => setState(e.target.value)} required>
              {states.map((st) => (
                <option key={st.abbreviation} value={st.abbreviation}>
                  {st.name}
                </option>
              ))}
            </select>

            <label>Code Postal :</label>
            <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
          </fieldset>

          <label>Département :</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
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
