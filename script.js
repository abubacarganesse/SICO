/* ==========================================================================
   CONFIGURAÇÃO
   ========================================================================== */
const CONFIG = {
  storageKeys: {
    user: 'sico_user',
    reports: 'sico_reports',
    notifications: 'sico_notifications',
    preferences: 'sico_preferences'
  },
  demoCenter: { lat: -15.1165, lng: 39.2666 }, // Nampula
  categories: [
    { id: 'lighting', name: 'Iluminação', icon: 'lighting.svg', color: '#F59E0B' },
    { id: 'road', name: 'Estrada', icon: 'road.svg', color: '#1677E8' },
    { id: 'water', name: 'Água', icon: 'water.svg', color: '#20B39A' },
    { id: 'waste', name: 'Lixo', icon: 'waste.svg', color: '#8B5E3C' },
    { id: 'traffic', name: 'Sinalização', icon: 'traffic.svg', color: '#E14C4C' },
    { id: 'infrastructure', name: 'Infraestrutura', icon: 'infrastructure.svg', color: '#5B5F97' },
    { id: 'public_space', name: 'Espaço público', icon: 'public-space.svg', color: '#22A06B' },
    { id: 'other', name: 'Outro', icon: 'other.svg', color: '#6B7686' }
  ],
  statuses: [
    { id: 'reported', name: 'Reportado' },
    { id: 'analysis', name: 'Em análise' },
    { id: 'progress', name: 'Em resolução' },
    { id: 'resolved', name: 'Resolvido' }
  ]
};

function catById(id) { return CONFIG.categories.find(c => c.id === id) || CONFIG.categories[7]; }
function statusName(id) { const s = CONFIG.statuses.find(s => s.id === id); return s ? s.name : id; }

/* ==========================================================================
   DADOS DE DEMONSTRAÇÃO
   ========================================================================== */
const DEMO_USER = {
  name: 'Abubacar',
  email: 'abubacar.sico@exemplo.co.mz',
  phone: '+258 84 123 4567',
  locality: 'Nampula, Moçambique'
};

