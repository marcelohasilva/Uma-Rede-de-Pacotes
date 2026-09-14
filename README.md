# 📡 Uma Rede de Pacotes

> **Simulador visual de tráfego e roteamento de pacotes em uma rede de computadores.**

O **Uma Rede de Pacotes** é uma aplicação web desenvolvida para representar, de forma visual e interativa, o funcionamento básico de uma rede de computadores.

O sistema permite criar e configurar diferentes redes, cadastrar dispositivos com endereços IP e interfaces de rede, estabelecer conexões entre os dispositivos e enviar múltiplos pacotes, acompanhando visualmente o caminho percorrido até o destino.

O projeto foi desenvolvido com foco **didático**, permitindo visualizar conceitos de **redes de computadores, estruturas de dados, arrays, grafos e algoritmos de roteamento**.

---

## 🎯 Objetivo

O principal objetivo do projeto é simular o tráfego de pacotes em uma rede 2D, permitindo observar de maneira visual como os dispositivos se comunicam e como um pacote pode encontrar um caminho entre sua origem e seu destino.

O projeto também foi desenvolvido para aplicar conceitos de programação e Engenharia de Software na construção de uma aplicação prática.

---

## 🚀 Funcionalidades

### 🌐 Gerenciamento de redes

* Criação e gerenciamento de diferentes redes.
* Redes pré-configuradas para demonstração.
* Rede Residencial.
* Rede Escolar.
* Rede de Servidores.
* Exportação de redes para arquivos JSON.
* Importação de redes através de arquivos JSON.

### 💻 Dispositivos

É possível cadastrar diferentes tipos de dispositivos:

* 💻 Notebook
* 📱 Smartphone
* 📲 Tablet
* 🖥️ Servidor
* 🌐 Roteador

Cada dispositivo possui informações como:

* Nome.
* Tipo.
* Endereço IP.
* Posição no mapa.
* Interfaces de rede.

### 🔌 Conexões

O sistema permite:

* Criar conexões entre dispositivos.
* Remover conexões.
* Visualizar as conexões diretamente no mapa.
* Evitar conexões duplicadas.

### 🌍 Endereçamento IP

O projeto possui suporte para:

* Endereços IP.
* Máscaras de sub-rede.
* Interfaces de rede.
* Diferentes sub-redes.
* Roteadores com múltiplas interfaces.

Também existe uma validação para impedir o cadastro de dois dispositivos com o mesmo endereço IP dentro da rede atual.

### 📦 Tráfego de pacotes

O usuário pode:

1. Selecionar um dispositivo de origem.
2. Selecionar um dispositivo de destino.
3. Definir a quantidade de pacotes.
4. Enviar os pacotes.
5. Acompanhar visualmente o caminho percorrido.

Os pacotes possuem três estados:

```text
Aguardando → Em trânsito → Entregue
```

---

## 🧠 Algoritmo de roteamento

O projeto utiliza o algoritmo **BFS (Breadth-First Search / Busca em Largura)** para encontrar caminhos entre dispositivos.

A rede é representada como um **grafo**, onde:

* **Dispositivos** representam os nós.
* **Conexões** representam as arestas.
* **BFS** realiza a busca pelo caminho.

Exemplo:

```text
💻 Notebook
     │
     ▼
🌐 Roteador
     │
     ▼
🖥️ Servidor
```

O algoritmo começa no dispositivo de origem e visita os dispositivos conectados por níveis até encontrar o destino.

Durante a busca, os predecessores são armazenados para permitir a reconstrução do caminho completo que será utilizado pelo pacote.

Como as conexões da simulação não possuem pesos diferentes, o BFS é adequado para encontrar um caminho com a menor quantidade de conexões.

> **Observação:** o roteamento implementado possui finalidade didática e representa uma simplificação dos mecanismos utilizados em redes reais.

---

## 📚 Uso de Arrays

Os arrays são uma parte importante da implementação do projeto.

Principais estruturas utilizadas:

| Array             | Função                                    |
| ----------------- | ----------------------------------------- |
| `Dispositivo[]`   | Armazena os dispositivos da rede          |
| `Conexao[]`       | Armazena as conexões entre dispositivos   |
| `Pacote[]`        | Representa os pacotes em trânsito         |
| `InterfaceRede[]` | Armazena as interfaces de rede            |
| `Rede[]`          | Armazena diferentes configurações de rede |

O projeto também utiliza operações comuns de arrays, como:

```text
map()
find()
filter()
```

Além disso, são utilizados percursos de arrays, criação de novos arrays e atualizações imutáveis dos estados da aplicação.

---

## 🛠️ Tecnologias utilizadas

### Front-end

* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vite.dev/)
* CSS

### Bibliotecas

* Lucide React

### Dados e persistência

* JSON

### Versionamento

* Git
* GitHub

### Inteligência Artificial

Durante o desenvolvimento foram utilizadas ferramentas de **Inteligência Artificial, incluindo GitHub Copilot**, como apoio para:

