import { useState, useEffect } from "react";
import { get, post, put, del } from "../services/api";
import "./Produtos.css";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [sucesso, setSucesso] = useState("");
  const [erro, setErro] = useState("");

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
    setCarregando(true);
    try {
      const data = await get("/produtos");
      setProdutos(data);
    } catch (err) {
      setErro("Erro ao carregar produtos. Verifique se a API está em execução.");
    } finally {
      setCarregando(false);
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
    setErro("");
    setSucesso("");

    try {
      const payload = {
        nome,
        categoria,
        preco: formatarPrecoParaEnvio(preco),
        estoque: parseInt(estoque, 10) || 0,
        observacao,
      };

      if (editandoId) {
        await put(`/produtos/${editandoId}`, payload);
        setSucesso("Produto atualizado com sucesso!");
      } else {
        await post("/produtos", payload);
        setSucesso("Produto cadastrado com sucesso!");
      }

      await carregarProdutos();
      limparCampos();
    } catch (err) {
      setErro(err.message || "Erro ao salvar produto.");
    }
  }

  function handleEditar(produto) {
    setNome(produto.nome);
    setCategoria(produto.categoria);
    setPreco(formatarPrecoExibicao(produto.preco));
    setEstoque(produto.estoque);
    setObservacao(produto.observacao || "");
    setEditandoId(produto.id);
    setSucesso("");
    setErro("");
  }

  async function handleExcluir(id) {
    setErro("");
    setSucesso("");
    try {
      await del(`/produtos/${id}`);
      setSucesso("Produto excluído com sucesso!");
      await carregarProdutos();
    } catch (err) {
      setErro(err.message || "Erro ao excluir produto.");
    }
  }

  return (
    <div className="produtos-container">
      <h1>Produtos</h1>

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

      {carregando ? (
        <p style={{ color: "#6b7280", fontSize: "14px", margin: "16px 0" }}>Carregando...</p>
      ) : (
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
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#6b7280", padding: "16px" }}>
                  Nenhum produto cadastrado.
                </td>
              </tr>
            ) : (
              produtos.map((p) => (
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
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Produtos;