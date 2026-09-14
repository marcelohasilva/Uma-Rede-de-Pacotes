import { useState, type FormEvent } from "react";
import { criarPacotes } from "../services/pacoteService";
import type { Conexao } from "../models/Conexao";
import type { Dispositivo } from "../models/Dispositivo";
import type { Pacote } from "../models/Pacote";

interface ControlePacotesProps {
  dispositivos: Dispositivo[];
  conexoes: Conexao[];
  onPacotesCriados: (pacotes: Pacote[]) => void;
}

function ControlePacotes({
  dispositivos,
  conexoes,
  onPacotesCriados,
}: ControlePacotesProps) {
  const primeiroDispositivo = dispositivos[0]?.id ?? "";
  const dispositivoServidor = dispositivos.find(
    (dispositivo) => dispositivo.tipo === "servidor",
  );
  const segundoDispositivo = dispositivoServidor?.id
    ?? dispositivos[1]?.id
    ?? primeiroDispositivo;

  const [origemId, setOrigemId] = useState(primeiroDispositivo);
  const [destinoId, setDestinoId] = useState(segundoDispositivo);
  const [quantidade, setQuantidade] = useState(3);
  const [mensagemErro, setMensagemErro] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagemErro("");

    if (quantidade < 1 || !Number.isInteger(quantidade)) {
      setMensagemErro("A quantidade deve ser um número inteiro maior ou igual a 1.");
      return;
    }

    if (origemId === destinoId) {
      setMensagemErro("A origem e o destino devem ser dispositivos diferentes.");
      return;
    }

    try {
      const pacotes = criarPacotes(
        origemId,
        destinoId,
        quantidade,
        dispositivos,
        conexoes,
      );

      onPacotesCriados(pacotes);
    } catch (error) {
      setMensagemErro(
        error instanceof Error
          ? error.message
          : "Não foi possível criar os pacotes.",
      );
    }
  }

  return (
    <section className="controle-pacotes" aria-labelledby="titulo-controle-pacotes">
      <h2 id="titulo-controle-pacotes">Enviar pacotes</h2>

      <form className="formulario-pacotes" onSubmit={handleSubmit}>
        <label>
          Origem
          <select value={origemId} onChange={(event) => setOrigemId(event.target.value)}>
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
            {dispositivos.map((dispositivo) => (
              <option key={dispositivo.id} value={dispositivo.id}>
                {dispositivo.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantidade
          <input
            type="number"
            min="1"
            step="1"
            value={quantidade}
            onChange={(event) => setQuantidade(Number(event.target.value))}
          />
        </label>

        <button type="submit">Enviar Pacotes</button>
      </form>

      {mensagemErro && <p className="mensagem-erro" role="alert">{mensagemErro}</p>}

    </section>
  );
}

export function ListaPacotes({
  pacotes,
  dispositivos,
}: {
  pacotes: Pacote[];
  dispositivos: Dispositivo[];
}) {
  function nomeDoDispositivo(id: string) {
    return dispositivos.find((dispositivo) => dispositivo.id === id)?.nome ?? id;
  }

  return (
    <section className="lista-pacotes" aria-labelledby="titulo-pacotes">
      <h2 id="titulo-pacotes">Pacotes</h2>
      {pacotes.length === 0 ? (
        <p className="contador-pacotes">Nenhum pacote criado ainda.</p>
      ) : (
        <div className="cartoes-pacotes">
          {pacotes.map((pacote) => (
            <article className="cartao-pacote" key={pacote.id}>
              <h3>Pacote #{pacote.id}</h3>
              <p><strong>Origem:</strong> {nomeDoDispositivo(pacote.origem)}</p>
              <p><strong>Destino:</strong> {nomeDoDispositivo(pacote.destino)}</p>
              <p><strong>Caminho:</strong> {pacote.caminho.map(nomeDoDispositivo).join(" → ")}</p>
              <p><strong>Status:</strong> {formatarStatus(pacote.status)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function formatarStatus(status: Pacote["status"]) {
  switch (status) {
    case "em_transito":
      return "Em trânsito";
    case "entregue":
      return "Entregue";
    default:
      return "Aguardando";
  }
}

export default ControlePacotes;
