import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/ErrorPage";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route element={<Dashboard />} path="/" />
          {/* 404 pages */}
          <Route
            element={
              <Error
                errorMsg="Uh Oh! 😥"
                link="/"
                desc="Looks like this page doesn't exist"
              />
            }
            path="*"
          />
        </Routes>
      </Router>
      <p className="devstext">Code by Abisola :)</p>
    </div>
  );
}

export default App;
