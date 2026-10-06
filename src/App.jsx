import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Produtos from "./pages/Produtos";
import Estoque from "./pages/Estoque";
import "./App.css";

function Menu() {
  const linkClass = ({ isActive }) => (isActive ? "app-nav-link active" : "app-nav-link");

  return (
    <nav className="app-nav">
      <NavLink to="/" className={linkClass}>Login</NavLink>
      <NavLink to="/usuarios" className={linkClass}>Usuários</NavLink>
      <NavLink to="/produtos" className={linkClass}>Produtos</NavLink>
      <NavLink to="/estoque" className={linkClass}>Estoque</NavLink>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/estoque" element={<Estoque />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;