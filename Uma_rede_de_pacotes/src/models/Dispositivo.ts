import type { InterfaceRede } from "./InterfaceRede";

export type TipoDispositivo =
  | "notebook"
  | "smartphone"
  | "tablet"
  | "servidor"
  | "roteador";

export interface Dispositivo {
  id: string;
  nome: string;
  tipo: TipoDispositivo;
  ip: string;
  x: number;
  y: number;
  interfaces: InterfaceRede[];
}