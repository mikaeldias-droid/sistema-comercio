import { useState, useEffect } from "react";
import { get, post } from "../services/api";
import "./Usuarios.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function carregarUsuarios() {
    try {
      const data = await get("/usuarios");
      setUsuarios(data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function limparCampos() {
    setNome("");
    setLogin("");
    setSenha("");
    setPerfil("");
    setEditandoId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editandoId) {
      // Atualiza usuário existente (local temporário na Tarefa 3)
      setUsuarios(
        usuarios.map((u) =>
          u.id === editandoId ? { ...u, nome, login, perfil } : u
        )
      );
    } else {
      // Cria novo usuário via API
      try {
        await post("/usuarios", { nome, login, senha, perfil });
        await carregarUsuarios();
      } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
      }
    }

    limparCampos();
  }

  function handleEditar(usuario) {
    setNome(usuario.nome);
    setLogin(usuario.login);
    setSenha("");
    setPerfil(usuario.perfil);
    setEditandoId(usuario.id);
  }

  function handleExcluir(id) {
    setUsuarios(usuarios.filter((u) => u.id !== id));
  }

  return (
    <div className="usuarios-container">
      <h1>Usuários</h1>

      <form className="usuarios-form" onSubmit={handleSubmit}>
        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} />

        <label>Login</label>
        <input value={login} onChange={(e) => setLogin(e.target.value)} />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <label>Perfil</label>
        <input value={perfil} onChange={(e) => setPerfil(e.target.value)} />

        <button type="submit">
          {editandoId ? "ATUALIZAR USUÁRIO" : "CADASTRAR USUÁRIO"}
        </button>
      </form>

      <h2>Usuários cadastrados</h2>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Login</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.login}</td>
              <td>{u.perfil}</td>
              <td>
                <button className="link-btn" onClick={() => handleEditar(u)}>
                  Editar
                </button>{" "}
                /{" "}
                <button
                  className="link-btn"
                  onClick={() => handleExcluir(u.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;