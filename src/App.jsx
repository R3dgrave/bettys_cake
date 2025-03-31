import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import MenuDetails from "./Components/MenuDetails";
import Navbar from "./Components/Navbar";
import { AuthProvider } from "./Context/AuthContext";
import { PostresProvider } from "./Context/PostresContext";
import PrivateRoute from "./Components/PrivateRoute";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PostresProvider>
          <main className="w-full mx-auto">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/postre/:id" element={<MenuDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contacto" element={<Contact />} />
              <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
              <Route path="*" element={<h1>Página no encontrada</h1>} />
            </Routes>
          </main>
          <Footer />
        </PostresProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
