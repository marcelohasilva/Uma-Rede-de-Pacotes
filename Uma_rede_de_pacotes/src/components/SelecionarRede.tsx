import type { Rede } from "../models/Rede";

interface SelecionarRedeProps {
  redes: Rede[];
  redeAtualId: string;
  onSelecionar: (rede: Rede) => void;
}

function SelecionarRede({ redes, redeAtualId, onSelecionar }: SelecionarRedeProps) {
  return (
    <section className="selecionar-rede" aria-labelledby="titulo-redes-disponiveis">
      <h2 id="titulo-redes-disponiveis">Redes disponíveis</h2>
      <label>
        Escolha uma rede pré-configurada
        <select
          value={redes.some((rede) => rede.id === redeAtualId) ? redeAtualId : ""}
          onChange={(event) => {
            const redeSelecionada = redes.find((rede) => rede.id === event.target.value);
            if (redeSelecionada) {
              onSelecionar(redeSelecionada);
            }
          }}
        >
          <option value="">Selecione uma rede</option>
          {redes.map((rede) => (
            <option key={rede.id} value={rede.id}>
              {rede.nome}
            </option>
          ))}
        </select>
      </label>

      <div className="cartoes-redes">
        {redes.map((rede) => (
          <button
            className={rede.id === redeAtualId ? "cartao-rede ativo" : "cartao-rede"}
            key={rede.id}
            type="button"
            onClick={() => onSelecionar(rede)}
          >
            <strong>{rede.nome}</strong>
            <span>{rede.dispositivos.length} dispositivos</span>
            <span>{rede.conexoes.length} conexões</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default SelecionarRede;
