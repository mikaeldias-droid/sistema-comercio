import { useState, useEffect } from "react";
import { get, post } from "../services/api";
import "./Produtos.css";

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [observacao, setObservacao] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  function formatarPrecoParaEnvio(valor) {
    if (typeof valor === "number") return valor;
    const str = String(valor).trim().replace(",", ".");
    return parseFloat(str) || 0;
  }

  function formatarPrecoExibicao(valor) {
    if (valor === undefined || valor === null || valor === "") return "0,00";
    const num = Number(valor);
    if (isNaN(num)) return String(valor).replace(".", ",");
    return num.toFixed(2).replace(".", ",");
  }

  async function carregarProdutos() {
    try {
      const data = await get("/produtos");
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function limparCampos() {
    setNome("");
    setCategoria("");
    setPreco("");
    setEstoque("");
    setObservacao("");
    setEditandoId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editandoId) {
      // Atualização local temporária na Tarefa 5
      setProdutos(
        produtos.map((p) =>
          p.id === editandoId
            ? { ...p, nome, categoria, preco: formatarPrecoParaEnvio(preco), estoque, observacao }
            : p
        )
      );
    } else {
      // Cadastro via API
      try {
        const payload = {
          nome,
          categoria,
          preco: formatarPrecoParaEnvio(preco),
          estoque: parseInt(estoque, 10) || 0,
          observacao,
        };
        await post("/produtos", payload);
        await carregarProdutos();
      } catch (err) {
        console.error("Erro ao cadastrar produto:", err);
      }
    }

    limparCampos();
  }

  function handleEditar(produto) {
    setNome(produto.nome);
    setCategoria(produto.categoria);
    setPreco(formatarPrecoExibicao(produto.preco));
    setEstoque(produto.estoque);
    setObservacao(produto.observacao || "");
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
              <td>R$ {formatarPrecoExibicao(p.preco)}</td>
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