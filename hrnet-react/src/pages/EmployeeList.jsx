import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee, setSearchTerm, setItemsPerPage, setCurrentPage } from "../redux/store";
import { Link } from "react-router-dom";
import "../assets/EmployeeList.css";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees, searchTerm, itemsPerPage, currentPage } = useSelector((state) => state.employees);

  // Filtrer les employés en fonction de la recherche
  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.department} ${emp.city} ${emp.state}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Gestion de la pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="employee-list">
      <h2>Employés Actuels</h2>

      {/* Barre de recherche et filtres */}
      <div className="controls">
        <label>
          Afficher
          <select value={itemsPerPage} onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          entrées
        </label>

        <input
          type="text"
          placeholder="Rechercher un employé..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      {/* Table des employés */}
      {displayedEmployees.length === 0 ? (
        <p>Aucun employé trouvé.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Date d&apos;embauche</th>
              <th>Département</th>
              <th>Rue</th>
              <th>Ville</th>
              <th>État</th>
              <th>Code Postal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.startDate}</td>
                <td>{emp.department}</td>
                <td>{emp.street}</td>
                <td>{emp.city}</td>
                <td>{emp.state}</td>
                <td>{emp.zipCode}</td>
                <td>
                  <button className="delete-btn" onClick={() => dispatch(deleteEmployee(index))}>
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))} disabled={currentPage === 1}>
          ⬅ Précédent
        </button>
        <span>Page {currentPage} sur {totalPages || 1}</span>
        <button onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))} disabled={currentPage === totalPages || totalPages === 0}>
          Suivant ➡
        </button>
      </div>

      <Link to="/" className="back-button">🏠 Retour à l&apos;accueil</Link>
    </div>
  );
};

export default EmployeeList;