const DEMO_REPORTS = [
  {
    code: 'NMP-2026-004821',
    title: 'Poste de iluminação avariado',
    category: 'lighting',
    description: 'O poste de iluminação em frente ao mercado está apagado há mais de uma semana, deixando a rua escura à noite.',
    location: { lat: -15.1120, lng: 39.2601, label: 'Muahivire, Nampula' },
    status: 'analysis',
    photos: ['assets/reports/poste-avariado.svg'],
    date: daysAgo(2),
    history: [
      { at: daysAgo(2), time: '09:14', label: 'Ocorrência reportada pelo cidadão' },
      { at: daysAgo(2), time: '11:30', label: 'Ocorrência validada' },
      { at: daysAgo(1), time: '14:05', label: 'Entidade responsável assumiu o caso' }
    ]
  },
  {
    code: 'NMP-2026-003719',
    title: 'Buraco na estrada',
    category: 'road',
    description: 'Buraco grande na via principal que está a danificar os veículos que passam.',
    location: { lat: -15.1225, lng: 39.2712, label: 'Namutequeliua, Nampula' },
    status: 'progress',
    photos: ['assets/reports/buraco-estrada.svg'],
    date: daysAgo(6),
    history: [
      { at: daysAgo(6), time: '07:40', label: 'Ocorrência reportada pelo cidadão' },
      { at: daysAgo(6), time: '09:15', label: 'Ocorrência validada' },
      { at: daysAgo(5), time: '10:00', label: 'Entidade responsável assumiu o caso' },
      { at: daysAgo(4), time: '08:20', label: 'Equipa de intervenção mobilizada' },
      { at: daysAgo(1), time: '07:50', label: 'Equipa chegou ao local' }
    ],
    intervention: {
      status: 'in_progress',
      date: formatDateOnly(daysAgo(1)),
      startTime: '07:50',
      endTime: null,
      duration: null,
      workDescription: 'Preparação do local e sinalização temporária. Reparo do pavimento em curso.',
      solution: 'Enchimento e compactação do buraco com material betuminoso.',
      teamNotes: 'Trânsito condicionado numa faixa. Previsão de conclusão no mesmo dia.',
      photosBefore: ['assets/reports/buraco-estrada.svg'],
      photosAfter: [],
      entity: {
        name: 'Conselho Municipal',
        department: 'Departamento de Estradas e Pavimentos',
        responsible: 'Maria dos Santos'
      },
      team: {
        name: 'Equipa de Manutenção Viária — Zona Sul',
        leader: 'António Joaquim',
        membersCount: 4,
        members: [
          { name: 'António Joaquim', role: 'Líder de equipa' },
          { name: 'Pedro Nhampossa', role: 'Operador de maquinaria' },
          { name: 'Sérgio Mateus', role: 'Operário de pavimentação' },
          { name: 'Luís Cossa', role: 'Sinalização e apoio' }
        ],
        contact: '+258 84 200 1100'
      },
      resources: {
        vehicles: [
          { type: 'Camião de apoio', id: 'CM-NPL-011', notes: 'Transporte de material' },
          { type: 'Viatura leve', id: 'CM-NPL-087', notes: 'Apoio técnico' }
        ],
        equipment: ['Compactador', 'Ferramentas de pavimentação', 'Sinalização temporária'],
        materials: [{ name: 'Mistura betuminosa a frio', qty: '1,2 t' }]
      }
    }
  },
  {
    code: 'NMP-2026-002814',
    title: 'Lixo acumulado',
    category: 'waste',
    description: 'Acumulação de lixo há vários dias junto à paragem de chapa, com mau cheiro.',
    location: { lat: -15.1041, lng: 39.2555, label: 'Carrupeia, Nampula' },
    status: 'resolved',
    photos: ['assets/reports/lixo-acumulado.svg'],
    date: daysAgo(14),
    history: [
      { at: daysAgo(14), time: '08:10', label: 'Ocorrência reportada pelo cidadão' },
      { at: daysAgo(14), time: '08:25', label: 'Ocorrência validada' },
      { at: daysAgo(14), time: '08:40', label: 'Entidade responsável assumiu o caso' },
      { at: daysAgo(14), time: '09:00', label: 'Equipa de intervenção mobilizada' },
      { at: daysAgo(14), time: '09:15', label: 'Equipa chegou ao local' },
      { at: daysAgo(14), time: '10:30', label: 'Intervenção concluída' },
      { at: daysAgo(14), time: '10:40', label: 'Ocorrência marcada como resolvida' }
    ],
    intervention: {
      status: 'completed',
      date: formatDateOnly(daysAgo(14)),
      startTime: '08:30',
      endTime: '10:05',
      duration: '1h 35min',
      workDescription: 'Remoção dos resíduos acumulados junto à paragem de chapa e limpeza completa da área circundante.',
      solution: 'Recolha mecanizada e manual dos resíduos, lavagem da zona e encaminhamento para o aterro sanitário.',
      teamNotes: 'Volume estimado de 2,5 m³. Situação recorrente neste ponto; recomendada colocação de contentor adicional.',
      photosBefore: ['assets/reports/lixo-acumulado.svg'],
      photosAfter: ['assets/reports/lixo-acumulado-corrigido.svg'],
      entity: {
        name: 'Conselho Municipal',
        department: 'Departamento de Limpeza Urbana',
        responsible: 'João Manuel'
      },
      team: {
        name: 'Equipa de Limpeza Urbana — Zona Central',
        leader: 'Carlos Alberto',
        membersCount: 5,
        members: [
          { name: 'Carlos Alberto', role: 'Líder de equipa' },
          { name: 'João Manuel', role: 'Supervisor de campo' },
          { name: 'Fatima Muhate', role: 'Operadora de recolha' },
          { name: 'José Chiponde', role: 'Operário de limpeza' },
          { name: 'Ana Langa', role: 'Apoio logístico' }
        ],
        contact: '+258 84 200 1200'
      },
      resources: {
        vehicles: [
          { type: 'Camião de recolha', id: 'CM-NPL-024', notes: 'Recolha principal' },
          { type: 'Viatura de apoio', id: 'CM-NPL-053', notes: 'Transporte de equipa e ferramentas' }
        ],
        equipment: ['Contentores móveis', 'Ferramentas de limpeza', 'Vassouras e pás'],
        materials: [{ name: 'Sacos de resíduo', qty: '12 un.' }]
      },
      resolution: {
        result: 'Área limpa e resíduos encaminhados para o local apropriado.',
        validatedBy: 'João Manuel',
        completedAt: daysAgo(14),
        finalNotes: 'Intervenção concluída com sucesso. Recomenda-se monitorização do ponto nas próximas semanas.'
      }
    }
  },
  {
    code: 'NMP-2026-001527',
    title: 'Fuga de água',
    category: 'water',
    description: 'Fuga de água constante num cano partido, a desperdiçar bastante água.',
    location: { lat: -15.1178, lng: 39.2680, label: 'Nampula' },
    status: 'reported',
    photos: ['assets/reports/fuga-agua.svg'],
    date: daysAgo(1),
    history: [
      { at: daysAgo(1), time: '16:22', label: 'Ocorrência reportada pelo cidadão' }
    ]
  },
  {
    code: 'NMP-2026-005193',
    title: 'Sinalização danificada',
    category: 'traffic',
    description: 'Placa de sinalização caída, dificultando a orientação dos condutores.',
    location: { lat: -15.1090, lng: 39.2739, label: 'Nampula' },
    status: 'analysis',
    photos: ['assets/reports/sinalizacao-danificada.svg'],
    date: daysAgo(3),
    history: [
      { at: daysAgo(3), time: '11:05', label: 'Ocorrência reportada pelo cidadão' },
      { at: daysAgo(3), time: '14:40', label: 'Ocorrência validada' }
    ]
  },
  {
    code: 'NMP-2026-005642',
    title: 'Estrada danificada',
    category: 'road',
    description: 'Troço de estrada com piso muito degradado e fendas extensas.',
    location: { lat: -15.1260, lng: 39.2590, label: 'Nampula' },
    status: 'resolved',
    photos: ['assets/reports/estrada-danificada.svg'],
    date: daysAgo(20),
    history: [
      { at: daysAgo(20), time: '08:00', label: 'Ocorrência reportada pelo cidadão' },
      { at: daysAgo(19), time: '09:30', label: 'Ocorrência validada' },
      { at: daysAgo(18), time: '10:15', label: 'Entidade responsável assumiu o caso' },
      { at: daysAgo(17), time: '07:00', label: 'Equipa de intervenção mobilizada' },
      { at: daysAgo(17), time: '07:45', label: 'Equipa chegou ao local' },
      { at: daysAgo(16), time: '16:20', label: 'Intervenção concluída' },
      { at: daysAgo(16), time: '16:45', label: 'Ocorrência marcada como resolvida' }
    ],
    intervention: {
      status: 'completed',
      date: formatDateOnly(daysAgo(17)),
      startTime: '07:45',
      endTime: '16:20',
      duration: '8h 35min',
      workDescription: 'Reparação do piso degradado com recapeamento parcial e selagem de fendas.',
      solution: 'Fresagem localizada, aplicação de nova camada de asfalto e compactação.',
      teamNotes: 'Trabalhos realizados em duas fases para minimizar impacto no trânsito.',
      photosBefore: ['assets/reports/estrada-danificada.svg'],
      photosAfter: ['assets/reports/buraco-estrada-corrigido.svg'],
      entity: {
        name: 'Conselho Municipal',
        department: 'Departamento de Estradas e Pavimentos',
        responsible: 'Helena Muianga'
      },
      team: {
        name: 'Equipa de Pavimentação — Equipa 02',
        leader: 'Rui Nascimento',
        membersCount: 6,
        members: [
          { name: 'Rui Nascimento', role: 'Líder de equipa' },
          { name: 'Helena Muianga', role: 'Engenheira de supervisão' },
          { name: 'Manuel Tamele', role: 'Operador de fresadora' },
          { name: 'Paulo Chongo', role: 'Operador de cilindro' },
          { name: 'Sara Bila', role: 'Controlo de qualidade' },
          { name: 'David Macuácua', role: 'Apoio e sinalização' }
        ],
        contact: '+258 84 200 1300'
      },
      resources: {
        vehicles: [
          { type: 'Camião basculante', id: 'CM-NPL-031', notes: 'Transporte de material' },
          { type: 'Fresadora', id: 'CM-NPL-F02', notes: 'Preparação do piso' },
          { type: 'Cilindro compactador', id: 'CM-NPL-C07', notes: 'Compactação final' }
        ],
        equipment: ['Fresadora', 'Cilindro', 'Ferramentas de medição'],
        materials: [{ name: 'Betume asfáltico', qty: '4,8 t' }, { name: 'Agregados', qty: '3 m³' }]
      },
      resolution: {
        result: 'Troço reparado e reaberto ao trânsito em condições de segurança.',
        validatedBy: 'Helena Muianga',
        completedAt: daysAgo(16),
        finalNotes: 'Pavimento em bom estado. Monitorização recomendada após as primeiras chuvas.'
      }
    }
  },
  {
    code: 'NMP-2026-006012',
    title: 'Poste sem iluminação no bairro',
    category: 'lighting',
    description: 'Vários postes seguidos sem luz numa mesma rua residencial.',
    location: { lat: -15.0995, lng: 39.2620, label: 'Natikiri, Nampula' },
    status: 'reported',
    photos: ['assets/reports/poste-avariado.svg'],
    date: daysAgo(1),
    history: [
      { at: daysAgo(1), time: '19:45', label: 'Ocorrência reportada pelo cidadão' }
    ]
  },
  {
    code: 'NMP-2026-006340',
    title: 'Contentor de lixo danificado',
    category: 'waste',
    description: 'Contentor partido, fazendo com que o lixo se espalhe pela rua.',
    location: { lat: -15.1155, lng: 39.2810, label: 'Nampula' },
    status: 'progress',
    photos: ['assets/reports/lixo-acumulado.svg'],
    date: daysAgo(5),
    history: [
      { at: daysAgo(5), time: '10:10', label: 'Ocorrência reportada pelo cidadão' },
      { at: daysAgo(5), time: '12:00', label: 'Ocorrência validada' },
      { at: daysAgo(4), time: '09:30', label: 'Entidade responsável assumiu o caso' },
      { at: daysAgo(3), time: '08:00', label: 'Equipa de intervenção mobilizada' }
    ],
    intervention: {
      status: 'planned',
      date: formatDateOnly(daysAgo(2)),
      startTime: null,
      endTime: null,
      duration: null,
      workDescription: 'Substituição do contentor danificado e limpeza da área envolvente.',
      solution: 'Instalação de contentor novo de 1 100 L e recolha dos resíduos espalhados.',
      teamNotes: 'Aguardando disponibilidade de contentor de substituição.',
      photosBefore: ['assets/reports/lixo-acumulado.svg'],
      photosAfter: [],
      entity: {
        name: 'Conselho Municipal',
        department: 'Departamento de Limpeza Urbana',
        responsible: 'João Manuel'
      },
      team: {
        name: 'Equipa de Limpeza Urbana — Equipa 03',
        leader: 'Carlos Alberto',
        membersCount: 3,
        members: [
          { name: 'Carlos Alberto', role: 'Líder de equipa' },
          { name: 'José Chiponde', role: 'Operário de limpeza' },
          { name: 'Ana Langa', role: 'Apoio logístico' }
        ],
        contact: '+258 84 200 1200'
      },
      resources: {
        vehicles: [
          { type: 'Camião de apoio', id: 'CM-NPL-053', notes: 'Transporte do contentor' }
        ],
        equipment: ['Contentor 1 100 L', 'Ferramentas de limpeza'],
        materials: []
      }
    }
  },
  {
    code: 'NMP-2026-006588',
    title: 'Fuga de água na avenida',
    category: 'water',
    description: 'Fuga de água a formar uma poça grande na via, com risco de acidentes.',
    location: { lat: -15.1300, lng: 39.2670, label: 'Nampula' },
    status: 'analysis',
    photos: ['assets/reports/fuga-agua.svg'],
    date: daysAgo(4),
    history: [
      { at: daysAgo(4), time: '06:55', label: 'Ocorrência reportada pelo cidadão' },
      { at: daysAgo(4), time: '08:20', label: 'Ocorrência validada' }
    ]
  },
  {
    code: 'NMP-2026-006701',
    title: 'Sinal de trânsito apagado',
    category: 'traffic',
    description: 'Sinalização horizontal quase invisível, dificultando a travessia de peões.',
    location: { lat: -15.1050, lng: 39.2480, label: 'Nampula' },
    status: 'reported',
    photos: ['assets/reports/sinalizacao-danificada.svg'],
    date: daysAgo(1),
    history: [
      { at: daysAgo(1), time: '13:18', label: 'Ocorrência reportada pelo cidadão' }
    ]
  }
];

