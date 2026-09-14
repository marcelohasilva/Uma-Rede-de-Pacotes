# Uma Rede de Pacotes

Simulador visual de tráfego e roteamento de pacotes em uma rede 2D. O projeto permite montar redes com dispositivos, interfaces, endereços IP e conexões, enviar múltiplos pacotes e acompanhar seus caminhos no mapa.

## Tecnologias

- React
- TypeScript
- Vite
- CSS
- Lucide React
- JSON
- Git/GitHub
- IA/Copilot utilizada no desenvolvimento

## Funcionalidades

- Mapa 2D com dispositivos, conexões e pacotes animados.
- Cadastro de notebooks, smartphones, tablets, servidores e roteadores.
- Interfaces de rede, IPs e máscaras de sub-rede.
- Gerenciamento e remoção de conexões.
- Criação e envio de múltiplos pacotes.
- Estados de pacote: aguardando, em trânsito e entregue.
- Redes pré-configuradas Residencial, Escolar e de Servidores.
- Exportação e importação de redes em arquivos JSON.
- Layout responsivo para desktop, notebook, tablet e celular.

## Algoritmo

O roteamento utiliza BFS (Busca em Largura). O algoritmo transforma as conexões em um grafo bidirecional, começa no dispositivo de origem e visita os vizinhos por níveis até encontrar o destino. Os predecessores visitados permitem reconstruir o caminho completo do pacote.

## Arrays

`Dispositivo[]` armazena dispositivos, `Conexao[]` armazena ligações, `Pacote[]` representa o tráfego temporário, `InterfaceRede[]` guarda interfaces de cada dispositivo e `Rede[]` contém redes pré-configuradas. O projeto usa `map`, `find`, `filter`, criação imutável de arrays e percursos de arrays na interface, nos serviços e no grafo do BFS.

## Como executar

No diretório `Uma_rede_de_pacotes`:

```bash
npm install
npm run dev
npm run build
```

## Estrutura

```text
src/
├── algorithms/    # BFS e cálculo de redes/sub-redes
├── components/    # Mapa, controles, cadastros e painéis
├── data/          # Rede inicial e redes pré-configuradas
├── models/        # Tipos Rede, Dispositivo, Conexao, Pacote e interfaces
├── services/      # Criação de pacotes e arquivos JSON
├── App.tsx        # Estado principal e composição da aplicação
└── App.css        # Estilos e responsividade
```

## Demonstração

Selecione uma rede, escolha origem, destino e quantidade de pacotes. Em uma rota escolar:

```text
Notebook
	↓
Roteador
	↓
Servidor
```

O pacote recebe uma rota calculada pelo BFS e percorre visualmente o mapa até o destino, atualizando seu status para `Entregue`.