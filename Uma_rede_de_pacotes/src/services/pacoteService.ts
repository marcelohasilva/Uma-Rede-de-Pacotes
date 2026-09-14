import { encontrarRota } from "../algorithms/roteamento";
import type { Conexao } from "../models/Conexao";
import type { Dispositivo } from "../models/Dispositivo";
import type { Pacote } from "../models/Pacote";

let proximoIdDoPacote = 1;

export function criarPacotes(
  origemId: string,
  destinoId: string,
  quantidade: number,
  dispositivos: Dispositivo[],
  conexoes: Conexao[],
): Pacote[] {
  const origemExiste = dispositivos.some((dispositivo) => dispositivo.id === origemId);
  const destinoExiste = dispositivos.some((dispositivo) => dispositivo.id === destinoId);

  if (!origemExiste) {
    throw new Error(`Dispositivo de origem não encontrado: ${origemId}`);
  }

  if (!destinoExiste) {
    throw new Error(`Dispositivo de destino não encontrado: ${destinoId}`);
  }

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    throw new Error("A quantidade de pacotes deve ser um número inteiro maior que zero");
  }

  const caminho = encontrarRota(dispositivos, conexoes, origemId, destinoId);

  if (caminho.length === 0) {
    throw new Error(`Não existe rota entre ${origemId} e ${destinoId}`);
  }

  return Array.from({ length: quantidade }, () => ({
    id: proximoIdDoPacote++,
    origem: origemId,
    destino: destinoId,
    caminho: [...caminho],
    posicaoAtual: 0,
    status: "aguardando" as const,
  }));
}