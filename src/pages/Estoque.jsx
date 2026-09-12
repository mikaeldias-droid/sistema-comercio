import { useState } from "react";
import "./Estoque.css";

function Estoque() {
  const [itens, setItens] = useState([
    { id: 1, produto: "Arroz", quantidade: 20, minima: 10, observacao: "" },
    { id: 2, produto: "Feijão", quantidade: 5, minima: 10, observacao: "" },
  ]);

  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [minima, setMinima] = useState("");
  const [observacao, setObservacao] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  function limparCampos() {
    setProduto("");
    setQuantidade("");
    setMinima("");
    setObservacao("");
    setEditandoId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editandoId) {
      setItens(
        itens.map((i) =>
          i.id === editandoId
            ? {
                ...i,
                produto,
                quantidade: Number(quantidade),
                minima: Number(minima),
                observacao,
              }
            : i
        )
      );
    } else {
      const novoItem = {
        id: Date.now(),
        produto,
        quantidade: Number(quantidade),
        minima: Number(minima),
        observacao,
      };
      setItens([...itens, novoItem]);
    }

    limparCampos();
  }

  function handleEditar(item) {
    setProduto(item.produto);
    setQuantidade(item.quantidade);
    setMinima(item.minima);
    setObservacao(item.observacao || "");
    setEditandoId(item.id);
  }

  function getSituacao(item) {
    return item.quantidade <= item.minima ? "Estoque baixo" : "Disponível";
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
                  getSituacao(i) === "Estoque baixo" ? "baixo" : "disponivel"
                }
              >
                {getSituacao(i)}
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