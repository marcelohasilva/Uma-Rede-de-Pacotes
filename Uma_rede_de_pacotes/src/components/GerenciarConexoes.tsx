import { useState, type FormEvent } from "react";
import type { Conexao } from "../models/Conexao";
import type { Dispositivo } from "../models/Dispositivo";

interface GerenciarConexoesProps {
  dispositivos: Dispositivo[];
  conexoes: Conexao[];
  onAdicionar: (conexao: Conexao) => void;
  onRemover: (conexao: Conexao) => void;
}

function GerenciarConexoes({
  dispositivos,
  conexoes,
  onAdicionar,
  onRemover,
}: GerenciarConexoesProps) {
  const primeiroDispositivo = dispositivos[0]?.id ?? "";
  const segundoDispositivo = dispositivos[1]?.id ?? "";
  const [origemId, setOrigemId] = useState(primeiroDispositivo);
  const [destinoId, setDestinoId] = useState(segundoDispositivo);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">("erro");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");

    if (!origemId || !destinoId) {
      mostrarErro("Selecione a origem e o destino.");
      return;
    }

    if (origemId === destinoId) {
      mostrarErro("A origem e o destino devem ser dispositivos diferentes.");
      return;
    }

    const origemExiste = dispositivos.some((dispositivo) => dispositivo.id === origemId);
    const destinoExiste = dispositivos.some((dispositivo) => dispositivo.id === destinoId);

    if (!origemExiste || !destinoExiste) {
      mostrarErro("Os dispositivos selecionados não existem na rede.");
      return;
    }

    const conexaoJaExiste = conexoes.some((conexao) =>
      (conexao.origem === origemId && conexao.destino === destinoId)
      || (conexao.origem === destinoId && conexao.destino === origemId),
    );

    if (conexaoJaExiste) {
      mostrarErro("Essa conexão já existe.");
      return;
    }

    onAdicionar({ origem: origemId, destino: destinoId });
    setMensagem("Conexão adicionada com sucesso.");
    setTipoMensagem("sucesso");
  }

  function mostrarErro(texto: string) {
    setMensagem(texto);
    setTipoMensagem("erro");
  }

  function nomeDoDispositivo(id: string) {
    return dispositivos.find((dispositivo) => dispositivo.id === id)?.nome ?? id;
  }

  return (
    <section className="gerenciar-conexoes" aria-labelledby="titulo-conexoes">
      <h2 id="titulo-conexoes">Gerenciar conexões</h2>

      <form className="formulario-conexoes" onSubmit={handleSubmit}>
        <label>
          Origem
          <select value={origemId} onChange={(event) => setOrigemId(event.target.value)}>
            <option value="">Selecione um dispositivo</option>
            {dispositivos.map((dispositivo) => (
              <option key={dispositivo.id} value={dispositivo.id}>
                {dispositivo.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Destino
          <select value={destinoId} onChange={(event) => setDestinoId(event.target.value)}>
            <option value="">Selecione um dispositivo</option>
            {dispositivos.map((dispositivo) => (
              <option key={dispositivo.id} value={dispositivo.id}>
                {dispositivo.nome}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Adicionar conexão</button>
      </form>

      {mensagem && (
        <p className={`mensagem-conexao mensagem-${tipoMensagem}`} role="alert">
          {mensagem}
        </p>
      )}

      <div className="lista-conexoes">
        <h3>Conexões</h3>
        {conexoes.length === 0 ? (
          <p className="contador-pacotes">Nenhuma conexão cadastrada.</p>
        ) : (
          conexoes.map((conexao, index) => (
            <div className="item-conexao" key={`${conexao.origem}-${conexao.destino}-${index}`}>
              <span>
                {nomeDoDispositivo(conexao.origem)} <strong>↔</strong> {nomeDoDispositivo(conexao.destino)}
              </span>
              <button type="button" onClick={() => onRemover(conexao)}>
                Remover
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default GerenciarConexoes;