function formatDateOnly(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-MZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
}


function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const DEMO_NOTIFICATIONS = [
  { title: 'Reporte recebido', description: 'O seu reporte NMP-2026-004821 foi registado.', type: 'success', date: daysAgo(2) },
  { title: 'Reporte em resolução', description: 'O seu reporte NMP-2026-003719 está agora em resolução.', type: 'info', date: daysAgo(1) },
  { title: 'Problema resolvido', description: 'O problema que reportou (NMP-2026-002814) foi marcado como resolvido.', type: 'success', date: daysAgo(0) }
];

/* ==========================================================================
   ESTADO DA APLICAÇÃO
   ========================================================================== */
const state = {
  currentView: 'home',
  user: null,
  reports: [],
  notifications: [],
  map: null,
  mapMarkersLayer: null,
  mapPreview: null,
  filters: { category: 'all', status: 'all', distance: 'all' },
  reportDraft: { category: null, photos: [], location: null, description: '' },
  currentStep: 1,
  reportsFilterStatus: 'all',
  activeDetailCode: null,
  userPosition: null
};

/* ==========================================================================
   LOCAL STORAGE
   ========================================================================== */
function loadStorage() {
  state.user = readJSON(CONFIG.storageKeys.user, DEMO_USER);
  let reports = DEMO_REPORTS.map(r => ({ ...r, isDemo: true })); writeJSON(CONFIG.storageKeys.reports, reports); state.reports = reports; let notifications = readJSON(CONFIG.storageKeys.notifications, null); if (!notifications) { notifications = DEMO_NOTIFICATIONS; writeJSON(CONFIG.storageKeys.notifications, notifications); } state.notifications = notifications;
}
function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { }
}
function saveReports() { writeJSON(CONFIG.storageKeys.reports, state.reports); }
function saveNotifications() { writeJSON(CONFIG.storageKeys.notifications, state.notifications); }
function saveUser() { writeJSON(CONFIG.storageKeys.user, state.user); }

/* ==========================================================================
   UTILITÁRIOS
   ========================================================================== */
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
}

function generateReportCode() {
  const year = new Date().getFullYear();
  const num = Math.floor(100000 + Math.random() * 899999);
  const code = `NMP-${year}-${num}`;
  const exists = state.reports.some(r => r.code === code);
  return exists ? generateReportCode() : code;
}

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function showToast(message) {
  const toast = qs('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2600);
}

function iconMarkup(iconFile, size) {
  return `<img src="assets/icons/${iconFile}" width="${size || 16}" height="${size || 16}" alt="" style="filter:brightness(0) saturate(100%);">`;
}

/* ==========================================================================
   NAVEGAÇÃO
   ========================================================================== */
function navigateTo(viewName, opts) {
  opts = opts || {};
  const prevView = state.currentView;
  state.currentView = viewName;

  qsa('.view').forEach(v => {
    const isActive = v.dataset.view === viewName;
    v.classList.toggle('active', isActive);
    // Extra safety so inactive views never intercept clicks / paint over chrome
    if (isActive) {
      v.removeAttribute('aria-hidden');
      v.style.pointerEvents = '';
    } else {
      v.setAttribute('aria-hidden', 'true');
      v.style.pointerEvents = 'none';
    }
  });
  qsa('.bottom-nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName);
  });
  qsa('.desktop-nav-item[data-view]').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewName);
  });
  // Header "Reportar" CTA
  qsa('.desktop-nav-item.primary-cta').forEach(b => {
    b.classList.toggle('active', viewName === 'report');
  });

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  // Tear down map preview when leaving home to avoid overlay glitches
  if (prevView === 'home' && viewName !== 'home' && state.mapPreview) {
    try { state.mapPreview.remove(); } catch (e) { /* ignore */ }
    state.mapPreview = null;
    const previewEl = qs('#mapPreview');
    if (previewEl) previewEl.innerHTML = '';
  }

  if (viewName === 'home') renderHome();
  if (viewName === 'map') renderMapView();
  if (viewName === 'reports') renderMyReports();
  if (viewName === 'profile') renderProfile();
  if (viewName === 'notifications') renderNotifications();
  if (viewName === 'report') {
    if (!opts.keepDraft) resetReportFlow();
    else goToStep(state.currentStep || 1);
  }
  if (viewName === 'detail' && opts.code) renderDetail(opts.code);

  closeSideMenu();
  closeSheet('filterSheet', 'filterOverlay');
  closeSheet('markerSheet', 'markerOverlay');
}

