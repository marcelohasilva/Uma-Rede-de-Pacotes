import type { Dispositivo } from "../models/Dispositivo";
import type { Conexao } from "../models/Conexao";
import type { Pacote } from "../models/Pacote";
import PacotesAnimados from "./PacotesAnimados";

interface MapaRedeProps {
  largura: number;
  altura: number;
  dispositivos: Dispositivo[];
  conexoes: Conexao[];
  pacotes?: Pacote[];
}

function MapaRede({
  largura,
  altura,
  dispositivos,
  conexoes,
  pacotes = [],
}: MapaRedeProps) {
  const celulas = [];

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      const dispositivo = dispositivos.find(
        (item) => item.x === x && item.y === y
      );

      celulas.push(
        <div
          key={`${x}-${y}`}
          className="celula"
        >
          {dispositivo && (
            <div className="dispositivo">
              <strong>{getIcone(dispositivo.tipo)}</strong>
              <span>{dispositivo.nome}</span>
              <small>{dispositivo.ip}</small>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="area-mapa">
      <div
        className="mapa"
        style={{
          gridTemplateColumns: `repeat(${largura}, 1fr)`,
          gridTemplateRows: `repeat(${altura}, 1fr)`,
        }}
      >
        {celulas}
      </div>

      <svg
        className="linhas-rede"
        viewBox={`0 0 ${largura} ${altura}`}
        preserveAspectRatio="none"
      >
        {conexoes.map((conexao, index) => {
          const origem = dispositivos.find(
            (dispositivo) => dispositivo.id === conexao.origem
          );

          const destino = dispositivos.find(
            (dispositivo) => dispositivo.id === conexao.destino
          );

          if (!origem || !destino) {
            return null;
          }

          return (
            <line
              key={index}
              x1={origem.x + 0.5}
              y1={origem.y + 0.5}
              x2={destino.x + 0.5}
              y2={destino.y + 0.5}
            />
          );
        })}
      </svg>

      <PacotesAnimados
        pacotes={pacotes}
        dispositivos={dispositivos}
        largura={largura}
        altura={altura}
      />
    </div>
  );
}

function getIcone(tipo: Dispositivo["tipo"]) {
  switch (tipo) {
    case "notebook":
      return "💻";

    case "smartphone":
      return "📱";

    case "tablet":
      return "📲";

    case "servidor":
      return "🖥️";

    case "roteador":
      return "🌐";

    default:
      return "❓";
  }
}

export default MapaRede;