import { useState, type FormEvent } from "react";
import type { Dispositivo, TipoDispositivo } from "../models/Dispositivo";
import type { InterfaceRede } from "../models/InterfaceRede";
import { calcularEnderecoRede } from "../algorithms/rede";

interface CadastroDispositivoProps {
  dispositivos: Dispositivo[];
  largura: number;
  altura: number;
  onAdicionar: (dispositivo: Dispositivo) => void;
}

const tiposDispositivo: { valor: TipoDispositivo; nome: string }[] = [
  { valor: "notebook", nome: "Notebook" },
  { valor: "smartphone", nome: "Smartphone" },
  { valor: "tablet", nome: "Tablet" },
  { valor: "servidor", nome: "Servidor" },
  { valor: "roteador", nome: "Roteador" },
];

function CadastroDispositivo({
  dispositivos,
  largura,
  altura,
  onAdicionar,
}: CadastroDispositivoProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<TipoDispositivo>("smartphone");
  const [ip, setIp] = useState("");
  const [nomeInterface, setNomeInterface] = useState("Ethernet");
  const [mascara, setMascara] = useState("255.255.255.0");
  const [nomeSegundaInterface, setNomeSegundaInterface] = useState("");
  const [ipSegundaInterface, setIpSegundaInterface] = useState("");
  const [mascaraSegundaInterface, setMascaraSegundaInterface] = useState("255.255.255.0");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"erro" | "sucesso">("erro");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nomeNormalizado = nome.trim();
    const ipNormalizado = ip.trim();

    if (!nomeNormalizado) {
      mostrarErro("Informe o nome do dispositivo.");
      return;
    }

    if (!ipNormalizado) {
      mostrarErro("Informe o endereço IP.");
      return;
    }

    if (!/^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/.test(ipNormalizado)) {
      mostrarErro("Informe um endereço IPv4 válido, como 192.168.1.10.");
      return;
    }

    if (!nomeInterface.trim()) {
      mostrarErro("Informe o nome da interface.");
      return;
    }

    if (!ipv4Valido(mascara)) {
      mostrarErro("Informe uma máscara IPv4 válida, como 255.255.255.0.");
      return;
    }

    const segundaInterfacePreenchida = nomeSegundaInterface.trim() || ipSegundaInterface.trim();

    if (tipo === "roteador" && segundaInterfacePreenchida) {
      if (!nomeSegundaInterface.trim() || !ipv4Valido(ipSegundaInterface) || !ipv4Valido(mascaraSegundaInterface)) {
        mostrarErro("Preencha corretamente nome, IP e máscara da segunda interface.");
        return;
      }
    }

    if (!Number.isInteger(x) || x < 0 || x >= largura) {
      mostrarErro(`A posição X deve estar entre 0 e ${largura - 1}.`);
      return;
    }

    if (!Number.isInteger(y) || y < 0 || y >= altura) {
      mostrarErro(`A posição Y deve estar entre 0 e ${altura - 1}.`);
      return;
    }

    if (dispositivos.some((dispositivo) => dispositivo.x === x && dispositivo.y === y)) {
      mostrarErro("Já existe um dispositivo nessa posição do mapa.");
      return;
    }

    const id = gerarId(tipo, dispositivos);
    const interfaces: InterfaceRede[] = [
      {
        id: `${id}-interface-01`,
        nome: nomeInterface.trim(),
        ip: ipNormalizado,
        mascara: mascara.trim(),
        dispositivoId: id,
      },
    ];

    if (tipo === "roteador" && segundaInterfacePreenchida) {
      interfaces.push({
        id: `${id}-interface-02`,
        nome: nomeSegundaInterface.trim(),
        ip: ipSegundaInterface.trim(),
        mascara: mascaraSegundaInterface.trim(),
        dispositivoId: id,
      });
    }

    const dispositivo: Dispositivo = {
      id,
      nome: nomeNormalizado,
      tipo,
      ip: ipNormalizado,
      x,
      y,
      interfaces,
    };

    onAdicionar(dispositivo);
    setNome("");
    setIp("");
    setNomeInterface("Ethernet");
    setMascara("255.255.255.0");
    setNomeSegundaInterface("");
    setIpSegundaInterface("");
    setMascaraSegundaInterface("255.255.255.0");
    setX(0);
    setY(0);
    setMensagem("Dispositivo adicionado com sucesso.");
    setTipoMensagem("sucesso");
  }

  function mostrarErro(texto: string) {
    setMensagem(texto);
    setTipoMensagem("erro");
  }

  return (
    <section className="cadastro-dispositivo" aria-labelledby="titulo-cadastro">
      <h2 id="titulo-cadastro">Cadastrar dispositivo</h2>

      <form className="formulario-dispositivo" onSubmit={handleSubmit}>
        <label>
          Nome
          <input value={nome} onChange={(event) => setNome(event.target.value)} />
        </label>

        <label>
          Tipo
          <select value={tipo} onChange={(event) => setTipo(event.target.value as TipoDispositivo)}>
            {tiposDispositivo.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor}>
                {opcao.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Endereço IP
          <input
            value={ip}
            onChange={(event) => setIp(event.target.value)}
            placeholder="192.168.1.10"
          />
        </label>

        <label>
          Nome da interface
          <input value={nomeInterface} onChange={(event) => setNomeInterface(event.target.value)} />
        </label>

        <label>
          Máscara
          <input value={mascara} onChange={(event) => setMascara(event.target.value)} />
        </label>

        <label>
          Posição X
          <input type="number" min="0" max={largura - 1} value={x} onChange={(event) => setX(Number(event.target.value))} />
        </label>

        <label>
          Posição Y
          <input type="number" min="0" max={altura - 1} value={y} onChange={(event) => setY(Number(event.target.value))} />
        </label>

        <button type="submit">Adicionar dispositivo</button>
      </form>

      {tipo === "roteador" && (
        <div className="segunda-interface">
          <h3>Segunda interface do roteador (opcional)</h3>
          <div className="formulario-interface-extra">
            <label>
              Nome
              <input value={nomeSegundaInterface} onChange={(event) => setNomeSegundaInterface(event.target.value)} placeholder="Ethernet 2" />
            </label>
            <label>
              IP
              <input value={ipSegundaInterface} onChange={(event) => setIpSegundaInterface(event.target.value)} placeholder="192.168.2.1" />
            </label>
            <label>
              Máscara
              <input value={mascaraSegundaInterface} onChange={(event) => setMascaraSegundaInterface(event.target.value)} />
            </label>
          </div>
        </div>
      )}

      {mensagem && (
        <p className={`mensagem-cadastro mensagem-${tipoMensagem}`} role="alert">
          {mensagem}
        </p>
      )}

      <div className="dispositivos-cadastrados">
        <h3>Dispositivos cadastrados</h3>
        <div className="lista-dispositivos">
          {dispositivos.map((dispositivo) => (
            <article className="item-dispositivo" key={dispositivo.id}>
              <strong>{getIcone(dispositivo.tipo)} {dispositivo.nome}</strong>
              <span>IP: {dispositivo.ip}</span>
              <small>Posição: ({dispositivo.x}, {dispositivo.y})</small>
              <div className="interfaces-dispositivo">
                {dispositivo.interfaces.map((interfaceRede) => (
                  <span key={interfaceRede.id}>
                    {interfaceRede.nome}: {interfaceRede.ip}/{interfaceRede.mascara}
                    <small>Rede: {calcularEnderecoRede(interfaceRede.ip, interfaceRede.mascara)}</small>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ipv4Valido(valor: string) {
  return /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/.test(valor.trim());
}

function gerarId(tipo: TipoDispositivo, dispositivos: Dispositivo[]) {
  let numero = 1;
  let id = `${tipo}-${String(numero).padStart(2, "0")}`;

  while (dispositivos.some((dispositivo) => dispositivo.id === id)) {
    numero += 1;
    id = `${tipo}-${String(numero).padStart(2, "0")}`;
  }

  return id;
}

function getIcone(tipo: TipoDispositivo) {
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
  }
}

export default CadastroDispositivo;
