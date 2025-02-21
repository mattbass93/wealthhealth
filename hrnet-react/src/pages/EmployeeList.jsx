import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Charger les employés depuis localStorage
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  return (
    <div className="employee-list">
      <h2>Employés Actuels</h2>

      {employees.length === 0 ? (
        <p>Aucun employé enregistré.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Date de naissance</th>
              <th>Date dembauche</th>
              <th>Département</th>
              <th>Adresse</th>
              <th>Action</th> {/* Nouvelle colonne pour le bouton supprimer */}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.dateOfBirth}</td>
                <td>{emp.startDate}</td>
                <td>{emp.department}</td>
                <td>{`${emp.street}, ${emp.city}, ${emp.state} ${emp.zipCode}`}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/" className="back-button">🏠 Retour à laccueil</Link>
    </div>
  );
};

export default EmployeeList;
