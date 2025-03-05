import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Importation dynamique (lazy loading)
const CreateEmployee = lazy(() => import("./pages/CreateEmployee"));
const EmployeeList = lazy(() => import("./pages/EmployeeList"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;




