# Uma Rede de Pacotes

Simulador visual de tráfego e roteamento de pacotes em uma rede 2D, desenvolvido para uma atividade escolar.

## Tecnologias

React, TypeScript, Vite, CSS, Lucide React, JSON, Git/GitHub e IA/Copilot utilizada no desenvolvimento.

## Funcionalidades

O sistema possui mapa 2D, cadastro de dispositivos e interfaces, IPs e máscaras, conexões, redes pré-configuradas, importação/exportação JSON, BFS para roteamento, envio de múltiplos pacotes, animação e status de entrega.

## Algoritmo e arrays

O BFS transforma as conexões em um grafo bidirecional e encontra o caminho entre origem e destino por Busca em Largura. `Dispositivo[]`, `Conexao[]`, `Pacote[]`, `InterfaceRede[]` e `Rede[]` armazenam as coleções do projeto. `map`, `find`, `filter`, criação imutável de arrays e percursos do grafo são usados na interface e nos serviços.

## Como executar

```bash
npm install
npm run dev
npm run build
```

## Estrutura

```text
src/
├── algorithms/    # BFS e redes/sub-redes
├── components/    # Interface visual
├── data/          # Redes de exemplo
├── models/        # Tipos TypeScript
├── services/      # Pacotes e JSON
├── App.tsx
└── App.css
```

## Demonstração

Escolha uma origem, um destino e a quantidade de pacotes. O BFS calcula a rota, por exemplo `Notebook → Roteador → Servidor`, e a animação mostra os pacotes atravessando o mapa até serem entregues.
