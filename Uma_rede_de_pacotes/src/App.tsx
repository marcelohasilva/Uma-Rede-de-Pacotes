import { useEffect, useState } from "react";
import { redeExemplo } from "./data/redeExemplo";
import { redesExemplo } from "./data/redesExemplo";
import MapaRede from "./components/MapaRede";
import ControlePacotes, { ListaPacotes } from "./components/ControlePacotes";
import CadastroDispositivo from "./components/CadastroDispositivo";
import GerenciarConexoes from "./components/GerenciarConexoes";
import GerenciarRedes from "./components/GerenciarRedes";
import SelecionarRede from "./components/SelecionarRede";
import type { Rede } from "./models/Rede";
import type { Pacote } from "./models/Pacote";
import "./App.css";

function App() {
  const [rede, setRede] = useState<Rede>(() => ({
    ...redeExemplo,
    dispositivos: [...redeExemplo.dispositivos],
    conexoes: [...redeExemplo.conexoes],
  }));
  const [pacotes, setPacotes] = useState<Pacote[]>([]);

  useEffect(() => {
    if (pacotes.length === 0 || pacotes.every((pacote) => pacote.status === "entregue")) {
      return;
    }

    const intervalo = window.setInterval(() => {
      setPacotes((pacotesAtuais) => pacotesAtuais.map((pacote) => {
        const ultimaPosicao = pacote.caminho.length - 1;

        if (pacote.status === "entregue") {
          return pacote;
        }

        if (pacote.posicaoAtual >= ultimaPosicao) {
          return { ...pacote, status: "entregue" };
        }

        const proximaPosicao = pacote.posicaoAtual + 1;

        return {
          ...pacote,
          posicaoAtual: proximaPosicao,
          status: proximaPosicao === ultimaPosicao
            ? "entregue"
            : "em_transito",
        };
      }));
    }, 800);

    return () => window.clearInterval(intervalo);
  }, [pacotes]);

  return (
    <main className="app">
      <header className="cabecalho">
        <h1>Uma Rede de Pacotes</h1>
        <p>Simulador de tráfego e roteamento de redes</p>
      </header>

      <section className="painel">
        <h2>{rede.nome}</h2>

        <SelecionarRede
          redes={redesExemplo}
          redeAtualId={rede.id}
          onSelecionar={(redeSelecionada) => {
            setRede(clonarRede(redeSelecionada));
            setPacotes([]);
          }}
        />

        <MapaRede
          largura={rede.largura}
          altura={rede.altura}
          dispositivos={rede.dispositivos}
          conexoes={rede.conexoes}
          pacotes={pacotes}
        />

        <ControlePacotes
          key={`pacotes-${rede.id}-${rede.dispositivos.map((dispositivo) => dispositivo.id).join("-")}`}
          dispositivos={rede.dispositivos}
          conexoes={rede.conexoes}
          onPacotesCriados={setPacotes}
        />

        <ListaPacotes
          pacotes={pacotes}
          dispositivos={rede.dispositivos}
        />

        <CadastroDispositivo
          dispositivos={rede.dispositivos}
          largura={rede.largura}
          altura={rede.altura}
          onAdicionar={(dispositivo) => {
            setRede((redeAtual) => ({
              ...redeAtual,
              dispositivos: [...redeAtual.dispositivos, dispositivo],
            }));
          }}
        />

        <GerenciarConexoes
          key={`conexoes-${rede.id}-${rede.dispositivos.map((dispositivo) => dispositivo.id).join("-")}`}
          dispositivos={rede.dispositivos}
          conexoes={rede.conexoes}
          onAdicionar={(conexao) => {
            setRede((redeAtual) => ({
              ...redeAtual,
              conexoes: [...redeAtual.conexoes, conexao],
            }));
          }}
          onRemover={(conexaoParaRemover) => {
            setRede((redeAtual) => ({
              ...redeAtual,
              conexoes: redeAtual.conexoes.filter(
                (conexao) => conexao !== conexaoParaRemover,
              ),
            }));
          }}
        />

        <GerenciarRedes
          rede={rede}
          onNomeAlterado={(nome) => {
            setRede((redeAtual) => ({ ...redeAtual, nome }));
          }}
          onRedeCarregada={(redeCarregada) => {
            setRede(redeCarregada);
            setPacotes([]);
          }}
        />
      </section>
    </main>
  );
}

function clonarRede(rede: Rede): Rede {
  return {
    ...rede,
    dispositivos: rede.dispositivos.map((dispositivo) => ({
      ...dispositivo,
      interfaces: dispositivo.interfaces.map((interfaceRede) => ({ ...interfaceRede })),
    })),
    conexoes: rede.conexoes.map((conexao) => ({ ...conexao })),
  };
}

export default App;