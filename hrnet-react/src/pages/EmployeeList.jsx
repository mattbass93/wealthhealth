import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee, setSearchTerm, setItemsPerPage, setCurrentPage, setSortConfig } from "../redux/store";
import { Link } from "react-router-dom";
import "../assets/EmployeeList.css";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees, searchTerm, itemsPerPage, currentPage, sortConfig } = useSelector((state) => state.employees);

  // Fonction pour gérer le tri
  const handleSort = (key, direction) => {
    if (sortConfig.key === key && sortConfig.direction === direction) {
      return; // Ignore si on reclique sur la même icône déjà active
    }
    dispatch(setSortConfig({ key, direction }));
  };

  // Appliquer le tri sur les employés
  let sortedEmployees = [...employees];
  if (sortConfig.key) {
    sortedEmployees.sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      // Vérifier si on trie par Zip Code (numérique)
      if (sortConfig.key === "zipCode") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }

  // Filtrage des employés
  const filteredEmployees = sortedEmployees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.department} ${emp.city} ${emp.state} ${emp.zipCode} ${emp.dateOfBirth} ${emp.startDate}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Gestion de la pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="employee-list">
      <h2>Current Employees</h2>

      {/* Barre de recherche et filtres */}
      <div className="controls">
        <label>
          Show
          <select value={itemsPerPage} onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          entries
        </label>

        <input
          type="text"
          placeholder="Search for an employee..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      {/* Tableau des employés */}
      {displayedEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              {[
                { key: "firstName", label: "First Name" },
                { key: "lastName", label: "Last Name" },
                { key: "startDate", label: "Start Date" },
                { key: "department", label: "Department" },
                { key: "dateOfBirth", label: "Date of Birth" },
                { key: "street", label: "Street" },
                { key: "city", label: "City" },
                { key: "state", label: "State" },
                { key: "zipCode", label: "Zip Code" },
              ].map(({ key, label }) => (
                <th key={key}>
                  {label}
                  <span className="sort-icons">
                    <span
                      className={`sort-icon ${sortConfig.key === key && sortConfig.direction === "asc" ? "active" : ""}`}
                      onClick={() => handleSort(key, "asc")}
                    >
                      🔼
                    </span>
                    <span
                      className={`sort-icon ${sortConfig.key === key && sortConfig.direction === "desc" ? "active" : ""}`}
                      onClick={() => handleSort(key, "desc")}
                    >
                      🔽
                    </span>
                  </span>
                </th>
              ))}
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {displayedEmployees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.startDate}</td>
                <td>{emp.department}</td>
                <td>{emp.dateOfBirth}</td>
                <td>{emp.street}</td>
                <td>{emp.city}</td>
                <td>{emp.state}</td>
                <td>{emp.zipCode}</td>
                <td>
                  <button className="delete-btn" onClick={() => dispatch(deleteEmployee(index))}>
                    🗑️ Delete
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
          ⬅ Previous
        </button>
        <span>Page {currentPage} of {totalPages || 1}</span>
        <button onClick={() => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)))} disabled={currentPage === totalPages || totalPages === 0}>
          Next ➡
        </button>
      </div>

      <Link to="/" className="back-button">🏠 Back to Home</Link>
    </div>
  );
};

export default EmployeeList;
