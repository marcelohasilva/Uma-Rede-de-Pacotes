import type { Conexao } from "../models/Conexao";
import type { Dispositivo } from "../models/Dispositivo";
import type { InterfaceRede } from "../models/InterfaceRede";
import type { Rede } from "../models/Rede";

export function exportarRede(rede: Rede, nomeArquivo = rede.nome): void {
  const conteudo = JSON.stringify(rede, null, 2);
  const arquivo = new Blob([conteudo], { type: "application/json" });
  const url = URL.createObjectURL(arquivo);
  const link = document.createElement("a");
  const nomeSeguro = nomeArquivo.trim().replace(/[^a-z0-9\-_]+/gi, "-").replace(/^-|-$/g, "") || "rede";

  link.href = url;
  link.download = nomeSeguro.endsWith(".json") ? nomeSeguro : `${nomeSeguro}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function importarRede(arquivo: File): Promise<Rede> {
  const conteudo = await arquivo.text();
  let dados: unknown;

  try {
    dados = JSON.parse(conteudo);
  } catch {
    throw new Error("Arquivo de rede inválido.");
  }

  return validarRede(dados);
}

function validarRede(dados: unknown): Rede {
  if (!ehObjeto(dados)
    || typeof dados.id !== "string"
    || !dados.id.trim()
    || typeof dados.nome !== "string"
    || !dados.nome.trim()
    || typeof dados.largura !== "number"
    || typeof dados.altura !== "number"
    || !Number.isInteger(dados.largura)
    || !Number.isInteger(dados.altura)
    || dados.largura <= 0
    || dados.altura <= 0
    || !Array.isArray(dados.dispositivos)
    || !Array.isArray(dados.conexoes)) {
    throw new Error("Arquivo de rede inválido.");
  }

  const largura = dados.largura as number;
  const altura = dados.altura as number;
  const dispositivos = dados.dispositivos.map((dispositivo) => validarDispositivo(dispositivo));
  const idsDosDispositivos = new Set(dispositivos.map((dispositivo) => dispositivo.id));
  const conexoes = dados.conexoes.map((conexao) => validarConexao(conexao, idsDosDispositivos));

  return {
    id: dados.id,
    nome: dados.nome,
    largura,
    altura,
    dispositivos,
    conexoes,
  };
}

function validarDispositivo(dados: unknown): Dispositivo {
  if (!ehObjeto(dados)
    || typeof dados.id !== "string"
    || typeof dados.nome !== "string"
    || !ehTipoDispositivo(dados.tipo)
    || typeof dados.ip !== "string"
    || !Number.isInteger(dados.x)
    || !Number.isInteger(dados.y)) {
    throw new Error("Arquivo de rede inválido.");
  }

  const id = dados.id as string;
  const x = dados.x as number;
  const y = dados.y as number;
  const interfaces = Array.isArray(dados.interfaces)
    ? dados.interfaces.map((interfaceDados) => validarInterface(interfaceDados, id))
    : [criarInterfaceLegada(dados)];

  return {
    id,
    nome: dados.nome,
    tipo: dados.tipo as Dispositivo["tipo"],
    ip: dados.ip,
    x,
    y,
    interfaces,
  };
}

function validarInterface(dados: unknown, dispositivoId: string): InterfaceRede {
  if (!ehObjeto(dados)
    || typeof dados.id !== "string"
    || typeof dados.nome !== "string"
    || typeof dados.ip !== "string"
    || typeof dados.mascara !== "string"
    || typeof dados.dispositivoId !== "string"
    || dados.dispositivoId !== dispositivoId) {
    throw new Error("Arquivo de rede inválido.");
  }

  return {
    id: dados.id,
    nome: dados.nome,
    ip: dados.ip,
    mascara: dados.mascara,
    dispositivoId: dados.dispositivoId,
  };
}

function validarConexao(dados: unknown, idsDosDispositivos: Set<string>): Conexao {
  if (!ehObjeto(dados)
    || typeof dados.origem !== "string"
    || typeof dados.destino !== "string"
    || !idsDosDispositivos.has(dados.origem)
    || !idsDosDispositivos.has(dados.destino)) {
    throw new Error("Arquivo de rede inválido.");
  }

  return { origem: dados.origem, destino: dados.destino };
}

function criarInterfaceLegada(dispositivo: Record<string, unknown>): InterfaceRede {
  return {
    id: `${dispositivo.id}-interface-01`,
    nome: "Interface principal",
    ip: dispositivo.ip as string,
    mascara: "255.255.255.0",
    dispositivoId: dispositivo.id as string,
  };
}

function ehTipoDispositivo(valor: unknown): valor is Dispositivo["tipo"] {
  return valor === "notebook"
    || valor === "smartphone"
    || valor === "tablet"
    || valor === "servidor"
    || valor === "roteador";
}

function ehObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}
