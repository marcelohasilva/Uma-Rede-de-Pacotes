import type { Dispositivo, TipoDispositivo } from "../models/Dispositivo";
import type { InterfaceRede } from "../models/InterfaceRede";
import type { Rede } from "../models/Rede";

const mascara24 = "255.255.255.0";

function criarInterface(
  dispositivoId: string,
  numero: number,
  nome: string,
  ip: string,
  mascara = mascara24,
): InterfaceRede {
  return {
    id: `${dispositivoId}-interface-${numero}`,
    nome,
    ip,
    mascara,
    dispositivoId,
  };
}

function criarDispositivo(
  id: string,
  nome: string,
  tipo: TipoDispositivo,
  ip: string,
  x: number,
  y: number,
  interfaces: InterfaceRede[],
): Dispositivo {
  return { id, nome, tipo, ip, x, y, interfaces };
}

export const redesExemplo: Rede[] = [
  {
    id: "rede-residencial",
    nome: "Rede Residencial",
    largura: 10,
    altura: 8,
    dispositivos: [
      criarDispositivo("res-notebook-01", "Notebook Residencial", "notebook", "192.168.1.10", 1, 2, [
        criarInterface("res-notebook-01", 1, "Wi-Fi", "192.168.1.10"),
      ]),
      criarDispositivo("res-roteador-01", "Roteador Residencial", "roteador", "192.168.1.1", 4, 3, [
        criarInterface("res-roteador-01", 1, "Wi-Fi", "192.168.1.1"),
      ]),
      criarDispositivo("res-smartphone-01", "Smartphone Residencial", "smartphone", "192.168.1.20", 2, 6, [
        criarInterface("res-smartphone-01", 1, "Wi-Fi", "192.168.1.20"),
      ]),
      criarDispositivo("res-tablet-01", "Tablet Residencial", "tablet", "192.168.1.30", 7, 5, [
        criarInterface("res-tablet-01", 1, "Wi-Fi", "192.168.1.30"),
      ]),
    ],
    conexoes: [
      { origem: "res-notebook-01", destino: "res-roteador-01" },
      { origem: "res-smartphone-01", destino: "res-roteador-01" },
      { origem: "res-tablet-01", destino: "res-roteador-01" },
    ],
  },
  {
    id: "rede-escolar",
    nome: "Rede Escolar",
    largura: 10,
    altura: 8,
    dispositivos: [
      criarDispositivo("esc-notebook-01", "Notebook da Sala 01", "notebook", "192.168.1.10", 1, 1, [
        criarInterface("esc-notebook-01", 1, "Ethernet", "192.168.1.10"),
      ]),
      criarDispositivo("esc-smartphone-01", "Smartphone da Sala 01", "smartphone", "192.168.1.20", 1, 6, [
        criarInterface("esc-smartphone-01", 1, "Wi-Fi", "192.168.1.20"),
      ]),
      criarDispositivo("esc-roteador-01", "Roteador Escolar", "roteador", "192.168.1.1", 4, 3, [
        criarInterface("esc-roteador-01", 1, "Ethernet 1", "192.168.1.1"),
        criarInterface("esc-roteador-01", 2, "Ethernet 2", "192.168.2.1"),
      ]),
      criarDispositivo("esc-servidor-01", "Servidor Escolar", "servidor", "192.168.2.10", 8, 3, [
        criarInterface("esc-servidor-01", 1, "Ethernet", "192.168.2.10"),
      ]),
      criarDispositivo("esc-notebook-02", "Notebook da Biblioteca", "notebook", "192.168.2.20", 8, 6, [
        criarInterface("esc-notebook-02", 1, "Ethernet", "192.168.2.20"),
      ]),
    ],
    conexoes: [
      { origem: "esc-notebook-01", destino: "esc-roteador-01" },
      { origem: "esc-smartphone-01", destino: "esc-roteador-01" },
      { origem: "esc-roteador-01", destino: "esc-servidor-01" },
      { origem: "esc-roteador-01", destino: "esc-notebook-02" },
    ],
  },
  {
    id: "rede-servidores",
    nome: "Rede de Servidores",
    largura: 10,
    altura: 8,
    dispositivos: [
      criarDispositivo("srv-notebook-01", "Notebook Administrativo", "notebook", "10.0.1.10", 1, 1, [
        criarInterface("srv-notebook-01", 1, "Ethernet", "10.0.1.10"),
      ]),
      criarDispositivo("srv-smartphone-01", "Smartphone Técnico", "smartphone", "10.0.1.20", 1, 6, [
        criarInterface("srv-smartphone-01", 1, "Wi-Fi", "10.0.1.20"),
      ]),
      criarDispositivo("srv-roteador-01", "Roteador de Servidores", "roteador", "10.0.1.1", 4, 3, [
        criarInterface("srv-roteador-01", 1, "Rede Administrativa", "10.0.1.1"),
        criarInterface("srv-roteador-01", 2, "Rede de Servidores", "10.0.2.1"),
      ]),
      criarDispositivo("srv-roteador-02", "Roteador de Backup", "roteador", "10.0.2.2", 6, 5, [
        criarInterface("srv-roteador-02", 1, "Rede de Servidores", "10.0.2.2"),
        criarInterface("srv-roteador-02", 2, "Rede de Backup", "10.0.3.1"),
      ]),
      criarDispositivo("srv-server-01", "Servidor de Arquivos", "servidor", "10.0.2.10", 8, 2, [
        criarInterface("srv-server-01", 1, "Ethernet", "10.0.2.10"),
      ]),
      criarDispositivo("srv-server-02", "Servidor de Aplicações", "servidor", "10.0.3.10", 8, 6, [
        criarInterface("srv-server-02", 1, "Ethernet", "10.0.3.10"),
      ]),
    ],
    conexoes: [
      { origem: "srv-notebook-01", destino: "srv-roteador-01" },
      { origem: "srv-smartphone-01", destino: "srv-roteador-01" },
      { origem: "srv-roteador-01", destino: "srv-server-01" },
      { origem: "srv-roteador-01", destino: "srv-roteador-02" },
      { origem: "srv-roteador-02", destino: "srv-server-02" },
    ],
  },
];
