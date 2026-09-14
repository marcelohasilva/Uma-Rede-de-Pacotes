import type { Rede } from "../models/Rede";

export const redeExemplo: Rede = {
  id: "rede-01",
  nome: "Rede Principal",
  largura: 10,
  altura: 8,

  dispositivos: [
    {
      id: "notebook-01",
      nome: "Notebook 01",
      tipo: "notebook",
      ip: "192.168.1.10",
      x: 1,
      y: 2,
      interfaces: [
        {
          id: "interface-notebook-01-wifi",
          nome: "Wi-Fi",
          ip: "192.168.1.10",
          mascara: "255.255.255.0",
          dispositivoId: "notebook-01",
        },
      ],
    },
    {
      id: "roteador-01",
      nome: "Roteador 01",
      tipo: "roteador",
      ip: "192.168.1.1",
      x: 4,
      y: 2,
      interfaces: [
        {
          id: "interface-roteador-01-1",
          nome: "Ethernet 1",
          ip: "192.168.1.1",
          mascara: "255.255.255.0",
          dispositivoId: "roteador-01",
        },
        {
          id: "interface-roteador-01-2",
          nome: "Ethernet 2",
          ip: "192.168.2.1",
          mascara: "255.255.255.0",
          dispositivoId: "roteador-01",
        },
      ],
    },
    {
      id: "servidor-01",
      nome: "Servidor 01",
      tipo: "servidor",
      ip: "192.168.2.10",
      x: 7,
      y: 5,
      interfaces: [
        {
          id: "interface-servidor-01-ethernet",
          nome: "Ethernet",
          ip: "192.168.2.10",
          mascara: "255.255.255.0",
          dispositivoId: "servidor-01",
        },
      ],
    },
    {
      id: "smartphone-01",
      nome: "Smartphone 01",
      tipo: "smartphone",
      ip: "192.168.1.20",
      x: 2,
      y: 6,
      interfaces: [
        {
          id: "interface-smartphone-01-wifi",
          nome: "Wi-Fi",
          ip: "192.168.1.20",
          mascara: "255.255.255.0",
          dispositivoId: "smartphone-01",
        },
      ],
    },
  ],

  conexoes: [
    {
      origem: "notebook-01",
      destino: "roteador-01",
    },
    {
      origem: "smartphone-01",
      destino: "roteador-01",
    },
    {
      origem: "roteador-01",
      destino: "servidor-01",
    },
  ],
};