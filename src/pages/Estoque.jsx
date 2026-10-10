import { useState, useEffect } from "react";
import { get, post, put } from "../services/api";
import "./Estoque.css";

function Estoque() {
  const [itens, setItens] = useState([]);

  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [minima, setMinima] = useState("");
  const [observacao, setObservacao] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function carregarEstoque() {
    try {
      const data = await get("/estoque");
      setItens(data);
    } catch (err) {
      console.error("Erro ao carregar estoque:", err);
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

    try {
      const payload = {
        produto,
        quantidade: Number(quantidade),
        minima: Number(minima),
        observacao,
      };

      if (editandoId) {
        // Atualiza item existente via API
        await put(`/estoque/${editandoId}`, payload);
      } else {
        // Cadastra item via API
        await post("/estoque", payload);
      }

      await carregarEstoque();
      limparCampos();
    } catch (err) {
      console.error("Erro ao salvar item de estoque:", err);
    }
  }

  function handleEditar(item) {
    setProduto(item.produto);
    setQuantidade(item.quantidade);
    setMinima(item.minima);
    setObservacao(item.observacao || "");
    setEditandoId(item.id);
  }

  return (
    <div className="estoque-container">
      <h1>Estoque</h1>

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
          {itens.map((i) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Estoque;