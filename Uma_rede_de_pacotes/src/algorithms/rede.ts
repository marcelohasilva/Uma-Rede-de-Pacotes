function converterIpv4ParaNumero(ip: string): number[] | null {
  const partes = ip.split(".");

  if (partes.length !== 4) {
    return null;
  }

  const octetos = partes.map(Number);

  if (octetos.some((octeto, index) => partes[index] === "" || !Number.isInteger(octeto) || octeto < 0 || octeto > 255)) {
    return null;
  }

  return octetos;
}

export function estaoNaMesmaRede(ipA: string, ipB: string, mascara: string): boolean {
  const octetosA = converterIpv4ParaNumero(ipA);
  const octetosB = converterIpv4ParaNumero(ipB);
  const octetosMascara = converterIpv4ParaNumero(mascara);

  if (!octetosA || !octetosB || !octetosMascara) {
    return false;
  }

  return octetosA.every((octeto, index) =>
    (octeto & octetosMascara[index]) === (octetosB[index] & octetosMascara[index]),
  );
}

export function calcularEnderecoRede(ip: string, mascara: string): string {
  const octetosIp = converterIpv4ParaNumero(ip);
  const octetosMascara = converterIpv4ParaNumero(mascara);

  if (!octetosIp || !octetosMascara) {
    return "IP inválido";
  }

  const enderecoRede = octetosIp.map((octeto, index) => octeto & octetosMascara[index]);
  const prefixo = calcularPrefixo(mascara);

  return `${enderecoRede.join(".")}/${prefixo}`;
}

function calcularPrefixo(mascara: string): number {
  const octetosMascara = converterIpv4ParaNumero(mascara);

  if (!octetosMascara) {
    return 0;
  }

  return octetosMascara.reduce((total, octeto) => total + octeto.toString(2).split("1").length - 1, 0);
}
