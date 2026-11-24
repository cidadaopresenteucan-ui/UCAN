const app = document.querySelector('#app');

const rights = [
  { slug: 'educacao', title: 'Educação', article: 'art. 79.º', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v17H5.5A2.5 2.5 0 0 0 3 22zM21 5.5A2.5 2.5 0 0 0 18.5 3H12v17h6.5a2.5 2.5 0 0 1 2.5 2z"/></svg>', summary: 'A Constituição reconhece o direito à educação e prevê a promoção do acesso ao ensino.' },
  { slug: 'trabalho', title: 'Trabalho', article: 'art. 76.º', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 7v14"/></svg>', summary: 'A Constituição reconhece o direito ao trabalho e os direitos fundamentais dos trabalhadores.' },
  { slug: 'livre-iniciativa', title: 'Livre iniciativa económica', article: 'art. 38.º', icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 2-5h14l2 5M4 10v10h16V10M4 10a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0M9 20v-6h6v6"/></svg>', summary: 'A Constituição reconhece a liberdade de iniciativa económica e empresarial, nos termos da lei.' }
];

const pageHeading = (title, subtitle = '', kicker = '') => `<section class="page-heading"><div class="page-heading-inner">${kicker ? `<div class="eyebrow">${kicker}</div>` : ''}<h1>${title}</h1>${subtitle ? `<p class="muted">${subtitle}</p>` : ''}</div></section>`;
const rightCards = () => `<div class="cards">${rights.map(r => `<article class="card right-card"><div class="card-icon">${r.icon}</div><p class="article-ref">${r.article}</p><h3>${r.title}</h3><p>${r.summary}</p><a class="btn" href="#direitos/${r.slug}">Ver direito <span aria-hidden="true">→</span></a></article>`).join('')}</div>`;

let gameIndex = 0;
let gameScore = 0;
let gameAnswered = false;
let gameSelection = '';
let gameLastCorrect = false;
let gameDeck = [];
let activeVideo = null;

const homePage = () => `
  <section class="hero"><div class="hero-inner">
    <div class="hero-copy"><span class="hero-kicker">Cidadania activa <span aria-hidden="true">•</span> Juventude</span><h1>Cidadão Presente</h1><p class="hero-slogan">Conhece os teus direitos. Exige as tuas oportunidades.</p><p>Direitos e deveres explicados de forma simples, para jovens que querem participar e fazer-se ouvir.</p><div class="hero-actions"><a class="btn gold" href="#direitos">Conhece os teus direitos <span aria-hidden="true">→</span></a><a class="btn hero-secondary" href="#oge">Explorar OGE <span aria-hidden="true">↗</span></a></div></div>
    <div class="hero-object" aria-hidden="true">
      <div class="hero-orbit hero-orbit-back"></div>
      <div class="hero-medallion"><div class="hero-medallion-face"><img src="assets/logo.svg" alt=""></div></div>
      <div class="hero-object-card hero-object-card-right"><span class="hero-object-icon">✓</span><span>Direitos<br>para todos</span></div>
      <div class="hero-object-card hero-object-card-left"><span class="hero-object-icon">✦</span><span>Voz<br>jovem</span></div>
      <div class="hero-orbit hero-orbit-front"></div>
    </div>
  </div></section>
  <section class="home-shortcuts" aria-label="Explorar o Cidadão Presente"><div class="home-shortcuts-grid">
    <a class="home-shortcut" href="#direitos"><span class="shortcut-icon">${rights[0].icon}</span><span><strong>Direitos e deveres</strong><small>Explora os teus direitos</small></span><span class="shortcut-arrow" aria-hidden="true">→</span></a>
    <a class="home-shortcut" href="#onde-recorrer"><span class="shortcut-icon shortcut-location" aria-hidden="true">⌖</span><span><strong>Onde recorrer</strong><small>Sabe onde pedir apoio</small></span><span class="shortcut-arrow" aria-hidden="true">→</span></a>
    <a class="home-shortcut" href="#oge"><span class="shortcut-icon shortcut-chart" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 20V11h4v9M10 20V5h4v15M16 20V8h4v12M2 21h20"/></svg></span><span><strong>OGE explicado</strong><small>Entende o orçamento</small></span><span class="shortcut-arrow" aria-hidden="true">→</span></a>
  </div></section>
  <section class="section home-intro"><p>Conhecer a lei é o primeiro passo para a defender. O Cidadão Presente reúne, num só lugar, o que precisas de saber sobre três direitos essenciais — e onde recorrer quando não são respeitados.</p></section>
  <section class="section rights-section"><h2>Três direitos para começar</h2>${rightCards()}<a class="quick game-callout" href="#jogos"><div><span class="eyebrow">Jogo</span><strong>Mito ou Verdade</strong><span>Arrasta as cartas e descobre o que diz a lei.</span></div><span class="btn gold">Jogar agora <span aria-hidden="true">→</span></span></a></section>`;

const pages = {
  inicio: homePage,
  direitos: () => `${pageHeading('Que direito queres conhecer?', 'Um direito é aquilo que podes exigir. Um dever é aquilo que te cabe cumprir. Os dois andam sempre juntos.', 'Direitos e deveres')}<section class="section rights-page">${rightCards()}<div class="plain-section duties"><h2>E os deveres?</h2><div class="cards">${[['Respeitar os direitos, liberdades e garantias das outras pessoas', 'A Constituição consagra a universalidade dos direitos e o respeito pelos direitos de todos (art. 22.º).'], ['Cumprir as obrigações previstas na lei', 'Os direitos e deveres devem ser exercidos nos termos da Constituição e da lei.'], ['Participar na vida pública', 'A Constituição reconhece a participação dos cidadãos na vida pública (art. 52.º).']].map(([title, detail]) => `<article class="duty-card"><strong>${title}</strong><p>${detail}</p></article>`).join('')}</div></div><a class="quick game-callout" href="#jogos"><div><span class="eyebrow">Jogo</span><strong>Mito ou Verdade</strong><span>Testa o que sabes em menos de dois minutos.</span></div><span class="btn gold">Jogar agora</span></a></section>`,
  'onde-recorrer': ondeRecorrer,
  oge: oge,
  videos,
  jogos: games,
  sobre,
  entidade,
  selo,
  'acompanhar-oge': ogeGuide
};

function rightDetail(slug) {
  const right = rights.find(item => item.slug === slug) || rights[0];
  const entity = entityData.find(item => item.right === right.slug);
  const examples = right.slug === 'educacao'
    ? ['Procurar acesso ao ensino e informação sobre matrícula e aprendizagem.', 'Pedir esclarecimentos sobre condições de acesso e continuidade no ensino.', 'Recorrer a oportunidades de formação e aprendizagem ao longo da vida.']
    : right.slug === 'trabalho'
      ? ['Procurar esclarecimento sobre remuneração, descanso e férias.', 'Pedir informação sobre formação profissional e condições de trabalho.', 'Registar uma preocupação relacionada com higiene e segurança no trabalho.']
      : ['Informar-se sobre as regras aplicáveis antes de iniciar uma actividade económica.', 'Desenvolver e gerir uma iniciativa empresarial dentro dos limites da lei.', 'Procurar informação para exercer a liberdade de iniciativa económica.'];
  return `${pageHeading(`${right.title} (${right.article})`, 'Síntese informativa baseada na Constituição da República de Angola.')}
    <div class="section">
      <section class="plain-section"><h2>O que diz a Constituição</h2><div class="notice">${right.summary} (Constituição da República de Angola, ${right.article}.)</div></section>
      <section class="plain-section"><h2>O que isto significa na prática</h2><div class="cards">${examples.map((text, index) => `<article class="panel"><h3>Exemplo ${index + 1}</h3><p>${text}</p></article>`).join('')}</div></section>
      <section class="plain-section"><h2>Vídeo do direito</h2><div class="video-box"><div><span class="video-placeholder" aria-hidden="true">▶</span><p>Vídeo de exemplo — ficheiro e legendas [A CONFIRMAR]</p></div></div><p class="muted">[A CONFIRMAR — título, vídeo e legenda.]</p></section>
      <section class="plain-section"><h2>O que fazer se o direito for violado</h2><ol class="list-steps"><li>Regista o que aconteceu, incluindo datas e locais.</li><li>Guarda documentos e mensagens relacionados com a situação.</li><li>Procura informação fiável sobre os passos adequados.</li><li>Contacta uma entidade competente [A CONFIRMAR].</li><li>Pede apoio a uma pessoa ou organização de confiança, se necessário.</li></ol></section>
      <section class="plain-section"><h2>Onde procurar informação</h2><div class="cards"><article class="card"><h3>${entity.name}</h3><p>${entity.description}</p><a class="btn outline" href="#entidade/${entity.slug}">Ver informação da entidade</a></article><article class="card"><h3>Provedor de Justiça</h3><p>Órgão independente previsto na Constituição para a defesa dos direitos, liberdades e garantias dos cidadãos (art. 192.º).</p><a class="btn outline" href="#entidade/provedor">Ver informação da entidade</a></article></div></section>
      <section class="plain-section"><a class="quick" href="#jogos"><strong>Mito ou Verdade sobre ${right.title}</strong><span>Testa o que aprendeste →</span></a></section>
    </div>`;
}

function ondeRecorrer() {
  return `${pageHeading('Do problema à entidade certa', 'Começa por escolher a área do teu problema.', 'Onde recorrer')}
    <section class="section route-section"><div id="route-start"><div class="route-choices">
      <button class="route-choice active" type="button" data-area="educacao" aria-pressed="true">${rights[0].icon}<span>Educação</span></button><button class="route-choice" type="button" data-area="trabalho" aria-pressed="false">${rights[1].icon}<span>Trabalho</span></button><button class="route-choice" type="button" data-area="economia" aria-pressed="false">${rights[2].icon}<span>Livre iniciativa económica</span></button>
    </div></div><div id="route-problems" class="route-content" aria-live="polite"></div></section>`;
}

function whereProblems(area) {
  return {
    educacao: ['Problema com a bolsa de estudo', 'Cobranças indevidas na escola', 'Impedido de fazer uma prova'],
    trabalho: ['Dúvida sobre remuneração ou descanso', 'Questão sobre contrato de trabalho', 'Condições de higiene e segurança no trabalho'],
    economia: ['Informação para iniciar uma actividade económica', 'Orientação para uma iniciativa empresarial', 'Dúvida sobre formalização de um negócio']
  }[area] || [];
}

function renderProblems(area) {
  const host = document.querySelector('#route-problems');
  if (!host) return;
  const areaNames = { educacao: 'Educação', trabalho: 'Trabalho', economia: 'Livre iniciativa' };
  host.innerHTML = `<div class="route-problem-list"><strong class="filter-label">Problemas comuns <span class="data-badge">[A CONFIRMAR]</span></strong><div class="problem-options">${whereProblems(area).map((problem, index) => `<button class="problem-choice" type="button" data-problem-index="${index}" aria-pressed="false">${problem}</button>`).join('')}</div><div class="route-actions"><button class="btn outline route-back" type="button"><span aria-hidden="true">←</span> Voltar</button><button class="btn route-other" type="button"><span aria-hidden="true">↶</span> Escolher outro problema</button></div></div><span class="route-arrow" aria-hidden="true">╌╌╌➜</span><div class="route-recommendation" id="route-recommendation"><p>Escolhe um problema para veres a entidade recomendada.</p></div>`;
  host.querySelectorAll('.problem-choice').forEach(button => button.addEventListener('click', () => {
    host.querySelectorAll('.problem-choice').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    renderEntityRoute(areaNames[area], button.textContent.trim(), Number(button.dataset.problemIndex));
  }));
  host.querySelector('.route-back').addEventListener('click', () => {
    host.innerHTML = '<div class="route-empty">Escolhe uma área para veres os problemas comuns.</div>';
    document.querySelectorAll('#route-start [data-area]').forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
  });
  host.querySelector('.route-other').addEventListener('click', () => {
    host.querySelectorAll('.problem-choice').forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    renderRecommendationPlaceholder();
  });
}

function renderRecommendationPlaceholder() {
  const recommendation = document.querySelector('#route-recommendation');
  if (recommendation) recommendation.innerHTML = '<p>Escolhe um problema para veres a entidade recomendada.</p>';
}

function renderEntityRoute(area, problem, problemIndex = 0) {
  const host = document.querySelector('#route-problems');
  if (!host) return;
  const entitySlug = area === 'Educação' ? 'educacao' : area === 'Trabalho' ? 'trabalho' : 'iniciativa';
  const entity = area === 'Educação' && problemIndex === 0
    ? entityData.find(item => item.slug === 'bolsas')
    : entityData.find(item => item.slug === entitySlug);
  const recommendation = document.querySelector('#route-recommendation');
  if (!recommendation) return;
  recommendation.innerHTML = `<article class="recommended-entity"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 7v14"/></svg><span class="eyebrow">Entidade recomendada</span><h2>${entity.name}</h2><p>${entity.description}</p><a class="btn gold" href="#entidade/${entity.slug}">Ver ficha da entidade <span aria-hidden="true">→</span></a></article>`;
}

function oge() {
  return `${pageHeading('Explorador do OGE', 'Se o Estado tivesse só o valor que escreveres, para onde iria cada kwanza?', 'OGE')}
    <section class="section oge-section"><p class="data-badge">[VALORES DE EXEMPLO – A CONFIRMAR]</p>
    <div class="grid-2 oge-controls"><label><strong>Valor em Kz</strong><input id="oge-value" type="number" value="100" min="0" step="any" inputmode="decimal"></label><label><strong>Ano</strong><select id="oge-year"><option value="2026">2026 [A CONFIRMAR]</option><option value="2025">2025 [A CONFIRMAR]</option></select></label></div>
    <div class="choice-row oge-tabs" role="group" aria-label="Tipo de dados"><button class="choice active" id="oge-to" type="button" aria-pressed="true">Para onde vai</button><button class="choice" id="oge-from" type="button" aria-pressed="false">De onde vem o dinheiro</button></div><div id="oge-chart" class="oge-chart" aria-live="polite"></div>
    <p><a class="btn outline" href="#acompanhar-oge">Como acompanhar o OGE →</a></p></section>`;
}

function renderOge(tab = 'to') {
  const chart = document.querySelector('#oge-chart');
  const input = document.querySelector('#oge-value');
  const year = document.querySelector('#oge-year');
  if (!chart || !input || !year) return;
  const sectors = tab === 'to'
    ? [{ name: 'Serviço da dívida', color: '#345792', percent: 35, pattern: 'dots', detail: '[A CONFIRMAR — o que inclui este sector.]' }, { name: 'Educação', color: '#edb326', percent: 10, pattern: 'diagonal', detail: '[A CONFIRMAR — o que inclui este sector.]' }, { name: 'Saúde', color: '#d94343', percent: 8, pattern: 'dots', detail: '[A CONFIRMAR — o que inclui este sector.]' }, { name: 'Defesa e segurança', color: '#1e9b75', percent: 12, pattern: 'lines', detail: '[A CONFIRMAR — o que inclui este sector.]' }, { name: 'Protecção social', color: '#2998b0', percent: 9, pattern: 'solid', detail: '[A CONFIRMAR — o que inclui este sector.]' }, { name: 'Infra-estruturas', color: '#a85ea9', percent: 12, pattern: 'diagonal', detail: '[A CONFIRMAR — o que inclui este sector.]' }, { name: 'Outros', color: '#9da7b5', percent: 14, pattern: 'dots', detail: '[A CONFIRMAR — o que inclui este sector.]' }]
    : [{ name: 'Impostos', color: '#345792', percent: 38, pattern: 'dots', detail: '[A CONFIRMAR — o que inclui esta fonte.]' }, { name: 'Recursos naturais', color: '#edb326', percent: 28, pattern: 'diagonal', detail: '[A CONFIRMAR — o que inclui esta fonte.]' }, { name: 'Outras receitas', color: '#1e9b75', percent: 22, pattern: 'lines', detail: '[A CONFIRMAR — o que inclui esta fonte.]' }, { name: 'Financiamento', color: '#a85ea9', percent: 12, pattern: 'diagonal', detail: '[A CONFIRMAR — o que inclui esta fonte.]' }];
  const rawValue = Number(input.value);
  const value = Number.isFinite(rawValue) && rawValue >= 0 ? rawValue : 0;
  const maxPercent = Math.max(...sectors.map(sector => sector.percent));
  chart.innerHTML = `<p class="muted oge-chart-intro">Gráfico ilustrativo · percentagem de cada categoria e valor correspondente em Kz.</p>
    <div class="oge-bars-scroll"><div class="oge-bars" role="group" aria-label="Gráfico de barras verticais ilustrativo">${sectors.map(sector => {
      const amount = (value * sector.percent / 100).toLocaleString('pt-AO');
      return `<button class="oge-bar" type="button" data-sector="${sector.name}" aria-pressed="false" aria-label="${sector.name}: ${sector.percent}%, ${amount} Kz"><span class="oge-bar-percent">${sector.percent}%</span><span class="oge-bar-track"><span class="oge-bar-fill" style="height:${sector.percent / maxPercent * 100}%;background:${sector.color}"></span></span><strong>${sector.name}</strong><span class="oge-bar-amount">${amount} Kz</span></button>`;
    }).join('')}</div></div>
    <div id="oge-detail" class="notice oge-detail" role="status">Selecciona uma barra para ver o valor e a descrição. Os dados apresentados são exemplos.</div><p class="muted oge-source">Fonte: Orçamento Geral do Estado ${year.value} · Percentagens ilustrativas, não correspondem a dados oficiais.</p>`;
  chart.querySelectorAll('[data-sector]').forEach(button => button.addEventListener('click', () => {
    const sector = sectors.find(item => item.name === button.dataset.sector);
    chart.querySelectorAll('.oge-bar').forEach(bar => {
      const selected = bar === button;
      bar.classList.toggle('is-muted', !selected);
      bar.setAttribute('aria-pressed', String(selected));
    });
    chart.querySelector('#oge-detail').innerHTML = `<strong>${sector.name} · ${sector.percent}%</strong> — ${(value * sector.percent / 100).toLocaleString('pt-AO')} Kz.<br>${sector.detail}`;
  }));
}

function ogeGuide() {
  return `${pageHeading('Como acompanhar o OGE', 'Acompanhar o orçamento ajuda a perceber as prioridades públicas e a comparar planos com resultados.')}
    <section class="section">
      <div class="plain-section"><h2>O que é o OGE?</h2><p>O Orçamento Geral do Estado (OGE) apresenta previsões de receitas e despesas públicas para um período. [A CONFIRMAR — descrição oficial.]</p></div>
      <div class="plain-section"><h2>Como acompanhar</h2><ol class="list-steps"><li>Procura os documentos orçamentais em fontes oficiais. [A CONFIRMAR — ligações oficiais.]</li><li>Confirma o ano, a versão e a fonte do documento.</li><li>Identifica as receitas previstas e as despesas planeadas.</li><li>Compara o orçamento aprovado com os dados de execução publicados. [A CONFIRMAR — documentos e método.]</li><li>Regista dúvidas e procura informação complementar em fontes fiáveis.</li></ol></div>
      <div class="plain-section"><h2>Pequeno glossário</h2><div class="cards"><article class="panel"><h3>Receitas</h3><p>Dinheiro que o Estado prevê receber. [A CONFIRMAR.]</p></article><article class="panel"><h3>Despesas</h3><p>Dinheiro que o Estado prevê gastar. [A CONFIRMAR.]</p></article><article class="panel"><h3>Défice</h3><p>Situação em que as despesas excedem as receitas num período. [A CONFIRMAR.]</p></article></div></div>
      <div class="plain-section"><h2>Ligações oficiais</h2><ul><li><a href="#acompanhar-oge">[A CONFIRMAR — portal e documentos oficiais do OGE]</a></li><li><a href="#acompanhar-oge">[A CONFIRMAR — dados de execução orçamental]</a></li></ul></div>
      <div class="choice-row"><a class="btn" href="#oge">Voltar ao Explorador do OGE</a><a class="btn outline" href="#direitos">Ir a Direitos e deveres</a></div>
    </section>`;
}

const videosData = [
  { category: 'Educação', title: 'Depoimento de um estudante', subtitle: 'A experiência de um estudante e a sua bolsa [A CONFIRMAR].', duration: '[A CONFIRMAR]', slug: 'educacao', transcript: '[A CONFIRMAR — transcrição e legendas do depoimento.]' },
  { category: 'Trabalho', title: 'Sketch sobre um problema no trabalho', subtitle: 'Um exemplo dramatizado [A CONFIRMAR].', duration: '[A CONFIRMAR]', slug: 'trabalho', transcript: '[A CONFIRMAR — transcrição e legendas do sketch.]' },
  { category: 'Livre iniciativa', title: 'Entrevista a um empreendedor', subtitle: 'Conversa sobre uma actividade económica [A CONFIRMAR].', duration: '[A CONFIRMAR]', slug: 'livre-iniciativa', transcript: '[A CONFIRMAR — transcrição e legendas da entrevista.]' }
];

function videos() {
  return `${pageHeading('Ver para perceber', '', 'Vídeos')}
    <section class="section videos-section"><div class="video-box video-player" role="region" aria-label="Pré-visualização do vídeo seleccionado"><div><span class="video-placeholder" aria-hidden="true">▷</span><p class="player-caption">Vídeo de exemplo — será substituído</p></div></div>
    <div class="video-description"><h2 id="video-title">A minha bolsa de estudo</h2><p id="video-subtitle">Depoimento de um estudante sobre a sua bolsa (vídeo de exemplo).</p></div>
    <div class="caption-row"><label class="caption-toggle"><input id="captions-toggle" type="checkbox"> Legendas</label><button class="text-button" type="button" id="transcript-toggle">Mostrar transcrição</button></div><p id="video-transcript" class="notice" hidden>[A CONFIRMAR — selecciona um vídeo para ver a transcrição.]</p>
    <div class="video-filter choice-row" role="group" aria-label="Filtrar vídeos"><button class="choice active" type="button" data-filter="Todos" aria-pressed="true">Todos</button><button class="choice" type="button" data-filter="Educação" aria-pressed="false">Educação</button><button class="choice" type="button" data-filter="Trabalho" aria-pressed="false">Trabalho</button><button class="choice" type="button" data-filter="Livre iniciativa" aria-pressed="false">Livre iniciativa económica</button></div>
    <div class="cards video-cards">${videosData.map((video, index) => `<article class="card video-card" data-category="${video.category}"><button class="video-thumb video-select select-video" type="button" data-video="${index}" aria-label="Seleccionar ${video.title}"><span class="video-placeholder" aria-hidden="true">▷</span><span class="duration">${video.duration}</span></button><div class="video-card-copy"><div class="eyebrow">${video.category} · ${index === 0 ? 'Depoimento' : index === 1 ? 'Sketch' : 'Entrevista'}</div><h3>${index === 0 ? 'A minha bolsa de estudo' : index === 1 ? 'Problema no trabalho? Há solução' : 'Do sonho ao negócio'}</h3><a href="#direitos/${video.slug}">Página do direito</a></div></article>`).join('')}</div></section>`;
}

const quizCards = [
  ['Educação', 'A Constituição reconhece o direito à educação. (art. 79.º)', 'educacao', 'verdade'],
  ['Trabalho', 'A Constituição reconhece o direito ao trabalho e direitos dos trabalhadores. (art. 76.º)', 'trabalho', 'verdade'],
  ['Livre iniciativa', 'A Constituição reconhece a liberdade de iniciativa económica e empresarial. (art. 38.º)', 'livre-iniciativa', 'verdade'],
  ['Educação', 'A Constituição limita o acesso à educação exclusivamente a quem recebe uma bolsa.', 'educacao', 'mito'],
  ['Trabalho', 'A Constituição determina que os trabalhadores não têm direito a remuneração justa.', 'trabalho', 'mito'],
  ['Livre iniciativa', 'A liberdade de iniciativa económica permite ignorar as regras previstas na lei.', 'livre-iniciativa', 'mito'],
  ['Educação', 'A educação é uma das áreas protegidas pela Constituição.', 'educacao', 'verdade'],
  ['Trabalho', 'A Constituição não reconhece direitos aos trabalhadores.', 'trabalho', 'mito'],
  ['Livre iniciativa', 'A iniciativa empresarial deve respeitar os limites previstos na lei.', 'livre-iniciativa', 'verdade'],
  ['Todos', 'A Constituição estabelece direitos e garantias para os cidadãos.', 'educacao', 'verdade']
].map(([category, statement, slug, correctAnswer]) => ({ category, statement, slug, correctAnswer }));

function games() {
  return `${pageHeading('Mito ou Verdade', 'Lê a afirmação e arrasta a carta: esquerda para Mito, direita para Verdade.', 'Jogos')}
    <section class="section game-section"><div id="game-start"><strong class="filter-label">Escolhe o tema</strong><div class="choice-row game-filters" role="group" aria-label="Filtrar afirmações"><button class="choice active" type="button" data-game="Todos" aria-pressed="true">Todos</button><button class="choice" type="button" data-game="Educação" aria-pressed="false">Educação</button><button class="choice" type="button" data-game="Trabalho" aria-pressed="false">Trabalho</button><button class="choice" type="button" data-game="Livre iniciativa" aria-pressed="false">Livre iniciativa económica</button></div><button class="btn gold game-start-button" id="game-start-btn" type="button">Começar</button><p class="muted">Afirmações baseadas nos artigos 38.º, 76.º e 79.º da Constituição.</p></div><div id="game-area" hidden aria-live="polite"></div></section>`;
}

function renderGame() {
  const area = document.querySelector('#game-area');
  if (!area) return;
  const card = gameDeck[gameIndex];
  if (!card) {
    location.hash = '#selo';
    return;
  }
  const percent = ((gameIndex + (gameAnswered ? 1 : 0)) / gameDeck.length) * 100;
  const article = rights.find(right => right.slug === card.slug)?.article || '[A CONFIRMAR]';
  area.innerHTML = `<div class="progress" role="progressbar" aria-label="Progresso do jogo" aria-valuemin="0" aria-valuemax="${gameDeck.length}" aria-valuenow="${gameIndex + (gameAnswered ? 1 : 0)}"><span style="width:${percent}%"></span></div><article class="game-card${gameAnswered ? ' game-card-answered' : ''}${gameAnswered && gameLastCorrect ? ' game-card-correct' : ''}" id="game-card" data-swipe="${gameSelection}">${gameAnswered ? `<div class="game-result-label">${gameLastCorrect ? 'Acertaste!' : 'Não foi desta.'}</div><h2>${card.correctAnswer === 'mito' ? 'Mito' : 'Verdade'}</h2><p>${card.statement}</p><div class="game-article">Constituição da República de Angola · ${article}</div><div class="notice" id="game-feedback"><strong>${gameLastCorrect ? 'Correcto!' : `A tua resposta: ${gameSelection === 'mito' ? 'Mito' : 'Verdade'}.`} Resposta: ${card.correctAnswer === 'mito' ? 'Mito' : 'Verdade'}.</strong><p>Consulta o artigo indicado para conhecer o enquadramento constitucional.</p></div><p class="game-card-score">Pontuação: ${gameScore}/${gameDeck.length}</p>` : `<div class="eyebrow">${card.category}</div><h2>${card.statement}</h2><p class="muted drag-hint"><span class="verdict-mito">← Mito</span><span>Arrasta a carta para escolher</span><span class="verdict-verdade">Verdade →</span></p>`}</article><div class="game-actions">${gameAnswered ? '<button class="btn" id="next-card" type="button">Seguinte</button>' : ''}</div><p class="muted game-score">Pontuação: ${gameScore}/${gameDeck.length}</p>`;
  bindGameCard();
}

function bindGameCard() {
  const card = document.querySelector('#game-card');
  if (card && !gameAnswered) {
    let startX = null;
    card.addEventListener('pointerdown', event => {
      if (event.button !== undefined && event.button !== 0) return;
      startX = event.clientX;
      card.classList.add('is-dragging');
      card.setPointerCapture(event.pointerId);
    });
    card.addEventListener('pointermove', event => {
      if (startX === null) return;
      const distance = event.clientX - startX;
      card.dataset.dragDirection = distance < -15 ? 'mito' : distance > 15 ? 'verdade' : '';
      card.style.transform = document.body.classList.contains('simple') ? `translateX(${distance}px)` : `perspective(1000px) translateX(${distance}px) rotateY(${Math.max(-18, Math.min(18, distance / 16))}deg)`;
    });
    card.addEventListener('pointerup', event => {
      if (startX === null) return;
      const distance = event.clientX - startX;
      startX = null;
      card.classList.remove('is-dragging');
      card.removeAttribute('data-drag-direction');
      if (Math.abs(distance) > 70) {
        const answer = distance > 0 ? 'verdade' : 'mito';
        card.classList.add(answer === 'mito' ? 'swipe-left' : 'swipe-right');
        card.style.transform = `translateX(${answer === 'mito' ? '-120vw' : '120vw'}) rotate(${answer === 'mito' ? '-18deg' : '18deg'})`;
        window.setTimeout(() => answerGame(answer), 200);
      } else {
        card.style.transform = '';
      }
    });
    card.addEventListener('pointercancel', () => { startX = null; card.classList.remove('is-dragging'); card.removeAttribute('data-drag-direction'); card.style.transform = ''; });
  }
  document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => answerGame(button.dataset.answer)));
  document.querySelector('#next-card')?.addEventListener('click', () => { gameIndex += 1; gameAnswered = false; renderGame(); });
}

function answerGame(answer) {
  if (gameAnswered) return;
  gameAnswered = true;
  gameSelection = answer;
  gameLastCorrect = gameDeck[gameIndex]?.correctAnswer === answer;
  if (gameLastCorrect) gameScore += 1;
  renderGame();
}

function selo() {
  const total = gameDeck.length || quizCards.length;
  return `${pageHeading('Selo Cidadão Presente', 'Parabéns pela participação.')}
    <section class="section seal-section"><h2>Leva contigo o que aprendeste</h2><div class="seal" id="seal"><div class="seal-inner"><span class="seal-orbit orbit-one" aria-hidden="true"></span><span class="seal-orbit orbit-two" aria-hidden="true"></span><img class="seal-logo" src="assets/logo.svg" alt="Logótipo Cidadão Presente"><p class="seal-brand">CIDADÃO PRESENTE</p><p class="seal-name" id="seal-name">Cidadão Presente</p><span class="seal-divider" aria-hidden="true"></span><strong id="seal-score">Pontuação: ${gameScore}/${total}</strong></div></div>
    <label class="seal-name-input"><strong>Nome opcional</strong><input id="seal-input" maxlength="60" autocomplete="name" placeholder="Escreve o teu nome"></label><div class="choice-row seal-actions"><button class="btn" id="download-seal" type="button">Descarregar selo</button><a class="btn outline" href="#inicio">Voltar ao Início</a></div></section>`;
}

function sobre() {
  const team = ['Adilson Mário', 'Íris da Costa', 'Jonilson Nhanga', 'Joveth Lopes', 'Marlene Francisco', 'Pedro Capenda'];
  const roles = ['Pesquisa', 'Edição de vídeos', 'Redes sociais', 'Direção criativa', 'Guião e conteúdo', 'Edição de fotos'];
  return `${pageHeading('Um projecto para jovens cidadãos', 'O Cidadão Presente explica, em linguagem simples, os direitos e deveres dos jovens angolanos dos 18 aos 35 anos. Existe porque conhecer a lei é o primeiro passo para participar. Junta informação, vídeos e jogos para que cada jovem saiba o que pode exigir e onde recorrer.', 'Sobre nós')}
    <section class="section about-section"><div class="plain-section"><h2>O cliente</h2><article class="panel client-panel"><div class="client-logo-placeholder">Logótipo<br><span>[A CONFIRMAR]</span></div><div><h3>Mosaiko – Instituto para a Cidadania</h3><p>Apresentação do instituto <span class="data-badge">[A CONFIRMAR]</span></p></div></article></div>
    <div class="plain-section"><h2>A equipa</h2><div class="team-grid">${team.map((name, index) => `<article class="card team-card"><div class="avatar" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg></div><h3>${name}</h3><p>${roles[index]}</p></article>`).join('')}</div></div>
    <div class="plain-section about-contacts"><h2>Contactos</h2><p>Morada: <span class="data-badge">[A CONFIRMAR]</span></p><p>Telefone: <span class="data-badge">[A CONFIRMAR]</span></p><p>Correio electrónico: <span class="data-badge">[A CONFIRMAR]</span></p></div></section>`;
}

const entityData = [
  { slug: 'bolsas', name: 'Gabinete de bolsas de estudo', area: 'Educação', description: 'Entidade responsável pela gestão das bolsas de estudo. [A CONFIRMAR]', right: 'educacao' },
  { slug: 'educacao', name: 'Ministério da Educação', area: 'Educação', description: 'Entidade governamental responsável pela área da educação. Consulta os canais institucionais para informação sobre serviços e procedimentos.', right: 'educacao' },
  { slug: 'trabalho', name: 'Inspecção-Geral do Trabalho', area: 'Trabalho', description: 'Entidade pública ligada à fiscalização das relações e condições de trabalho. Confirma os canais oficiais antes de apresentar uma reclamação.', right: 'trabalho' },
  { slug: 'iniciativa', name: 'INAPEM', area: 'Livre iniciativa económica', description: 'Instituto Nacional de Apoio às Micro, Pequenas e Médias Empresas. Procura informação institucional sobre apoio e serviços para empresas.', right: 'livre-iniciativa' },
  { slug: 'provedor', name: 'Provedor de Justiça', area: 'Direitos e garantias', description: 'Órgão independente previsto na Constituição, com atribuições de defesa dos direitos, liberdades e garantias dos cidadãos (art. 192.º).', right: 'educacao' }
];

function entidade(slug = '') {
  const entity = entityData.find(item => item.slug === slug);
  if (!entity) {
    return `${pageHeading('Entidades de apoio', 'Escolhe uma entidade e consulta a respectiva informação.') }
      <section class="section"><div class="cards">${entityData.map(item => `<article class="card"><div class="eyebrow">${item.area}</div><h2>${item.name}</h2><p>${item.description}</p><a class="btn outline" href="#entidade/${item.slug}">Mais informação</a></article>`).join('')}</div></section>`;
  }
  const right = rights.find(item => item.slug === entity.right);
  if (slug === 'bolsas') {
    return `${pageHeading(entity.name, 'Entidade responsável pela gestão das bolsas de estudo. [A CONFIRMAR]', 'Ficha da entidade')}
      <section class="section entity-detail">
        <section class="entity-section"><h2>Quando recorrer a esta entidade</h2><p>Quando a tua bolsa está atrasada, foi suspensa ou tens dúvidas sobre o contrato. <span class="data-badge">[A CONFIRMAR]</span></p></section>
        <section class="entity-section"><h2>O que levar</h2><div class="entity-checklist"><label><input type="checkbox"> Bilhete de identidade</label><label><input type="checkbox"> Contrato da bolsa</label><label><input type="checkbox"> Comprovativo de matrícula</label><label><input type="checkbox"> Comunicações recebidas</label></div></section>
        <section class="entity-section"><h2>Como apresentar o problema</h2><ol class="entity-steps"><li>Dirige-te ao atendimento com os documentos.</li><li>Explica o problema e pede um número de processo.</li><li>Guarda o comprovativo da entrega.</li><li>Acompanha o processo no prazo indicado.</li></ol></section>
        <section class="entity-section entity-contacts"><div><h2>Contactos</h2><ul><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>Morada <span class="data-badge">[A CONFIRMAR]</span></li><li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5 12 12 0 0 0 2.9.7 2 2 0 0 1 1.8 2.1Z"/></svg>Telefone <span class="data-badge">[A CONFIRMAR]</span></li><li><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>Correio electrónico <span class="data-badge">[A CONFIRMAR]</span></li></ul></div><div class="entity-map">Mapa da localização <span class="data-badge">[A CONFIRMAR]</span></div></section>
        <div class="choice-row entity-actions"><a class="btn" href="#onde-recorrer">← Voltar a Onde recorrer</a><a class="btn outline" href="#onde-recorrer">Ver outro problema</a><button class="btn outline" type="button" id="print-entity">▣ Imprimir</button></div>
      </section>`;
  }
  return `${pageHeading(entity.name, entity.description, entity.area)}
    <section class="section">
      <div class="notice">Confirma os serviços, competências e canais de atendimento directamente junto da entidade. Este site não recolhe reclamações nem substitui aconselhamento jurídico.</div>
      <section class="plain-section"><h2>Enquadramento constitucional</h2><p>Consulta a informação sobre <a href="#direitos/${right.slug}">${right.title} (${right.article})</a>.</p></section>
      <section class="plain-section"><h2>Antes de contactar</h2><ol class="list-steps"><li>Procura o canal oficial de atendimento da entidade.</li><li>Organiza datas, factos e documentos relacionados com a situação.</li><li>Explica o pedido com clareza e pergunta quais são os próximos passos.</li><li>Evita enviar documentos ou dados pessoais por canais que não tenhas confirmado.</li></ol></section>
      <div class="choice-row"><a class="btn outline" href="#onde-recorrer">Voltar a Onde recorrer</a><a class="btn" href="#entidade">Ver outras entidades</a></div>
    </section>`;
}

function drawCitizenLogo(context) {
  const scale = 150 / 155.8;
  context.save();
  context.translate(425, 158);
  context.scale(scale, scale);
  context.fillStyle = '#F4A21D';
  context.fill(new Path2D('M77.50,5.50A77,77 0 0,0 14.60,126.91L17.94,131.65L34.25,107.58A50,50 0 0,1 77.50,32.50Z'));
  context.fillStyle = '#D79217';
  context.fill(new Path2D('M77.50,5.50A77,77 0 0,1 113.00,14.17L114.40,21.30L122.30,40.30L122.30,43.70L117.36,52.31A50,50 0 0,0 77.50,32.50ZM119.90,112.30L136.50,81.90L147.10,50.70L147.67,50.80A77,77 0 0,1 140.40,126.91L137.75,130.67Z'));
  context.fillStyle = '#C8372D';
  context.fill(new Path2D('M77.50,171.50L53.00,138.70L38.40,160.70L77.50,216.00Z'));
  context.fillStyle = '#BC3029';
  context.fill(new Path2D('M77.50,171.50L119.90,112.30L137.75,130.67L77.50,216.00Z'));
  context.fillStyle = '#0F3D5E';
  context.fill(new Path2D('M129.30,40.10L120.90,20.30C120.90,18.10 124.10,17.70 125.90,19.90L130.50,25.20L133.80,7.00C133.80,4.00 135.00,3.00 136.10,3.00C137.50,3.00 138.30,4.50 138.30,6.50L137.90,19.00L141.90,6.50C142.10,2.50 142.90,0.70 144.10,0.70C145.50,0.70 146.30,2.50 146.10,5.00L144.00,19.00L147.10,8.50C147.70,6.30 148.90,5.30 150.10,5.30C151.50,5.30 152.50,6.90 152.30,8.70L149.10,22.00L152.50,16.00C152.90,14.30 153.90,13.50 154.70,13.90C155.70,14.40 155.80,16.00 155.50,17.50C153.70,23.00 152.00,28.50 150.00,34.00C147.50,40.50 142.50,45.50 140.50,53.00L130.30,80.70L77.70,142.40L58.10,121.10L34.10,154.90L23.50,140.70L23.20,137.30C28.30,126.10 37.30,111.50 45.40,105.30L67.50,95.70L67.50,90.50C63.00,86.00 60.10,79.50 60.10,71.50C60.10,60.50 67.90,51.10 77.90,51.10C87.90,51.10 95.70,51.10 95.70,68.50C95.70,76.50 93.30,82.00 88.90,88.50L88.30,93.90L92.70,94.50C105.50,85.50 117.50,67.50 128.70,44.70Z'));
  context.restore();
}

function downloadSeal() {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 1000;
  const context = canvas.getContext('2d');
  if (!context) {
    window.alert('Não foi possível gerar a imagem neste navegador.');
    return;
  }
  const name = document.querySelector('#seal-name')?.textContent || 'Cidadão Presente';
  try {
    context.fillStyle = '#f2b72f';
    context.beginPath();
    context.arc(500, 500, 470, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#ffffff';
    context.beginPath();
    context.arc(500, 500, 448, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = '#132951';
    context.lineWidth = 8;
    context.beginPath();
    context.arc(500, 500, 420, 0, Math.PI * 2);
    context.stroke();
    drawCitizenLogo(context);
    context.textAlign = 'center';
    context.fillStyle = '#132951';
    context.font = 'bold 52px Arial';
    context.fillText('CIDADÃO PRESENTE', 500, 465, 760);
    context.fillStyle = '#5e6b81';
    context.font = 'bold 42px Arial';
    context.fillText(name, 500, 545, 760);
    context.strokeStyle = '#f2b72f';
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(355, 590);
    context.lineTo(645, 590);
    context.stroke();
    context.fillStyle = '#132951';
    context.font = 'bold 34px Arial';
    context.fillText(`PONTUAÇÃO: ${gameScore}/${gameDeck.length || quizCards.length}`, 500, 655, 760);
    const dataUrl = canvas.toDataURL('image/png');
    const binary = atob(dataUrl.slice(dataUrl.indexOf(',') + 1));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    const png = new Blob([bytes], { type: 'image/png' });
    const objectUrl = URL.createObjectURL(png);
    const link = document.createElement('a');
    link.download = 'selo-cidadao-presente.png';
    link.href = objectUrl;
    link.style.position = 'fixed';
    link.style.left = '-10000px';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
  } catch (error) {
    console.error('Falha ao gerar o selo PNG.', error);
    window.alert('Não foi possível gerar o selo. Tenta novamente ou usa outro navegador.');
  }
}

function route() {
  const hash = location.hash.slice(1) || 'inicio';
  if (hash === 'entidade' || hash.startsWith('entidade/')) {
    app.innerHTML = entidade(hash.split('/')[1] || '');
    document.querySelectorAll('[data-nav]').forEach(link => link.classList.toggle('active', link.dataset.nav === 'onde-recorrer'));
    bindGeneral();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (hash.startsWith('direitos/')) {
    app.innerHTML = rightDetail(hash.split('/')[1]);
    document.querySelectorAll('[data-nav]').forEach(link => link.classList.toggle('active', link.dataset.nav === 'direitos'));
    bindGeneral();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const key = hash === 'acompanhar-oge' ? 'acompanhar-oge' : pages[hash] ? hash : 'inicio';
  app.innerHTML = pages[key]();
  document.querySelectorAll('[data-nav]').forEach(link => link.classList.toggle('active', link.dataset.nav === (key === 'acompanhar-oge' ? 'oge' : key)));
  bindGeneral();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindGeneral() {
  if (document.querySelector('#oge-chart')) {
    renderOge();
    document.querySelector('#oge-value').addEventListener('input', () => renderOge(document.querySelector('#oge-to').classList.contains('active') ? 'to' : 'from'));
    document.querySelector('#oge-year').addEventListener('change', () => renderOge(document.querySelector('#oge-to').classList.contains('active') ? 'to' : 'from'));
    document.querySelector('#oge-to').addEventListener('click', () => setOgeTab('to'));
    document.querySelector('#oge-from').addEventListener('click', () => setOgeTab('from'));
  }

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    document.querySelectorAll('.video-card').forEach(card => { card.hidden = button.dataset.filter !== 'Todos' && card.dataset.category !== button.dataset.filter; });
  }));

  document.querySelectorAll('.select-video').forEach(button => button.addEventListener('click', () => selectVideo(Number(button.dataset.video))));
  document.querySelector('#captions-toggle')?.addEventListener('change', event => {
    const transcript = document.querySelector('#video-transcript');
    if (event.currentTarget.checked && activeVideo !== null) transcript.textContent = videosData[activeVideo].transcript;
  });
  document.querySelector('#transcript-toggle')?.addEventListener('click', () => {
    const transcript = document.querySelector('#video-transcript');
    const show = transcript.hidden;
    transcript.hidden = !show;
    document.querySelector('#transcript-toggle').textContent = show ? 'Ocultar transcrição' : 'Mostrar transcrição';
    if (show && activeVideo !== null) transcript.textContent = videosData[activeVideo].transcript;
  });

  document.querySelectorAll('[data-game]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-game]').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
  }));
  document.querySelector('#game-start-btn')?.addEventListener('click', () => {
    const filter = document.querySelector('[data-game].active')?.dataset.game || 'Todos';
    gameDeck = quizCards.filter(card => filter === 'Todos' || card.category === filter || card.category === 'Todos');
    gameIndex = 0;
    gameScore = 0;
    gameAnswered = false;
    document.querySelector('#game-start').hidden = true;
    document.querySelector('#game-area').hidden = false;
    renderGame();
  });

  document.querySelector('#seal-input')?.addEventListener('input', event => {
    document.querySelector('#seal-name').textContent = event.currentTarget.value.trim() || 'Cidadão Presente';
  });
  document.querySelector('#download-seal')?.addEventListener('click', downloadSeal);
  document.querySelector('#print-entity')?.addEventListener('click', () => window.print());

  const routeStart = document.querySelector('#route-start');
  if (routeStart) {
    routeStart.querySelectorAll('[data-area]').forEach(button => button.addEventListener('click', () => {
      routeStart.querySelectorAll('[data-area]').forEach(item => {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      renderProblems(button.dataset.area);
    }));
    renderProblems('educacao');
  }
}

function selectVideo(index) {
  const video = videosData[index];
  if (!video) return;
  activeVideo = index;
  document.querySelector('#video-title').textContent = video.title;
  document.querySelector('#video-subtitle').textContent = `${video.subtitle} Ficheiro: [A CONFIRMAR].`;
  const transcript = document.querySelector('#video-transcript');
  transcript.textContent = video.transcript;
}

function setOgeTab(tab) {
  const isOutflow = tab === 'to';
  document.querySelector('#oge-to').classList.toggle('active', isOutflow);
  document.querySelector('#oge-from').classList.toggle('active', !isOutflow);
  document.querySelector('#oge-to').setAttribute('aria-pressed', String(isOutflow));
  document.querySelector('#oge-from').setAttribute('aria-pressed', String(!isOutflow));
  renderOge(tab);
}

window.addEventListener('hashchange', route);
document.querySelector('.menu-toggle').addEventListener('click', event => {
  const nav = document.querySelector('.main-nav');
  const open = nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelector('.main-nav').addEventListener('click', () => {
  document.querySelector('.main-nav').classList.remove('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
});
route();
