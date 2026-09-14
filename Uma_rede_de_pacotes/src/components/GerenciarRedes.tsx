import { useRef, useState, type ChangeEvent } from "react";
import { exportarRede, importarRede } from "../services/redeService";
import type { Rede } from "../models/Rede";

interface GerenciarRedesProps {
  rede: Rede;
  onNomeAlterado: (nome: string) => void;
  onRedeCarregada: (rede: Rede) => void;
}

function GerenciarRedes({ rede, onNomeAlterado, onRedeCarregada }: GerenciarRedesProps) {
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">("sucesso");
  const entradaArquivo = useRef<HTMLInputElement>(null);

  function handleExportar() {
    exportarRede(rede, rede.nome);
    setMensagem("Rede exportada com sucesso.");
    setTipoMensagem("sucesso");
  }

  async function handleArquivoSelecionado(event: ChangeEvent<HTMLInputElement>) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) {
      return;
    }

    try {
      const redeCarregada = await importarRede(arquivo);
      onRedeCarregada(redeCarregada);
      setMensagem("Rede carregada com sucesso.");
      setTipoMensagem("sucesso");
    } catch {
      setMensagem("Arquivo de rede inválido.");
      setTipoMensagem("erro");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className="gerenciar-redes" aria-labelledby="titulo-redes">
      <h2 id="titulo-redes">Gerenciar Redes</h2>
      <p className="rede-atual">Rede atual: <strong>{rede.nome}</strong></p>

      <label className="nome-arquivo-rede">
        Nome da rede
        <input
          value={rede.nome}
          onChange={(event) => onNomeAlterado(event.target.value)}
          placeholder="Rede Principal"
        />
      </label>

      <div className="acoes-rede">
        <button type="button" onClick={handleExportar}>Exportar JSON</button>
        <button type="button" onClick={() => entradaArquivo.current?.click()}>
          Carregar JSON
        </button>
        <input
          ref={entradaArquivo}
          className="entrada-arquivo-rede"
          type="file"
          accept="application/json,.json"
          onChange={handleArquivoSelecionado}
        />
      </div>

      {mensagem && (
        <p className={`mensagem-rede mensagem-${tipoMensagem}`} role="status">
          {mensagem}
        </p>
      )}
    </section>
  );
}

export default GerenciarRedes;