function initNavigation() {
  // Event delegation — reliable for static and dynamic buttons
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn && !navBtn.disabled && !navBtn.hasAttribute('disabled')) {
      e.preventDefault();
      e.stopPropagation();
      navigateTo(navBtn.getAttribute('data-nav'));
      return;
    }
    // Apenas botões de navegação reais devem accionar navigateTo — as próprias
    // secções .view também têm data-view como identificador, e qualquer clique
    // lá dentro (fotos, descrição, filtros...) não pode ser interpretado como navegação.
    const viewBtn = e.target.closest('button[data-view]');
    if (viewBtn && !viewBtn.closest('#sideMenu') && !viewBtn.disabled && !viewBtn.hasAttribute('disabled')) {
      e.preventDefault();
      e.stopPropagation();
      navigateTo(viewBtn.getAttribute('data-view'));
    }
  });
}

/* ==========================================================================
   MENU
   ========================================================================== */
function initMenu() {
  const menu = qs('#sideMenu');
  const overlay = qs('#sideMenuOverlay');
  qs('#menuBtn').addEventListener('click', () => { menu.classList.add('open'); overlay.classList.add('open'); });
  const brand = qs('#brandHome');
  if (brand) brand.addEventListener('click', (e) => { e.preventDefault(); navigateTo('home'); });
  qs('#closeMenuBtn').addEventListener('click', closeSideMenu);
  overlay.addEventListener('click', closeSideMenu);

  qsa('.side-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.dataset.menuView) { navigateTo(item.dataset.menuView); return; }
      const action = item.dataset.action;
      if (action === 'logout') { showToast('Sessão terminada (demonstração).'); closeSideMenu(); return; }
      if (action === 'help') { showToast('Central de ajuda em breve.'); closeSideMenu(); return; }
      if (action === 'settings') { showToast('Definições em breve.'); closeSideMenu(); return; }
    });
  });
}
function closeSideMenu() {
  qs('#sideMenu').classList.remove('open');
  qs('#sideMenuOverlay').classList.remove('open');
}

/* ==========================================================================
   HOME
   ========================================================================== */
function renderHome() {
  qs('#greetingText').textContent = `Olá, ${state.user.name}`;
  renderMetrics(qs('#activityMetrics'));

  const recent = [...state.reports].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  renderReportList(qs('#recentReports'), recent);

  initMapPreview();
}

function computeMetrics() {
  const analysis = state.reports.filter(r => r.status === 'analysis' || r.status === 'reported').length;
  const progress = state.reports.filter(r => r.status === 'progress').length;
  const resolved = state.reports.filter(r => r.status === 'resolved').length;
  return { analysis, progress, resolved };
}

function renderMetrics(container) {
  const m = computeMetrics();
  container.innerHTML = '';
  const items = [
    { label: 'Em análise', value: m.analysis },
    { label: 'Em resolução', value: m.progress },
    { label: 'Resolvidos', value: m.resolved }
  ];
  items.forEach(it => {
    const card = el('div', 'metric-card');
    card.innerHTML = `<div class="metric-value">${it.value}</div><div class="metric-label">${it.label}</div>`;
    container.appendChild(card);
  });
}

function reportCardHTML(report) {
  const cat = catById(report.category);
  const photo = report.photos && report.photos[0];
  return `
    <div class="report-card" data-code="${report.code}" role="button" tabindex="0">
      <div class="report-card-img">${photo ? `<img src="${photo}" alt="">` : ''}</div>
      <div class="report-card-body">
        <div class="report-card-cat">${iconMarkup(cat.icon, 13)} ${cat.name}</div>
        <div class="report-card-title">${report.title}</div>
        <div class="report-card-meta">
          <span>${report.location.label}</span>
          <span>·</span>
          <span>${formatDate(report.date)}</span>
        </div>
      </div>
      <div class="report-card-right">
        <span class="badge badge-${report.status}">${statusName(report.status)}</span>
      </div>
    </div>`;
}

function renderReportList(container, reports) {
  if (!reports.length) { container.innerHTML = ''; return; }
  container.innerHTML = reports.map(reportCardHTML).join('');
  qsa('.report-card', container).forEach(card => {
    card.addEventListener('click', () => navigateTo('detail', { code: card.dataset.code }));
  });
}

/* ==========================================================================
   MAPA
   ========================================================================== */
