import type { Dispositivo } from "./Dispositivo";
import type { Conexao } from "./Conexao";

export interface Rede {
  id: string;
  nome: string;
  largura: number;
  altura: number;
  dispositivos: Dispositivo[];
  conexoes: Conexao[];
}