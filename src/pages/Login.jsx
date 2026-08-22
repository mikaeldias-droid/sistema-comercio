import { useState } from "react";
import "./Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
    // Por enquanto só mostra no console.
    // Depois vamos conectar com a lógica real de login.
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>Sistema de Comércio</h1>

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