* Geração de código.
* Organização da implementação.
* Identificação e correção de problemas.
* Revisão de código.
* Documentação.
* Desenvolvimento incremental das funcionalidades.

A IA foi utilizada como ferramenta de apoio, com validação e testes das funcionalidades implementadas.

---

## 📁 Estrutura do projeto

```text
Uma_rede_de_pacotes/
│
├── public/
│
├── src/
│   │
│   ├── algorithms/
│   │   ├── rede.ts
│   │   └── roteamento.ts
│   │
│   ├── components/
│   │   ├── CadastroDispositivo.tsx
│   │   ├── ControlePacotes.tsx
│   │   ├── GerenciarConexoes.tsx
│   │   ├── GerenciarRedes.tsx
│   │   ├── MapaRede.tsx
│   │   ├── PacotesAnimados.tsx
│   │   └── SelecionarRede.tsx
│   │
│   ├── data/
│   │   ├── redeExemplo.ts
│   │   └── redesExemplo.ts
│   │
│   ├── models/
│   │   ├── Conexao.ts
│   │   ├── Dispositivo.ts
│   │   ├── InterfaceRede.ts
│   │   ├── Pacote.ts
│   │   └── Rede.ts
│   │
│   ├── services/
│   │   ├── pacoteService.ts
│   │   └── redeService.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   └── index.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/marcelohasilva/Uma-Rede-de-Pacotes.git
```

### 2. Entrar no diretório do projeto

```bash
cd Uma-Rede-de-Pacotes/Uma_rede_de_pacotes
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Executar em modo de desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

### 5. Gerar o build de produção

```bash
npm run build
```

---

## 🧪 Testando o sistema

Para realizar uma demonstração completa:

1. Abra uma das redes pré-configuradas.
2. Observe os dispositivos e conexões no mapa.
3. Escolha um dispositivo de origem.
4. Escolha um dispositivo de destino.
5. Defina a quantidade de pacotes.
6. Envie os pacotes.
7. Observe o caminho calculado pelo BFS.
8. Acompanhe os pacotes passando pelos dispositivos.
9. Verifique o status `Entregue`.
10. Cadastre um novo dispositivo.
11. Teste a validação de IP duplicado.
12. Crie ou remova conexões.
13. Exporte uma rede para JSON.
14. Importe novamente a configuração.

---

## 🖥️ Demonstração

Exemplo de uma rota:

```text
┌──────────────┐
│   Notebook   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Roteador   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Servidor   │
└──────────────┘
```

O pacote recebe uma rota calculada pelo BFS e percorre visualmente o mapa até alcançar o dispositivo de destino.

Durante o percurso, seu estado é atualizado:

```text
Aguardando
     ↓
Em trânsito
     ↓
Entregue
```

---

## 📱 Responsividade

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela:

* 🖥️ Desktop
* 💻 Notebook
* 📱 Tablet
* 📱 Smartphone

O objetivo é manter os principais controles e informações acessíveis independentemente do dispositivo utilizado.

---

## 🏗️ Arquitetura simplificada

O funcionamento geral da aplicação pode ser representado da seguinte forma:

```text
┌─────────────────────────┐
│       Interface         │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│    Componentes React    │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│        Services         │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│       Algorithms        │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│      Models / Data      │
└─────────────────────────┘
```

---

## 🎓 Conceitos aplicados

O projeto reúne conceitos de diferentes áreas:

### Programação

* TypeScript.
* React.
* Componentização.
* Gerenciamento de estado.
* Manipulação de arrays.

### Estruturas de dados

* Arrays.
* Grafos.
* Filas.
* Relações entre nós e conexões.

### Algoritmos

* BFS (Busca em Largura).
* Construção de caminhos.
* Busca de dispositivos.
* Validação de dados.

### Redes de computadores

* Endereçamento IP.
* Máscaras de sub-rede.
* Interfaces de rede.
* Roteadores.
* Comunicação entre dispositivos.

### Engenharia de Software

* Organização por componentes.
* Separação entre modelos, serviços e algoritmos.
* Controle de versão.
* Documentação.
* Testes e validação.

---

## 👨‍💻 Autor

**Marcelo Henrique Almeida da Silva**
**Thyago Ruan**

Projeto desenvolvido para fins acadêmicos no **IFPE**.

---

## 🔗 Repositório

O código-fonte está disponível no GitHub:

**Uma Rede de Pacotes**

https://github.com/marcelohasilva/Uma-Rede-de-Pacotes

---

## 📌 Status do projeto

**Concluído para apresentação acadêmica.**

O projeto possui as principais funcionalidades de simulação de redes, cadastro de dispositivos, endereçamento IP, conexões, roteamento BFS, tráfego visual de pacotes, redes pré-configuradas e persistência em JSON.

---

## 📄 Licença

Este projeto foi desenvolvido para fins **educacionais e acadêmicos**.
