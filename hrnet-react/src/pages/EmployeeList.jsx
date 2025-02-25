import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee, setSearchTerm, setItemsPerPage, setCurrentPage } from "../redux/store";
import { Link } from "react-router-dom";
import "../assets/EmployeeList.css";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees, searchTerm, itemsPerPage, currentPage } = useSelector((state) => state.employees);

  // Filter employees based on search input
  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.department} ${emp.city} ${emp.state}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination management
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="employee-list">
      <h2>Current Employees</h2>

      {/* Search bar and filters */}
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

      {/* Employee table */}
      {displayedEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Start Date</th>
              <th>Department</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
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

