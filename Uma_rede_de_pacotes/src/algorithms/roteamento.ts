import type { Conexao } from "../models/Conexao";
import type { Dispositivo } from "../models/Dispositivo";

export function encontrarRota(
  dispositivos: Dispositivo[],
  conexoes: Conexao[],
  origemId: string,
  destinoId: string,
): string[] {
  if (origemId === destinoId) {
    return [origemId];
  }

  const idsDosDispositivos = new Set(dispositivos.map((dispositivo) => dispositivo.id));

  if (!idsDosDispositivos.has(origemId) || !idsDosDispositivos.has(destinoId)) {
    return [];
  }

  const grafo = new Map<string, string[]>();

  for (const dispositivo of dispositivos) {
    grafo.set(dispositivo.id, []);
  }

  for (const conexao of conexoes) {
    if (!grafo.has(conexao.origem) || !grafo.has(conexao.destino)) {
      continue;
    }

    grafo.get(conexao.origem)?.push(conexao.destino);
    grafo.get(conexao.destino)?.push(conexao.origem);
  }

  const fila = [origemId];
  const anteriores = new Map<string, string | null>([[origemId, null]]);

  while (fila.length > 0) {
    const dispositivoAtual = fila.shift() as string;

    if (dispositivoAtual === destinoId) {
      const rota: string[] = [];
      let dispositivoNaRota: string | null = destinoId;

      while (dispositivoNaRota !== null) {
        rota.unshift(dispositivoNaRota);
        dispositivoNaRota = anteriores.get(dispositivoNaRota) ?? null;
      }

      return rota;
    }

    for (const vizinho of grafo.get(dispositivoAtual) ?? []) {
      if (anteriores.has(vizinho)) {
        continue;
      }

      anteriores.set(vizinho, dispositivoAtual);
      fila.push(vizinho);
    }
  }

  return [];
}