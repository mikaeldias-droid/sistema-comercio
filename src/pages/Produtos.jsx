import { useState } from "react";
import "./Produtos.css";

function Produtos() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Arroz", categoria: "Alimentos", preco: "25,00", estoque: 20 },
    { id: 2, nome: "Feijão", categoria: "Alimentos", preco: "8,00", estoque: 15 },
  ]);

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [observacao, setObservacao] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  function limparCampos() {
    setNome("");
    setCategoria("");
    setPreco("");
    setEstoque("");
    setObservacao("");
    setEditandoId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editandoId) {
      setProdutos(
        produtos.map((p) =>
          p.id === editandoId
            ? { ...p, nome, categoria, preco, estoque }
            : p
        )
      );
    } else {
      const novoProduto = {
        id: Date.now(),
        nome,
        categoria,
        preco,
        estoque,
      };
      setProdutos([...produtos, novoProduto]);
    }

    limparCampos();
  }

  function handleEditar(produto) {
    setNome(produto.nome);
    setCategoria(produto.categoria);
    setPreco(produto.preco);
    setEstoque(produto.estoque);
    setEditandoId(produto.id);
  }

  function handleExcluir(id) {
    setProdutos(produtos.filter((p) => p.id !== id));
  }

  return (
    <div className="produtos-container">
      <h1>Produtos</h1>

      <form className="produtos-form" onSubmit={handleSubmit}>
        <label>Nome do produto</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} />

        <label>Categoria</label>
        <input
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <label>Preço</label>
        <input value={preco} onChange={(e) => setPreco(e.target.value)} />

        <label>Quantidade em estoque</label>
        <input
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />

        <label>Observação</label>
        <input
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />

        <button type="submit">
          {editandoId ? "ATUALIZAR PRODUTO" : "CADASTRAR PRODUTO"}
        </button>
      </form>

      <h2>Produtos cadastrados</h2>
      <table className="produtos-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.categoria}</td>
              <td>R$ {p.preco}</td>
              <td>{p.estoque}</td>
              <td>
                <button className="link-btn" onClick={() => handleEditar(p)}>
                  Editar
                </button>{" "}
                /{" "}
                <button
                  className="link-btn"
                  onClick={() => handleExcluir(p.id)}
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

export default Produtos;