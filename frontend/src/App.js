import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FarmerSignup from "./pages/FarmerSignup";
import FarmerLogin from "./pages/FarmerLogin";
import FarmerDashboard from "./pages/FarmerDashboard";
import VetPrescription from "./pages/VetPrescription";
import RegisterAnimal from "./pages/RegisterAnimal";
function App() {
  return (
    <Router>
      <nav>
        <Link to="/farmer/signup">Farmer Signup</Link> | 
        <Link to="/farmer/login">Farmer Login</Link>
      </nav>
      <Routes>
        <Route path="/farmer/signup" element={<FarmerSignup />} />
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/vet/prescription" element={<VetPrescription/>}/>
        <Route path="/farmer/register-animal" element={<RegisterAnimal />} />

      </Routes>
    </Router>
  );
}

export default App;
