import { useState, useEffect } from "react";
import { get, post, put, del } from "../services/api";
import "./Usuarios.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState("");
  const [erro, setErro] = useState("");

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function carregarUsuarios() {
    setCarregando(true);
    try {
      const data = await get("/usuarios");
      setUsuarios(data);
    } catch (err) {
      setErro("Erro ao carregar usuários. Verifique se a API está em execução.");
    } finally {
      setCarregando(false);
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
    setErro("");
    setSucesso("");

    try {
      if (editandoId) {
        const payload = { nome, login, perfil };
        if (senha.trim()) {
          payload.senha = senha;
        }
        await put(`/usuarios/${editandoId}`, payload);
        setSucesso("Usuário atualizado com sucesso!");
      } else {
        await post("/usuarios", { nome, login, senha, perfil });
        setSucesso("Usuário cadastrado com sucesso!");
      }

      await carregarUsuarios();
      limparCampos();
    } catch (err) {
      setErro(err.message || "Erro ao salvar usuário.");
    }
  }

  function handleEditar(usuario) {
    setNome(usuario.nome);
    setLogin(usuario.login);
    setSenha("");
    setPerfil(usuario.perfil);
    setEditandoId(usuario.id);
    setSucesso("");
    setErro("");
  }

  async function handleExcluir(id) {
    setErro("");
    setSucesso("");
    try {
      await del(`/usuarios/${id}`);
      setSucesso("Usuário excluído com sucesso!");
      await carregarUsuarios();
    } catch (err) {
      setErro(err.message || "Erro ao excluir usuário.");
    }
  }

  return (
    <div className="usuarios-container">
      <h1>Usuários</h1>

      {sucesso && (
        <div style={{ backgroundColor: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px" }}>
          {sucesso}
        </div>
      )}

      {erro && (
        <div style={{ backgroundColor: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca", padding: "10px 14px", borderRadius: "8px", marginBottom: "16px", fontSize: "13px" }}>
          {erro}
        </div>
      )}

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

      {carregando ? (
        <p style={{ color: "#6b7280", fontSize: "14px", margin: "16px 0" }}>Carregando...</p>
      ) : (
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
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#6b7280", padding: "16px" }}>
                  Nenhum usuário cadastrado.
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
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
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Usuarios;