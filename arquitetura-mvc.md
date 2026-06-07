     # Arquitetura do Sistema (Mapeamento MVC)

     ## Contexto do Projeto

     O **SAFELINK** é uma iniciativa acadêmica voltada à educação em segurança digital para públicos vulneráveis (idosos, analfabetos digitais e comunidades com pouco acesso à tecnologia). O sistema atual é **focado em Front-end**, construído com **HTML**, **CSS** e **JavaScript**, sem backend ou banco de dados no momento.

     Mesmo em uma arquitetura puramente client-side, é possível — e necessário para fins acadêmicos — demonstrar como a interface se organiza segundo o padrão **MVC (Model-View-Controller)**. A separação lógica garante clareza de responsabilidades e prepara o projeto para uma evolução futura com API e persistência de dados.

     ### Como o MVC se aplica ao SAFELINK (Front-end)

     | Camada | Papel no SAFELINK | Tecnologia atual |
     |--------|-------------------|------------------|
     | **Visão (View)** | Telas, componentes visuais e elementos com os quais o usuário interage | Arquivos `.html` + folhas `.css` |
     | **Controle (Controller)** | Código que recebe ações do usuário, coordena fluxos e decide o que exibir | JavaScript (eventos, navegação, renderização dinâmica) |
     | **Modelo (Model)** | Regras de negócio, dados e validações que governam o comportamento do sistema | Arrays/objetos em JS (`bancoQuestoes`, `AppState`), `localStorage`, conteúdo estruturado nas páginas |

     ### Fluxo geral de comunicação

     ```
     Usuário → [VIEW] interage (clique, formulário, rolagem)
               ↓
          [CONTROLLER] captura o evento e processa a ação
               ↓
          [MODEL] aplica regras de negócio e consulta/atualiza dados
               ↓
          [CONTROLLER] decide o resultado (redirecionar, renderizar, exibir mensagem)
               ↓
          [VIEW] atualiza a tela para o usuário
     ```

     ### Evolução futura (conexão com backend)

     Quando o sistema evoluir para uma arquitetura completa, o mapeamento se mantém:

     - **View** continua sendo o Front-end (HTML/CSS/JS).
     - **Controller** passará a ser também rotas de API (ex.: Node.js, PHP, Python) que recebem requisições HTTP.
     - **Model** migrará para banco de dados e serviços (ex.: cadastro de usuários, histórico de avaliações, registro de denúncias).

     ---

     ## Mapeamento das 4 Principais Histórias de Usuário

     As histórias abaixo foram selecionadas por representarem os fluxos centrais do SAFELINK: entrada no sistema, consumo de conteúdo educativo, ação em emergência e avaliação de conhecimentos.

     ---

     ### História de Usuário 1 — Primeiro Acesso

     > **Como** imigrante digital, **eu quero** clicar no botão *Iniciar* **para** acessar o conteúdo do site.

     **Critério de aceite:** O sistema deve responder ao clique redirecionando o usuário à página de conteúdo (`home.html`).

     | Camada MVC | O que acontece nesta camada para essa funcionalidade? | Exemplo Prático no Projeto |
     |------------|--------------------------------------------------------|---------------------------|
     | **VISÃO** | Onde o usuário interage (telas desenvolvidas em Front-end) | A página `index.html` exibe o botão **"Iniciar"** estilizado em `css/inicio.css`, centralizado no cabeçalho, com tipografia e cores que chamam a atenção do público-alvo. |
     | **CONTROLE** | O intermediário (o código que recebe a ação e toma decisões) | O link `<a href="home.html">Iniciar</a>` atua como controlador de navegação: ao detectar o clique, o navegador solicita a página `home.html`. Não há lógica condicional — a decisão é direta: *se clicou, redirecione*. |
     | **MODELO** | As regras de negócio e os dados (onde as leis do sistema são validadas) | A regra implícita é: *todo visitante deve passar pela tela de boas-vindas antes de acessar o conteúdo principal*. O "dado" é a rota de destino fixa (`home.html`), definida na estrutura de navegação do site. |

     **Arquivos envolvidos:** `index.html`, `css/inicio.css`, `home.html`

     ---

     ### História de Usuário 2 — Acesso ao Conteúdo Educacional (Aprenda)

     > **Como** proprietário de um smartphone, **eu quero** clicar no card **"Aprenda"** **para** entender os conceitos básicos de segurança digital de forma simples e acessível.

     **Critério de aceite:** O sistema deve responder à solicitação redirecionando à página do Card Aprenda.

     | Camada MVC | O que acontece nesta camada para essa funcionalidade? | Exemplo Prático no Projeto |
     |------------|--------------------------------------------------------|---------------------------|
     | **VISÃO** | Onde o usuário interage (telas desenvolvidas em Front-end) | Em `home.html`, o card **APRENDA** (emoji ✏️, título, descrição) dentro do grid `.cards` com gradiente roxo (`css/style.css`). Na página de destino `aprenda.html`, o usuário vê o hero, cards de aula (`.aula-card`), vídeos, grid de golpes (`.golpe-card`) e caixas de dicas (`.dica-box`). |
     | **CONTROLE** | O intermediário (o código que recebe a ação e toma decisões) | O elemento `<a href="aprenda.html">` dentro de `.card-item.aprenda` intercepta o clique e direciona para a página de conteúdo. Na `aprenda.html`, os links `btn-voltar` (`href="home.html"`) controlam o retorno à página inicial. |
     | **MODELO** | As regras de negócio e os dados (onde as leis do sistema são validadas) | O conteúdo educacional é o "modelo de dados" estático: 3 aulas sobre segurança digital, golpes comuns, senhas, links suspeitos e Wi-Fi público. As regras pedagógicas (linguagem simples, exemplos do cotidiano, alertas visuais) estão embutidas na estrutura HTML e na hierarquia das seções. |

     **Arquivos envolvidos:** `home.html`, `aprenda.html`, `css/style.css`, `css/style-aprenda.css`

     ---

     ### História de Usuário 3 — Avaliação Interativa e Certificado

     > **Como** imigrante digital que acessou todo o conteúdo do site, **eu quero** acessar um teste clicando no card **"Avaliação Interativa"** **para** testar meus conhecimentos.

     **Critério de aceite:** O sistema deve responder ao clique redirecionando à página Avaliação Interativa. O usuário aprovado (≥ 60% de acertos) recebe certificado.

     | Camada MVC | O que acontece nesta camada para essa funcionalidade? | Exemplo Prático no Projeto |
     |------------|--------------------------------------------------------|---------------------------|
     | **VISÃO** | Onde o usuário interage (telas desenvolvidas em Front-end) | `teste.html` apresenta o cabeçalho da avaliação, botão **"Sortear novas perguntas"**, container `#quiz-container` (perguntas geradas dinamicamente), barra de progresso `#progresso-bar`, botões **"Finalizar e Ver Resultado"** e área `#resultado`. Em `certificado.html`, o formulário com campo de nome e botão **"Gerar Certificado"**. |
     | **CONTROLE** | O intermediário (o código que recebe a ação e toma decisões) | Funções JavaScript em `teste.html`: `inicializarQuiz()` inicia o fluxo; `sortearPerguntas()` seleciona 10 questões; `selecionarResposta()` registra a escolha; `finalizarTeste()` valida se todas foram respondidas (com `confirm()`), calcula a nota e decide redirecionar; `renderizarQuiz()` monta o DOM. Em `certificado.html`, `gerarCertificado()` valida o nome e exibe o certificado. Eventos: `onclick` nas opções, `addEventListener` nos botões. |
     | **MODELO** | As regras de negócio e os dados (onde as leis do sistema são validadas) | `bancoQuestoes` (array com 50 questões, opções, índice da resposta correta e explicação); `AppState` (estado da sessão: perguntas sorteadas, respostas, nota, flag de finalização); regra de aprovação: **mínimo 6 acertos em 10 (60%)**; regra de certificado: nota ≥ 60% grava `safelink_nota` e `safelink_total` no `localStorage`; regra de nome: mínimo 3 caracteres; regra de sorteio: algoritmo Fisher-Yates para embaralhar e selecionar 10 questões únicas. |

     **Arquivos envolvidos:** `home.html`, `teste.html`, `certificado.html`, `css/style-teste.css`

     ---

     ### História de Usuário 4 — Contatos de Emergência

     > **Como** vítima de tentativa de golpe digital, **eu quero** clicar em um link **para** acessar contatos de emergência e efetuar uma denúncia.

     **Critério de aceite:** O sistema deve responder ao clique redirecionando à página de contatos de emergência.

     | Camada MVC | O que acontece nesta camada para essa funcionalidade? | Exemplo Prático no Projeto |
     |------------|--------------------------------------------------------|---------------------------|
     | **VISÃO** | Onde o usuário interage (telas desenvolvidas em Front-end) | Em `home.html`, o link **"Contatos de emergência"** no menu de navegação (`nav > ul`). Em `contatos.html`, cards com telefones (190, 181, 151, 145), links para `delegaciavirtual.sinesp.gov.br`, `consumidor.gov.br`, `safernet.org.br` e botão **"← Voltar"** para `home.html`. |
     | **CONTROLE** | O intermediário (o código que recebe a ação e toma decisões) | O link `<a href="contatos.html">` no menu da home direciona o usuário. Na página de contatos, links externos usam `target="_blank"` para abrir canais oficiais em nova aba, sem sair do site. O link de retorno `btn-voltar` restaura o fluxo anterior. |
     | **MODELO** | As regras de negócio e os dados (onde as leis do sistema são validadas) | Os dados são os contatos oficiais validados (Polícia, Disque Denúncia, Procon, Banco Central, Delegacia Virtual, SaferNet). A regra de negócio central é: *em situação de golpe, o usuário deve ser direcionado imediatamente a canais oficiais e confiáveis*, priorizando números curtos (190, 181) e portais `.gov.br`. |

     **Arquivos envolvidos:** `home.html`, `contatos.html`

     ---

     ## Diagrama Resumido da Arquitetura

     ```
     ┌─────────────────────────────────────────────────────────────────┐
     │                         CAMADA VISÃO                            │
     │  index.html │ home.html │ aprenda.html │ previna.html         │
     │  proteja.html │ teste.html │ certificado.html │ contatos.html  │
     │  + css/style*.css + css/inicio.css                              │
     └────────────────────────────┬────────────────────────────────────┘
                              │ eventos do usuário (clique, submit)
     ┌────────────────────────────▼────────────────────────────────────┐
     │                      CAMADA CONTROLE                            │
     │  Links de navegação (<a href>)                                  │
     │  JavaScript: inicializarQuiz(), finalizarTeste(),               │
     │  renderizarQuiz(), gerarCertificado()                           │
     └────────────────────────────┬────────────────────────────────────┘
                              │ consulta / valida / persiste
     ┌────────────────────────────▼────────────────────────────────────┐
     │                       CAMADA MODELO                             │
     │  bancoQuestoes (50 questões) │ AppState (estado da avaliação)   │
     │  localStorage (nota, total)  │ Conteúdo educativo (HTML)       │
     │  Regras: aprovação ≥ 60% │ sorteio de 10 questões │ nome ≥ 3   │
     └─────────────────────────────────────────────────────────────────┘
     ```

     ---

     ## Equipe e Referência

     **Projeto:** SAFELINK — Segurança Digital para Todos  
     **Equipe:** Breno Porto, Amazias Caldas e Marcelo Oliveira  
     **Instituição:** Engenharia de Software — IFAM, Campus Presidente Figueiredo

     **Documento de referência das histórias de usuário:** `projeto.md`
