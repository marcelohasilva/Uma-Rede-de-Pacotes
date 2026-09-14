import type { Dispositivo } from "../models/Dispositivo";
import type { Pacote } from "../models/Pacote";

interface PacotesAnimadosProps {
  pacotes: Pacote[];
  dispositivos: Dispositivo[];
  largura: number;
  altura: number;
}

function PacotesAnimados({
  pacotes,
  dispositivos,
  largura,
  altura,
}: PacotesAnimadosProps) {
  return (
    <div className="camada-pacotes" aria-label="Pacotes em trânsito">
      {pacotes.map((pacote, indice) => {
        const dispositivoId = pacote.caminho[pacote.posicaoAtual];
        const dispositivo = dispositivos.find((item) => item.id === dispositivoId);

        if (!dispositivo) {
          return null;
        }

        const deslocamento = ((indice % 3) - 1) * 12;

        return (
          <div
            className={`pacote-animado pacote-${pacote.status}`}
            key={pacote.id}
            title={`Pacote #${pacote.id}`}
            style={{
              left: `${((dispositivo.x + 0.5) / largura) * 100}%`,
              top: `${((dispositivo.y + 0.5) / altura) * 100}%`,
              transform: `translate(calc(-50% + ${deslocamento}px), -50%)`,
            }}
          >
            <span>{pacote.id}</span>
          </div>
        );
      })}
    </div>
  );
}

export default PacotesAnimados;
