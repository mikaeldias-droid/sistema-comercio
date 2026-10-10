import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/api";
import "./Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      await post("/login", { login: usuario, senha });
      navigate("/usuarios");
    } catch (err) {
      if (err.status === 401) {
        setErro("Usuário ou senha inválidos");
      } else {
        setErro(err.message || "Erro ao conectar à API");
      }
    }
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Sistema de Comércio</h1>

        {erro && (
          <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px", textAlign: "center" }}>
            {erro}
          </p>
        )}

        <label>Usuário</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">ENTRAR</button>
      </form>
    </div>
  );
}

export default Login;