function markerDivIcon(category) {
  const cat = catById(category);
  const iconSvgs = {
    lighting: 'M9 2v2M6 6a3 3 0 1 1 6 0c0 1.5-1 2-1.3 3H7.3C7 8 6 7.5 6 6Z',
  };
  return L.divIcon({
    className: '',
    html: `<div class="marker-pin" style="background:${cat.color}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/></svg></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
    popupAnchor: [0, -28]
  });
}

function filteredReports() {
  return state.reports.filter(r => {
    if (state.filters.category !== 'all' && r.category !== state.filters.category) return false;
    if (state.filters.status !== 'all' && r.status !== state.filters.status) return false;
    if (state.filters.distance !== 'all') {
      const maxKm = { '1km': 1, '5km': 5, '10km': 10 }[state.filters.distance];
      const ref = state.userPosition || CONFIG.demoCenter;
      const d = distanceKm(ref.lat, ref.lng, r.location.lat, r.location.lng);
      if (d > maxKm) return false;
    }
    return true;
  });
}

function buildMarkers(map, layerGroup, reports) {
  layerGroup.clearLayers();
  reports.forEach(report => {
    const marker = L.marker([report.location.lat, report.location.lng], { icon: markerDivIcon(report.category) });
    marker.on('click', () => openMarkerSheet(report));
    layerGroup.addLayer(marker);
  });
}

function initMapPreview() {
  const container = qs('#mapPreview');
  if (!container || state.currentView !== 'home') return;
  if (typeof L === 'undefined') return;
  if (state.mapPreview) {
    try { state.mapPreview.remove(); } catch (e) { /* ignore */ }
    state.mapPreview = null;
  }
  // Clear leftover leaflet DOM from previous inits
  container.innerHTML = '';
  try {
    const map = L.map(container, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false
    }).setView([CONFIG.demoCenter.lat, CONFIG.demoCenter.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    const layer = L.layerGroup().addTo(map);
    buildMarkers(map, layer, state.reports.slice(0, 6));
    state.mapPreview = map;
    setTimeout(() => { if (state.mapPreview && state.currentView === 'home') state.mapPreview.invalidateSize(); }, 80);
    setTimeout(() => { if (state.mapPreview && state.currentView === 'home') state.mapPreview.invalidateSize(); }, 300);
  } catch (err) {
    console.warn('Map preview failed:', err);
  }
}

function initMapFull() {
  const container = qs('#mapFull');
  if (!container) return;
  if (typeof L === 'undefined') {
    container.innerHTML = '<div class="map-error">Não foi possível carregar o mapa. Verifique a ligação à internet.</div>';
    return;
  }
  if (state.map) {
    setTimeout(() => { if (state.map) state.map.invalidateSize(); }, 80);
    return;
  }
  container.innerHTML = '';
  try {
    const map = L.map(container, { zoomControl: true }).setView([CONFIG.demoCenter.lat, CONFIG.demoCenter.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap', maxZoom: 19
    }).addTo(map);
    state.mapMarkersLayer = L.layerGroup().addTo(map);
    state.map = map;
  } catch (err) {
    console.warn('Map init failed:', err);
    container.innerHTML = '<div class="map-error">Erro ao carregar o mapa.</div>';
  }
}

function renderMapView() {
  initMapFull();
  // Multiple invalidateSize calls — Leaflet needs the container to be visible
  [50, 150, 350, 600].forEach(ms => {
    setTimeout(() => {
      if (state.map && state.currentView === 'map') state.map.invalidateSize();
    }, ms);
  });
  if (state.map && state.mapMarkersLayer) {
    buildMarkers(state.map, state.mapMarkersLayer, filteredReports());
  }

  if (navigator.geolocation && !state.userPosition) {
    navigator.geolocation.getCurrentPosition(pos => {
      state.userPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      if (state.map && state.currentView === 'map') {
        L.marker([state.userPosition.lat, state.userPosition.lng], {
          icon: L.divIcon({ className: '', html: '<div class="user-dot"></div>', iconSize: [16, 16], iconAnchor: [8, 8] })
        }).addTo(state.map);
      }
    }, () => { /* localização recusada */ }, { timeout: 4000 });
  }
}

function openMarkerSheet(report) {
  const cat = catById(report.category);
  const body = qs('#markerSheetBody');
  body.innerHTML = `
    <div class="marker-popup-card">
      <div class="marker-popup-img">${report.photos[0] ? `<img src="${report.photos[0]}" alt="">` : ''}</div>
      <div class="marker-popup-body">
        <div class="marker-popup-cat">${cat.name}</div>
        <div class="marker-popup-title">${report.title}</div>
        <div class="marker-popup-loc">${report.location.label}</div>
      </div>
    </div>
    <div class="marker-popup-footer">
      <span class="badge badge-${report.status}">${statusName(report.status)}</span>
      <button class="btn btn-primary btn-sm" id="markerDetailBtn">Ver detalhes</button>
    </div>`;
  qs('#markerDetailBtn').addEventListener('click', () => {
    closeSheet('markerSheet', 'markerOverlay');
    navigateTo('detail', { code: report.code });
  });
  openSheet('markerSheet', 'markerOverlay');
}

/* ==========================================================================
   FILTROS
   ========================================================================== */
function openSheet(sheetId, overlayId) {
  qs('#' + sheetId).classList.add('open');
  qs('#' + overlayId).classList.add('open');
}
function closeSheet(sheetId, overlayId) {
  qs('#' + sheetId).classList.remove('open');
  qs('#' + overlayId).classList.remove('open');
}

function initFilters() {
  const catChipsEl = qs('#filterCategoryChips');
  catChipsEl.innerHTML = chipHTML('all', 'Todos', true) + CONFIG.categories.map(c => chipHTML(c.id, c.name)).join('');

  const statusChipsEl = qs('#filterStatusChips');
  statusChipsEl.innerHTML = chipHTML('all', 'Todos', true) + CONFIG.statuses.map(s => chipHTML(s.id, s.name)).join('');

  const distChipsEl = qs('#filterDistanceChips');
  distChipsEl.innerHTML = [
    ['all', 'Todos'], ['1km', 'Até 1 km'], ['5km', 'Até 5 km'], ['10km', 'Até 10 km']
  ].map(([id, name]) => chipHTML(id, name, id === 'all')).join('');

  [catChipsEl, statusChipsEl, distChipsEl].forEach(group => {
    group.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      qsa('.chip', group).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  qs('#filterBtn').addEventListener('click', () => openSheet('filterSheet', 'filterOverlay'));
  qs('#closeFilterBtn').addEventListener('click', () => closeSheet('filterSheet', 'filterOverlay'));
  qs('#filterOverlay').addEventListener('click', () => closeSheet('filterSheet', 'filterOverlay'));

  qs('#clearFiltersBtn').addEventListener('click', () => {
    state.filters = { category: 'all', status: 'all', distance: 'all' };
    qsa('#filterCategoryChips .chip, #filterStatusChips .chip, #filterDistanceChips .chip').forEach(c => {
      c.classList.toggle('active', c.dataset.value === 'all');
    });
    if (state.map && state.mapMarkersLayer) {
      buildMarkers(state.map, state.mapMarkersLayer, filteredReports());
    }
    showToast('Filtros limpos.');
  });

  qs('#applyFiltersBtn').addEventListener('click', () => {
    const catChip = qs('#filterCategoryChips .chip.active');
    const statusChip = qs('#filterStatusChips .chip.active');
    const distChip = qs('#filterDistanceChips .chip.active');
    if (catChip) state.filters.category = catChip.dataset.value;
    if (statusChip) state.filters.status = statusChip.dataset.value;
    if (distChip) state.filters.distance = distChip.dataset.value;
    if (state.map && state.mapMarkersLayer) {
      buildMarkers(state.map, state.mapMarkersLayer, filteredReports());
    }
    closeSheet('filterSheet', 'filterOverlay');
    showToast('Filtros aplicados.');
  });
}
function chipHTML(value, label, active) {
  return `<button class="chip${active ? ' active' : ''}" data-value="${value}">${label}</button>`;
}

/* ==========================================================================
   NOVO REPORTE
   ========================================================================== */
function resetReportFlow() {
  state.reportDraft = { category: null, photos: [], location: null, description: '' };
  state.currentStep = 1;
  const flow = qs('.report-flow');
  if (flow) flow.classList.remove('success-mode');
  goToStep(1);
  const grid = qs('#categoryGrid');
  if (grid) qsa('.category-card', grid).forEach(c => c.classList.remove('selected'));
  const photoGrid = qs('#photoGrid');
  if (photoGrid) photoGrid.innerHTML = '';
  const locResult = qs('#locationResult');
  if (locResult) locResult.hidden = true;
  const desc = qs('#descriptionInput');
  if (desc) desc.value = '';
  ['categoryError', 'photoError', 'locationError', 'descriptionError'].forEach(id => {
    const el = qs('#' + id);
    if (el) el.hidden = true;
  });
  const photoAdd = qs('#photoAddBtn');
  if (photoAdd) photoAdd.style.display = 'flex';
}

function initReportFlow() {
  const categoryGrid = qs('#categoryGrid');
  categoryGrid.innerHTML = CONFIG.categories.map(c => `
    <button class="category-card" data-cat="${c.id}" type="button">
      <img src="assets/icons/${c.icon}" alt="" width="26" height="26">
      <span>${c.name}</span>
    </button>`).join('');

  categoryGrid.addEventListener('click', e => {
    const card = e.target.closest('.category-card');
    if (!card) return;
    e.preventDefault();
    e.stopPropagation();
    qsa('.category-card', categoryGrid).forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state.reportDraft.category = card.getAttribute('data-cat');
    qs('#categoryError').hidden = true;
  });

  qs('#reportBackBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.currentStep === 1 || state.currentStep === 'success') {
      navigateTo('home');
    } else if (state.currentStep === 2) {
      goToStep(1);
    } else if (state.currentStep === 3) {
      goToStep(2);
    }
  });

  qs('#step1Continue').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!state.reportDraft.category) {
      qs('#categoryError').hidden = false;
      return;
    }
    goToStep(2);
  });

  qs('#step2Back').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    goToStep(1);
  });
  qs('#step2Continue').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let ok = true;
    state.reportDraft.description = qs('#descriptionInput').value.trim();
    if (!state.reportDraft.description) {
      qs('#descriptionError').hidden = false;
      ok = false;
    } else {
      qs('#descriptionError').hidden = true;
    }
    if (!state.reportDraft.location) {
      qs('#locationError').hidden = false;
      ok = false;
    } else {
      qs('#locationError').hidden = true;
    }
    if (!ok) return;
    renderConfirmSummary();
    goToStep(3);
  });

  qs('#step3Edit').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    goToStep(2);
  });
  qs('#submitReportBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    submitReport();
  });

  qs('#photoAddBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    qs('#photoInput').click();
  });
  qs('#photoInput').addEventListener('change', handlePhotoSelect);

  qs('#useLocationBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    requestLocation();
  });

  qs('#trackReportBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const code = state.lastSubmittedCode;
    if (code) navigateTo('detail', { code });
  });
  qs('#backHomeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigateTo('home');
  });
}

function goToStep(step) {
  state.currentStep = step;
  const flow = qs('.report-flow');
  if (flow) flow.classList.toggle('success-mode', step === 'success');

  qsa('.report-step').forEach(s => s.classList.remove('active'));
  const target = qs('#step-' + step);
  if (target) {
    target.classList.add('active');
  } else {
    console.warn('Report step not found:', step);
  }

  if (step === 'success') {
    qsa('.progress-step').forEach(p => {
      p.classList.remove('active');
      p.classList.add('done');
    });
    return;
  }

  const stepNum = Number(step);
  qsa('.progress-step').forEach(p => {
    const n = Number(p.dataset.step);
    p.classList.toggle('active', n === stepNum);
    p.classList.toggle('done', n < stepNum);
  });

  // Ensure Continuar / action buttons are visible after step change
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function handlePhotoSelect(e) {
  const files = Array.from(e.target.files || []);
  const errorEl = qs('#photoError');
  errorEl.hidden = true;
  files.forEach(file => {
    if (state.reportDraft.photos.length >= 4) return;
    if (!file.type.startsWith('image/')) { errorEl.hidden = false; return; }
    // Usa data URL (base64) em vez de object URL: assim a fotografia
    // sobrevive a um refresh depois de guardada em localStorage.
    const reader = new FileReader();
    reader.onload = () => {
      if (state.reportDraft.photos.length >= 4) return;
      state.reportDraft.photos.push(reader.result);
      renderPhotoGrid();
    };
    reader.onerror = () => { errorEl.hidden = false; };
    reader.readAsDataURL(file);
  });
  e.target.value = '';
}

function renderPhotoGrid() {
  const grid = qs('#photoGrid');
  grid.innerHTML = state.reportDraft.photos.map((src, i) => `
    <div class="photo-thumb">
      <img src="${src}" alt="">
      <button class="photo-remove" data-idx="${i}" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
      </button>
    </div>`).join('');
  qsa('.photo-remove', grid).forEach(btn => {
    btn.addEventListener('click', () => {
      state.reportDraft.photos.splice(Number(btn.dataset.idx), 1);
      renderPhotoGrid();
    });
  });
  qs('#photoAddBtn').style.display = state.reportDraft.photos.length >= 4 ? 'none' : 'flex';
}

function requestLocation() {
  const btn = qs('#useLocationBtn');
  const original = btn.innerHTML;
  btn.innerHTML = 'A obter localização...';
  btn.disabled = true;

  function done(loc) {
    state.reportDraft.location = loc;
    qs('#locationResult').hidden = false;
    qs('#locationText').textContent = loc.label;
    qs('#locationError').hidden = true;
    btn.innerHTML = original;
    btn.disabled = false;
  }

  if (!navigator.geolocation) {
    done({ lat: CONFIG.demoCenter.lat, lng: CONFIG.demoCenter.lng, label: 'Localização de demonstração — Nampula' });
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => done({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: `Localização actual (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})` }),
    () => done({ lat: CONFIG.demoCenter.lat, lng: CONFIG.demoCenter.lng, label: 'Localização de demonstração — Nampula' }),
    { timeout: 6000 }
  );
}

function renderConfirmSummary() {
  const d = state.reportDraft;
  const cat = catById(d.category);
  qs('#confirmSummary').innerHTML = `
    <div class="confirm-row">
      <div class="confirm-row-label">Categoria</div>
      <div class="confirm-row-value">${iconMarkup(cat.icon, 15)} ${cat.name}</div>
    </div>
    <div class="confirm-row">
      <div class="confirm-row-label">Fotografias</div>
      <div class="confirm-photos">${d.photos.length ? d.photos.map(p => `<img src="${p}" alt="">`).join('') : '<span class="confirm-row-value">Nenhuma fotografia adicionada</span>'}</div>
    </div>
    <div class="confirm-row">
      <div class="confirm-row-label">Localização</div>
      <div class="confirm-row-value">${d.location.label}</div>
    </div>
    <div class="confirm-row">
      <div class="confirm-row-label">Descrição</div>
      <div class="confirm-row-value">${d.description}</div>
    </div>`;
}

function submitReport() {
  const d = state.reportDraft;
  const code = generateReportCode();
  const cat = catById(d.category);
  const report = {
    code,
    title: `${cat.name} reportado(a)`,
    category: d.category,
    description: d.description,
    location: d.location,
    status: 'reported',
    photos: d.photos.length ? d.photos : [`assets/reports/${defaultPhotoFor(d.category)}`],
    date: new Date().toISOString(),
    isDemo: false
  };
  state.reports.unshift(report);
  saveReports();

  state.notifications.unshift({
    title: 'Reporte recebido',
    description: `O seu reporte ${code} foi registado.`,
    type: 'success',
    date: new Date().toISOString()
  });
  saveNotifications();
  updateNotifDot();

  state.lastSubmittedCode = code;
  qs('#successCard').innerHTML = `
    <div class="success-code">${code}</div>
    <div class="confirm-row-value">${cat.name} · ${statusName('reported')} · ${formatDate(report.date)}</div>`;
  goToStep('success');
}

function defaultPhotoFor(catId) {
  const map = {
    lighting: 'poste-avariado.svg', road: 'buraco-estrada.svg', water: 'fuga-agua.svg',
    waste: 'lixo-acumulado.svg', traffic: 'sinalizacao-danificada.svg',
    infrastructure: 'estrada-danificada.svg', public_space: 'lixo-acumulado.svg', other: 'buraco-estrada.svg'
  };
  return map[catId] || 'buraco-estrada.svg';
}

/* ==========================================================================
   HISTÓRICO (MEUS RELATOS)
   ========================================================================== */
function initMyReportsFilters() {
  qs('#reportsFilterChips').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    qsa('.chip', qs('#reportsFilterChips')).forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    state.reportsFilterStatus = chip.dataset.status;
    renderMyReports();
  });
}

function renderMyReports() {
  const sorted = [...state.reports].sort((a, b) => new Date(b.date) - new Date(a.date));
  const filtered = state.reportsFilterStatus === 'all' ? sorted : sorted.filter(r => {
    if (state.reportsFilterStatus === 'analysis') return r.status === 'analysis' || r.status === 'reported';
    return r.status === state.reportsFilterStatus;
  });
  const listEl = qs('#myReportsList');
  const emptyEl = qs('#myReportsEmpty');
  if (!filtered.length) {
    listEl.innerHTML = '';
    emptyEl.hidden = false;
  } else {
    emptyEl.hidden = true;
    renderReportList(listEl, filtered);
  }
}

/* ==========================================================================
   DETALHES
   ========================================================================== */
function interventionStatusLabel(s) {
  const map = {
    planned: 'Planeada',
    in_progress: 'Em andamento',
    completed: 'Concluída',
    cancelled: 'Cancelada'
  };
  return map[s] || s;
}

function interventionStatusClass(s) {
  const map = {
    planned: 'analysis',
    in_progress: 'progress',
    completed: 'resolved',
    cancelled: 'reported'
  };
  return map[s] || 'reported';
}

function renderDetail(code) {
  const report = state.reports.find(r => r.code === code);
  const container = qs('#detailContent');
  if (!report) { container.innerHTML = '<p class="empty-desc">Reporte não encontrado.</p>'; return; }
  const cat = catById(report.category);
  const iv = report.intervention;

  // Timeline from history when available, otherwise fallback to status steps
  let timelineHTML = '';
  if (report.history && report.history.length) {
    timelineHTML = report.history.map((ev, i) => {
      const isLast = i === report.history.length - 1;
      const d = new Date(ev.at);
      const dateStr = d.toLocaleDateString('pt-MZ', { day: '2-digit', month: '2-digit' });
      return `
      <div class="timeline-item done">
        <div class="timeline-dot-col">
          <div class="timeline-dot"></div>
          ${!isLast ? '<div class="timeline-bar"></div>' : ''}
        </div>
        <div class="timeline-content">
          <div class="timeline-status">${ev.label}</div>
          <div class="timeline-date">${dateStr} · ${ev.time}</div>
        </div>
      </div>`;
    }).join('');
  } else {
    const statusOrder = ['reported', 'analysis', 'progress', 'resolved'];
    const currentIdx = statusOrder.indexOf(report.status);
    timelineHTML = statusOrder.map((s, i) => {
      const cls = i < currentIdx ? 'done' : (i === currentIdx ? 'current' : '');
      const dateLabel = i <= currentIdx ? formatDate(report.date) : '';
      const isLast = i === statusOrder.length - 1;
      return `
      <div class="timeline-item ${cls}">
        <div class="timeline-dot-col">
          <div class="timeline-dot"></div>
          ${!isLast ? '<div class="timeline-bar"></div>' : ''}
        </div>
        <div class="timeline-content">
          <div class="timeline-status">${statusName(s)}</div>
          ${dateLabel ? `<div class="timeline-date">${dateLabel}</div>` : ''}
        </div>
      </div>`;
    }).join('');
  }

  // Intervention sections
  let interventionHTML = '';
  if (iv) {
    // Entity
    interventionHTML += `
    <div class="detail-card">
      <div class="section-title" style="margin-bottom:14px;">Entidade responsável</div>
      <div class="info-row"><span class="info-row-label">Entidade</span><span class="info-row-value">${iv.entity.name}</span></div>
      <div class="info-row"><span class="info-row-label">Departamento</span><span class="info-row-value">${iv.entity.department}</span></div>
      <div class="info-row"><span class="info-row-label">Responsável</span><span class="info-row-value">${iv.entity.responsible}</span></div>
    </div>`;

    // Intervention details
    const timeRows = [];
    if (iv.date) timeRows.push(`<div class="info-row"><span class="info-row-label">Data</span><span class="info-row-value">${iv.date}</span></div>`);
    if (iv.startTime) timeRows.push(`<div class="info-row"><span class="info-row-label">Início</span><span class="info-row-value">${iv.startTime}</span></div>`);
    if (iv.endTime) timeRows.push(`<div class="info-row"><span class="info-row-label">Término</span><span class="info-row-value">${iv.endTime}</span></div>`);
    if (iv.duration) timeRows.push(`<div class="info-row"><span class="info-row-label">Duração</span><span class="info-row-value">${iv.duration}</span></div>`);

    interventionHTML += `
    <div class="detail-card">
      <div class="detail-title-row" style="margin-bottom:12px;">
        <div class="section-title" style="margin:0;">Detalhes da Intervenção</div>
        <span class="badge badge-${interventionStatusClass(iv.status)}">${interventionStatusLabel(iv.status)}</span>
      </div>
      ${timeRows.join('')}
      ${iv.workDescription ? `<div class="iv-block"><div class="iv-label">Trabalho realizado</div><p class="iv-text">${iv.workDescription}</p></div>` : ''}
      ${iv.solution ? `<div class="iv-block"><div class="iv-label">Solução aplicada</div><p class="iv-text">${iv.solution}</p></div>` : ''}
      ${iv.teamNotes ? `<div class="iv-block"><div class="iv-label">Observações da equipa</div><p class="iv-text">${iv.teamNotes}</p></div>` : ''}
    </div>`;

    // Photos before / after
    const hasBefore = iv.photosBefore && iv.photosBefore.length;
    const hasAfter = iv.photosAfter && iv.photosAfter.length;
    if (hasBefore || hasAfter) {
      interventionHTML += `<div class="detail-card">
        <div class="section-title" style="margin-bottom:14px;">Fotografias da intervenção</div>
        <div class="photo-compare">
          ${hasBefore ? `
          <div class="photo-compare-col">
            <div class="photo-compare-label">Antes</div>
            <div class="photo-compare-grid">${iv.photosBefore.map(p => `<img src="${p}" alt="Antes">`).join('')}</div>
          </div>` : ''}
          ${hasAfter ? `
          <div class="photo-compare-col">
            <div class="photo-compare-label">Depois</div>
            <div class="photo-compare-grid">${iv.photosAfter.map(p => `<img src="${p}" alt="Depois">`).join('')}</div>
          </div>` : ''}
        </div>
      </div>`;
    }

    // Team
    if (iv.team) {
      const membersList = (iv.team.members || []).map(m =>
        `<div class="member-row"><span class="member-name">${m.name}</span><span class="member-role">${m.role}</span></div>`
      ).join('');
      interventionHTML += `
      <div class="detail-card">
        <div class="section-title" style="margin-bottom:14px;">Equipa de Intervenção</div>
        <div class="info-row"><span class="info-row-label">Equipa</span><span class="info-row-value">${iv.team.name}</span></div>
        <div class="info-row"><span class="info-row-label">Líder</span><span class="info-row-value">${iv.team.leader}</span></div>
        <div class="info-row"><span class="info-row-label">Membros</span><span class="info-row-value">${iv.team.membersCount}</span></div>
        ${iv.team.contact ? `<div class="info-row"><span class="info-row-label">Contacto</span><span class="info-row-value">${iv.team.contact}</span></div>` : ''}
        ${membersList ? `<div class="members-list">${membersList}</div>` : ''}
      </div>`;
    }

    // Resources
    if (iv.resources) {
      const veh = (iv.resources.vehicles || []).map(v =>
        `<div class="resource-item"><div class="resource-title">${v.type}</div><div class="resource-meta">${v.id}${v.notes ? ' · ' + v.notes : ''}</div></div>`
      ).join('');
      const equip = (iv.resources.equipment || []).map(e => `<span class="chip-static">${e}</span>`).join('');
      const mats = (iv.resources.materials || []).map(m =>
        `<div class="resource-item"><div class="resource-title">${m.name}</div><div class="resource-meta">${m.qty || ''}</div></div>`
      ).join('');

      interventionHTML += `
      <div class="detail-card">
        <div class="section-title" style="margin-bottom:14px;">Recursos utilizados</div>
        ${veh ? `<div class="iv-block"><div class="iv-label">Viaturas</div>${veh}</div>` : ''}
        ${equip ? `<div class="iv-block"><div class="iv-label">Equipamentos</div><div class="chip-row">${equip}</div></div>` : ''}
        ${mats ? `<div class="iv-block"><div class="iv-label">Materiais</div>${mats}</div>` : ''}
      </div>`;
    }

    // Resolution certificate
    if (iv.resolution && report.status === 'resolved') {
      const completedStr = formatDate(iv.resolution.completedAt);
      interventionHTML += `
      <div class="detail-card resolution-card">
        <div class="section-title" style="margin-bottom:14px;">Comprovativo da Resolução</div>
        <div class="resolution-result">${iv.resolution.result}</div>
        <div class="info-row"><span class="info-row-label">Validado por</span><span class="info-row-value">${iv.resolution.validatedBy}</span></div>
        <div class="info-row"><span class="info-row-label">Concluído em</span><span class="info-row-value">${completedStr}</span></div>
        ${iv.resolution.finalNotes ? `<div class="iv-block" style="margin-top:12px;"><div class="iv-label">Observações finais</div><p class="iv-text">${iv.resolution.finalNotes}</p></div>` : ''}
      </div>`;
    }
  }

  container.innerHTML = `
    <div class="detail-gallery">${report.photos.map(p => `<img src="${p}" alt="">`).join('')}</div>
    <div class="detail-card">
      <div class="detail-title-row">
        <span class="detail-cat-label">${iconMarkup(cat.icon, 15)} ${cat.name}</span>
        <span class="badge badge-${report.status}">${statusName(report.status)}</span>
      </div>
      <div class="detail-title">${report.title}</div>
      <p class="detail-desc">${report.description}</p>
      <div class="detail-meta-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>
        <span>${report.location.label}</span>
      </div>
      <div class="detail-meta-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
        <span>${formatDate(report.date)}</span>
      </div>
      <div class="detail-meta-row">
        <span class="detail-code">${report.code}</span>
      </div>
    </div>
    <div class="detail-card">
      <div class="section-title" style="margin-bottom:14px;">Histórico da ocorrência</div>
      <div class="timeline">${timelineHTML}</div>
    </div>
    ${interventionHTML}`;
}

function initDetailNav() {
  qs('#detailBackBtn').addEventListener('click', () => navigateTo('reports'));
}

/* ==========================================================================
   PERFIL
   ========================================================================== */
function renderProfile() {
  qs('#profileAvatar').textContent = state.user.name.charAt(0).toUpperCase();
  qs('#profileName').textContent = state.user.name;
  qs('#profileLocationLabel').textContent = state.user.locality;

  renderMetrics(qs('#profileMetrics'));

  qs('#profileInfoList').innerHTML = `
    <div class="info-row"><span class="info-row-label">Nome</span><span class="info-row-value">${state.user.name}</span></div>
    <div class="info-row"><span class="info-row-label">Email</span><span class="info-row-value">${state.user.email}</span></div>
    <div class="info-row"><span class="info-row-label">Telefone</span><span class="info-row-value">${state.user.phone}</span></div>
    <div class="info-row"><span class="info-row-label">Localidade</span><span class="info-row-value">${state.user.locality}</span></div>`;
}

function initProfile() {
  qs('#editProfileBtn').addEventListener('click', () => showToast('Edição de perfil disponível em breve.'));
  qsa('.settings-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      if (action === 'logout') { showToast('Sessão terminada (demonstração).'); return; }
      showToast('Funcionalidade disponível em breve.');
    });
  });
}

/* ==========================================================================
   NOTIFICAÇÕES
   ========================================================================== */
function updateNotifDot() {
  qs('#notifDot').hidden = state.notifications.length === 0;
}

function renderNotifications() {
  const listEl = qs('#notifList');
  const emptyEl = qs('#notifEmpty');
  if (!state.notifications.length) {
    listEl.innerHTML = '';
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;
  listEl.innerHTML = state.notifications.map(n => `
    <div class="notif-item">
      <div class="notif-icon ${n.type}">
        ${n.type === 'success'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>'}
      </div>
      <div>
        <div class="notif-title">${n.title}</div>
        <div class="notif-desc">${n.description}</div>
        <div class="notif-time">${formatDate(n.date)}</div>
      </div>
    </div>`).join('');
}

function initNotifBtn() {
  qs('#notifBtn').addEventListener('click', () => navigateTo('notifications'));
}

/* ==========================================================================
   INICIALIZAÇÃO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  loadStorage();
  initNavigation();
  initMenu();
  initFilters();
  initReportFlow();
  initMyReportsFilters();
  initDetailNav();
  initProfile();
  initNotifBtn();
  updateNotifDot();
  navigateTo('home');
});
