import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Produtos from "./pages/Produtos";
import Estoque from "./pages/Estoque";
import "./App.css";

function Menu() {
  return (
    <nav style={{ padding: "16px", display: "flex", gap: "16px", justifyContent: "center", borderBottom: "1px solid #e0e0e0" }}>
      <Link to="/">Login</Link>
      <Link to="/usuarios">Usuários</Link>
      <Link to="/produtos">Produtos</Link>
      <Link to="/estoque">Estoque</Link>
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