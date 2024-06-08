import "./App.css";
// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Inscription from "./components/Inscription";
import Carte from "./components/Base";
  
function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/map" element={<Carte />} />
        </Routes>
      </Router>
    </>
  );
}
  
export default App;