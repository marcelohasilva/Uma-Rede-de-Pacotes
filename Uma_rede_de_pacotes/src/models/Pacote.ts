export interface Pacote {
  id: number;
  origem: string;
  destino: string;
  caminho: string[];
  posicaoAtual: number;
  status: "aguardando" | "em_transito" | "entregue";
}