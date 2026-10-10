import { useState, useEffect } from "react";
import { get, post, put } from "../services/api";
import "./Estoque.css";

function Estoque() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState("");
  const [erro, setErro] = useState("");

  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [minima, setMinima] = useState("");
  const [observacao, setObservacao] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function carregarEstoque() {
    setCarregando(true);
    try {
      const data = await get("/estoque");
      setItens(data);
    } catch (err) {
      setErro("Erro ao carregar estoque. Verifique se a API está em execução.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarEstoque();
  }, []);

  function limparCampos() {
    setProduto("");
    setQuantidade("");
    setMinima("");
    setObservacao("");
    setEditandoId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const payload = {
        produto,
        quantidade: Number(quantidade),
        minima: Number(minima),
        observacao,
      };

      if (editandoId) {
        await put(`/estoque/${editandoId}`, payload);
        setSucesso("Item de estoque atualizado com sucesso!");
      } else {
        await post("/estoque", payload);
        setSucesso("Item de estoque cadastrado com sucesso!");
      }

      await carregarEstoque();
      limparCampos();
    } catch (err) {
      setErro(err.message || "Erro ao salvar item de estoque.");
    }
  }

  function handleEditar(item) {
    setProduto(item.produto);
    setQuantidade(item.quantidade);
    setMinima(item.minima);
    setObservacao(item.observacao || "");
    setEditandoId(item.id);
    setSucesso("");
    setErro("");
  }

  return (
    <div className="estoque-container">
      <h1>Estoque</h1>

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

      <form className="estoque-form" onSubmit={handleSubmit}>
        <label>Produto</label>
        <input value={produto} onChange={(e) => setProduto(e.target.value)} />

        <label>Quantidade atual</label>
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <label>Quantidade mínima</label>
        <input
          type="number"
          value={minima}
          onChange={(e) => setMinima(e.target.value)}
        />

        <label>Observação</label>
        <input
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />

        <button type="submit">
          {editandoId ? "ATUALIZAR ITEM" : "ATUALIZAR ESTOQUE"}
        </button>
      </form>

      <h2>Controle de estoque</h2>

      {carregando ? (
        <p style={{ color: "#6b7280", fontSize: "14px", margin: "16px 0" }}>Carregando...</p>
      ) : (
        <table className="estoque-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {itens.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "#6b7280", padding: "16px" }}>
                  Nenhum item cadastrado no estoque.
                </td>
              </tr>
            ) : (
              itens.map((i) => (
                <tr key={i.id}>
                  <td>{i.produto}</td>
                  <td>{i.quantidade}</td>
                  <td
                    className={
                      i.situacao === "Estoque baixo" ? "baixo" : "disponivel"
                    }
                  >
                    {i.situacao}
                  </td>
                  <td>
                    <button className="link-btn" onClick={() => handleEditar(i)}>
                      Editar
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

export default Estoque;