/* Optimize — V4.5 Univers visuel et boutique corrigée
   Application PWA d'organisation personnelle.
   Version locale, distribuable, avec collection visuelle, saisons et sauvegardes.
*/

const APP_MODE = 'local-personal';
const APP_VERSION = '4.5.0';
const BACKUP_FORMAT = 'optimize-local-backup';
const BACKUP_SCHEMA_VERSION = 1;
const MAX_BACKUP_SIZE = 25 * 1024 * 1024;

const TABLES = [
  'profiles','tasks','events','projects','subjects','topics','objectives','homework','ideas','budget_entries','deadlines',
  'course_followups','documents','site_links','progress_journal','purchases','skills','contacts','creative_projects',
  'personal_events','inventory_items','game_state','reward_cards','companions','secret_codes',
  'user_reward_cards','user_companions','user_secret_codes'
];

const PAGES = {
  dashboard: 'Accueil', todayHub: 'Aujourd’hui', organizationHub: 'Organisation', progressionHub: 'Progression', profileHub: 'Profil',
  profile: 'Mon profil', qg: 'QG', collection: 'Collection', cards: 'Cartes', companions: 'Compagnons', codex: 'Codex', quests: 'Quêtes', gacha: 'Gacha', shop: 'Boutique', notifications: 'Notifications', seasons: 'Saisons', day: 'Ma journée', checklist: 'Checklist', planning: 'Planning', projects: 'Projets', revisions: 'Révisions',
  objectives: 'Objectifs', homework: 'Devoirs', ideas: 'Carnet d’idées', budget: 'Budget étudiant', deadlines: 'Examens',
  courses: 'Suivi des cours', documents: 'Documents', sites: 'Mes sites', journal: 'Journal', purchases: 'Achats', skills: 'Compétences',
  contacts: 'Contacts', creative: 'Projets créatifs', agenda: 'Agenda perso', inventory: 'Inventaire', backups: 'Sauvegardes', settings: 'Paramètres'
};

const HUBS = {
  todayHub: {
    title: 'Aujourd’hui', icon: '☀️', description: 'Tout ce qui t’aide à piloter la journée sans te disperser.',
    items: [
      ['dashboard','Accueil','Vue générale et priorités','🏠'], ['day','Ma journée','Tâches prévues aujourd’hui','🌤️'],
      ['checklist','Checklist','Actions rapides à terminer','✅'], ['planning','Planning','Créneaux et organisation du temps','🗓️'],
      ['agenda','Agenda personnel','Événements personnels','📅'], ['notifications','Notifications','Alertes et récompenses','🔔']
    ]
  },
  organizationHub: {
    title: 'Organisation', icon: '🧭', description: 'Tes projets, tes études, tes idées et toutes tes ressources utiles.',
    items: [
      ['projects','Projets','Suivre les projets en cours','🚀'], ['objectives','Objectifs','Fixer et mesurer tes objectifs','🎯'],
      ['revisions','Révisions','Matières et chapitres','📚'], ['homework','Devoirs','Travail scolaire à rendre','✍️'],
      ['deadlines','Examens','Échéances importantes','⏳'], ['courses','Suivi des cours','Compréhension et rattrapage','🎓'],
      ['ideas','Carnet d’idées','Capturer tes nouvelles idées','💡'], ['creative','Projets créatifs','YouTube, dessin et créations','🎬'],
      ['documents','Documents','Démarches et liens importants','📄'], ['sites','Mes sites','Ton hub de liens web','🌐'],
      ['journal','Journal','Suivre ton évolution','📓'], ['budget','Budget','Entrées et dépenses','💶'],
      ['purchases','Achats','Liste des achats envisagés','🛒'], ['contacts','Contacts','Personnes et coordonnées','👥'],
      ['inventory','Inventaire','Matériel et objets personnels','📦']
    ]
  },
  progressionHub: {
    title: 'Progression', icon: '⚡', description: 'Tes compétences et la partie gamifiée qui récompense ta régularité.',
    items: [
      ['skills','Compétences','Suivre ce que tu apprends','🧠'], ['quests','Quêtes','Missions et objectifs gamifiés','⚔️'],
      ['qg','QG','Ton quartier général','🏰'], ['collection','Collection','Toutes tes récompenses','🏆'],
      ['cards','Cartes','Cartes obtenues et équipées','🃏'], ['companions','Compagnons','Personnages débloqués','🤖'],
      ['codex','Codex','Découvrir les éléments du jeu','📖'], ['gacha','Gacha','Utiliser les tickets gagnés','🎰'],
      ['shop','Boutique','Dépenser les tickets','🛍️'], ['seasons','Saisons','Événements et collections','🍂']
    ]
  },
  profileHub: {
    title: 'Profil', icon: '👤', description: 'Ton identité Optimize, tes statistiques et les réglages de l’application.',
    items: [
      ['profile','Mon profil','Niveau, badges et statistiques','👤'], ['qg','Mon QG','Personnalisation et éléments équipés','🏠'],
      ['backups','Sauvegardes','Importer ou exporter toutes les données','💾'],
      ['settings','Paramètres','Préférences et gestion locale','⚙️'], ['dashboard','Retour à l’accueil','Revenir au tableau de bord','↩️']
    ]
  }
};

const BASE_NAV_LABELS = { ...PAGES };

const CATEGORY_COLORS = {
  revisions: '#4faaa2', projet: '#214f71', perso: '#ef8069', sport: '#7da85b', repos: '#9f8f7a', important: '#d96864',
  cours: '#8667a8', administratif: '#ed9b5f', later: '#7a8790', urgent: '#d96864', autre: '#6d7a80',
  youtube: '#d96864', montage: '#8667a8', dessin: '#ed9b5f', site: '#214f71', code: '#4faaa2', ecole: '#8667a8', tech: '#214f71',
  nourriture: '#7da85b', transport: '#4faaa2', sorties: '#ef8069', abonnements: '#8667a8', materiel: '#ed9b5f', vetements: '#ef8069',
  examen: '#d96864', oral: '#ed9b5f', rendu: '#8667a8', concours: '#214f71', famille: '#ef8069', amis: '#4faaa2'
};

const CATEGORY_LABELS = {
  revisions: 'Révisions', projet: 'Projet', perso: 'Perso', sport: 'Sport', repos: 'Repos', important: 'Important', cours: 'Cours',
  administratif: 'Administratif', later: 'À faire plus tard', urgent: 'Urgent', autre: 'Autre', youtube: 'YouTube', montage: 'Montage',
  dessin: 'Dessin', site: 'Site web', code: 'Code', ecole: 'École', tech: 'Tech', nourriture: 'Nourriture', transport: 'Transport',
  sorties: 'Sorties', abonnements: 'Abonnements', materiel: 'Matériel', vetements: 'Vêtements', examen: 'Examen', oral: 'Oral',
  rendu: 'Rendu', concours: 'Concours', famille: 'Famille', amis: 'Amis'
};

const OPTIONS = {
  taskCategory: ['urgent','cours','revisions','projet','perso','administratif','later','autre'],
  planCategory: ['revisions','projet','cours','perso','sport','repos','important','autre'],
  priority: ['basse','moyenne','haute','urgente'],
  objectiveScope: ['jour','semaine','mois','long_terme'],
  objectiveStatus: ['not_started','in_progress','done','abandoned'],
  workStatus: ['todo','in_progress','done'],
  revisionStatus: ['not_started','in_progress','completed'],
  projectStatus: ['active','paused','done'],
  ideaStatus: ['brute','developper','in_progress','done'],
  budgetType: ['expense','income'],
  understanding: ['bon','moyen','a_revoir'],
  documentStatus: ['a_faire','demande','recu','envoye','valide'],
  mood: ['bien','moyen','complique'],
  purchaseStatus: ['a_acheter','achete'],
  level: ['debutant','moyen','bon','avance'],
  creativeStatus: ['idee','preparation','in_progress','done'],
  condition: ['neuf','bon','abime','a_remplacer'],
  inventoryStatus: ['utilise','prete','perdu','a_remplacer']
};

const LABELS = {
  basse: 'Basse', moyenne: 'Moyenne', haute: 'Haute', urgente: 'Urgente', jour: 'Jour', semaine: 'Semaine', mois: 'Mois', long_terme: 'Long terme',
  not_started: 'Pas commencé', in_progress: 'En cours', done: 'Terminé', abandoned: 'Abandonné', todo: 'À faire', completed: 'Terminé',
  active: 'En cours', paused: 'En pause', brute: 'Idée brute', developper: 'À développer', expense: 'Dépense', income: 'Revenu',
  bon: 'Bon', moyen: 'Moyen', a_revoir: 'À revoir', a_faire: 'À faire', demande: 'Demandé', recu: 'Reçu', envoye: 'Envoyé', valide: 'Validé',
  bien: 'Bien', complique: 'Compliqué', a_acheter: 'À acheter', achete: 'Acheté', debutant: 'Débutant', avance: 'Avancé',
  idee: 'Idée', preparation: 'Préparation', neuf: 'Neuf', abime: 'Abîmé', a_remplacer: 'À remplacer', utilise: 'Utilisé', prete: 'Prêté', perdu: 'Perdu'
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const uid = () => crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const escapeHtml = (value = '') => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const sanitizeDisplayName = (value = '') => String(value || '').trim().replace(/[^a-zA-Z0-9À-ÿ._ -]/g, '').slice(0, 40) || 'joueur';
const todayISO = () => new Date().toISOString().slice(0,10);
const currentDateTimeLocal = () => toDateTimeLocal(new Date());
const labelOf = value => LABELS[value] || CATEGORY_LABELS[value] || value || '—';

function toDateTimeLocal(value) {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function formatDate(value) {
  if (!value) return 'Sans date';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat('fr-FR', { day:'2-digit', month:'short', year:'numeric' }).format(d);
}
function formatDateTime(value) {
  if (!value) return 'Sans date';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat('fr-FR', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }).format(d);
}
function daysUntil(value) {
  if (!value) return null;
  const target = new Date(value);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  target.setHours(0,0,0,0);
  return Math.ceil((target - today) / 86400000);
}
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}
function backupFileStamp(date = new Date()) {
  const pad = value => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}`;
}
function downloadJsonFile(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type:'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function cleanImportedRow(row) {
  if (!row || typeof row !== 'object' || Array.isArray(row)) return null;
  const copy = cloneJson(row);
  delete copy.user_id;
  return copy;
}
function normalizeImportedRows(value) {
  if (Array.isArray(value)) return value.map(cleanImportedRow).filter(Boolean);
  if (value && typeof value === 'object') {
    const row = cleanImportedRow(value);
    return row ? [row] : [];
  }
  return [];
}
function stateSummary(state = {}) {
  const userTables = TABLES.filter(table => !['profiles','reward_cards','companions','secret_codes'].includes(table));
  const items = userTables.reduce((total, table) => total + (Array.isArray(state[table]) ? state[table].length : 0), 0);
  return {
    totalItems: items,
    tasks: Array.isArray(state.tasks) ? state.tasks.length : 0,
    projects: Array.isArray(state.projects) ? state.projects.length : 0,
    journalEntries: Array.isArray(state.progress_journal) ? state.progress_journal.length : 0,
    objectives: Array.isArray(state.objectives) ? state.objectives.length : 0
  };
}
function createBackupPayload() {
  const state = cloneJson(app.provider.ensureData());
  const profile = {
    username: sanitizeDisplayName(app.provider.user?.username || state._meta?.username || 'joueur')
  };
  return {
    format: BACKUP_FORMAT,
    schemaVersion: BACKUP_SCHEMA_VERSION,
    appVersion: APP_VERSION,
    exportedAt: new Date().toISOString(),
    profile,
    summary: stateSummary(state),
    state
  };
}
function exportOptimizeBackup() {
  const payload = createBackupPayload();
  app.provider.state._meta.lastExportAt = payload.exportedAt;
  app.provider.saveState();
  downloadJsonFile(`optimize-sauvegarde-${backupFileStamp()}.json`, payload);
  showToast('Sauvegarde exportée.');
}
function extractImportedBackup(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('Le fichier JSON est invalide.');

  let source = null;
  let username = 'joueur';
  let sourceFormat = 'inconnu';

  if (raw.format === BACKUP_FORMAT && raw.state && typeof raw.state === 'object') {
    source = raw.state;
    username = raw.profile?.username || raw.state?._meta?.username || 'joueur';
    sourceFormat = `${BACKUP_FORMAT}-v${raw.schemaVersion || 1}`;
  } else if (raw.tables && typeof raw.tables === 'object') {
    source = raw.tables;
    username = raw.login?.username || 'joueur';
    sourceFormat = raw.format || 'ancien-export-supabase';
  } else if (TABLES.some(table => Array.isArray(raw[table])) || raw._meta) {
    source = raw;
    username = raw._meta?.username || 'joueur';
    sourceFormat = 'ancien-stockage-local';
  } else {
    throw new Error('Format de sauvegarde non reconnu.');
  }

  const state = {};
  TABLES.forEach(table => { state[table] = normalizeImportedRows(source[table]); });
  const importedAt = new Date().toISOString();
  state._meta = {
    username: sanitizeDisplayName(username),
    createdAt: source._meta?.createdAt || importedAt,
    importedAt,
    sourceFormat
  };

  const recognizedTables = TABLES.filter(table => Object.prototype.hasOwnProperty.call(source, table));
  if (!recognizedTables.length) throw new Error('Aucune donnée Optimize reconnue dans ce fichier.');

  return { state, profile:{ username: state._meta.username }, sourceFormat, summary: stateSummary(state) };
}
async function importOptimizeBackupFile(file) {
  if (!file) return;
  if (file.size > MAX_BACKUP_SIZE) throw new Error('La sauvegarde dépasse la taille maximale de 25 Mo.');
  const text = await file.text();
  let raw;
  try { raw = JSON.parse(text); }
  catch { throw new Error('Le fichier sélectionné n’est pas un JSON valide.'); }
  const imported = extractImportedBackup(raw);
  const summary = imported.summary;
  const details = `${summary.totalItems} élément(s), ${summary.tasks} tâche(s), ${summary.projects} projet(s), ${summary.journalEntries} entrée(s) de journal.`;
  const accepted = confirm(`Importer cette sauvegarde ?\n\n${details}\n\nLes données actuellement présentes dans ce navigateur seront remplacées.`);
  if (!accepted) return;
  app.provider.saveRollback();
  app.provider.replaceState(imported.state, imported.profile);
  alert('Sauvegarde importée avec succès. Optimize va maintenant se recharger.');
  window.location.reload();
}
function renderBackupsPage(container) {
  const state = app.provider.ensureData();
  const summary = stateSummary(state);
  const lastExport = state._meta?.lastExportAt ? formatDateTime(state._meta.lastExportAt) : 'Jamais';
  const lastImport = state._meta?.importedAt ? formatDateTime(state._meta.importedAt) : 'Jamais';
  container.innerHTML = `
    <section class="hero soft-card game-panel">
      <p class="eyebrow">Sauvegardes locales</p>
      <h3>Emporte toutes tes données avec toi</h3>
      <p class="muted">Exporte un fichier JSON sur ton ordinateur, puis importe-le sur un autre appareil ou après une réinstallation.</p>
    </section>
    <section class="grid-2 backup-actions-grid">
      <article class="card backup-card">
        <span class="backup-icon" aria-hidden="true">📤</span>
        <h3>Exporter une sauvegarde</h3>
        <p class="muted">Télécharge toutes tes données, ta progression, tes projets, ton journal et tes réglages.</p>
        <button class="primary-btn" id="export-backup-btn" type="button">Exporter maintenant</button>
      </article>
      <article class="card backup-card">
        <span class="backup-icon" aria-hidden="true">📥</span>
        <h3>Importer une sauvegarde</h3>
        <p class="muted">Compatible avec les sauvegardes locales Optimize et les anciens exports Supabase.</p>
        <input id="import-backup-input" class="visually-hidden" type="file" accept=".json,application/json" />
        <button class="ghost-btn" id="import-backup-btn" type="button">Choisir un fichier JSON</button>
      </article>
    </section>
    <section class="card">
      <div class="item-head"><div><h3>État actuel</h3><p class="muted">Données conservées dans ce navigateur.</p></div><span class="badge teal">${summary.totalItems} éléments</span></div>
      <div class="stat-grid"><div class="stat-tile"><strong>${summary.tasks}</strong><span>Tâches</span></div><div class="stat-tile"><strong>${summary.projects}</strong><span>Projets</span></div><div class="stat-tile"><strong>${summary.journalEntries}</strong><span>Journal</span></div><div class="stat-tile"><strong>${summary.objectives}</strong><span>Objectifs</span></div></div>
      <div class="list backup-status-list"><div class="list-item"><strong>Dernier export</strong><span class="muted">${escapeHtml(lastExport)}</span></div><div class="list-item"><strong>Dernier import</strong><span class="muted">${escapeHtml(lastImport)}</span></div><div class="list-item"><strong>Version</strong><span class="muted">Optimize ${APP_VERSION}</span></div></div>
    </section>
    <section class="card warning-card"><h3>À savoir</h3><p class="muted">L’import remplace les données de l’appareil utilisé. Garde plusieurs fichiers datés dans un cloud ou sur une clé USB.</p></section>`;

  $('#export-backup-btn')?.addEventListener('click', exportOptimizeBackup);
  const input = $('#import-backup-input');
  $('#import-backup-btn')?.addEventListener('click', () => input?.click());
  input?.addEventListener('change', async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    try { await importOptimizeBackupFile(file); }
    catch (error) { alert(error.message || 'Impossible d’importer cette sauvegarde.'); }
  });
}
function progressGradient(percent) {
  if (percent >= 80) return 'linear-gradient(90deg, #7da85b, #4faaa2)';
  if (percent >= 40) return 'linear-gradient(90deg, #ed9b5f, #f1b66e)';
  return 'linear-gradient(90deg, #d96864, #ef8069)';
}
function progressHtml(percent) {
  const safe = Math.max(0, Math.min(100, Math.round(percent || 0)));
  return `<div class="progress-line"><span>Progression</span><span>${safe}%</span></div><div class="progress-shell"><div class="progress-bar" style="width:${safe}%;background:${progressGradient(safe)}"></div></div>`;
}
function badge(value, colorClass = '') { return value ? `<span class="badge ${colorClass}">${escapeHtml(labelOf(value))}</span>` : ''; }

const SECRET_BADGE_DEFS = [
  { id:'konami', icon:'🎮', title:'Konami Organizer', hint:'Indice : un vieux code de gamer.', desc:'Tu as trouvé le code Konami dans Optimize.' },
  { id:'logo_hunter', icon:'🌀', title:'Logo Hunter', hint:'Indice : le logo aime les clics répétés.', desc:'Tu as cliqué plusieurs fois sur le logo Optimize.' },
  { id:'optimize_core', icon:'⚡', title:'Optimize Core', hint:'Indice : écris le nom de l’application.', desc:'Tu as tapé OPTIMIZE et réveillé le noyau.' },
  { id:'ggwp', icon:'🏆', title:'GG WP', hint:'Indice : message de fin de game.', desc:'Tu as tapé GGWP. Bien joué.' },
  { id:'debugger', icon:'🐞', title:'Glitch Hunter', hint:'Indice : le mot préféré des devs quand ça bug.', desc:'Tu as tapé DEBUG. Chasseur de bugs validé.' },
  { id:'midnight', icon:'🌙', title:'Noctambule', hint:'Indice : certaines heures cachent des secrets.', desc:'Tu as utilisé Optimize tard dans la nuit.' }
];
function secretStorageKey() {
  const id = app?.provider?.user?.id || app?.provider?.user?.username || 'local';
  return `optimize_secret_badges_v23_${id}`;
}
function getUnlockedSecretBadges() {
  try { return new Set(JSON.parse(localStorage.getItem(secretStorageKey())) || []); }
  catch { return new Set(); }
}
function unlockSecretBadge(id) {
  const def = SECRET_BADGE_DEFS.find(b => b.id === id);
  if (!def) return;
  const unlocked = getUnlockedSecretBadges();
  if (unlocked.has(id)) return;
  unlocked.add(id);
  localStorage.setItem(secretStorageKey(), JSON.stringify([...unlocked]));
  confetti();
  showToast(`Badge secret débloqué : ${def.title} !`);
  app?.updateHud?.();
  if (app?.currentPage === 'profile') setTimeout(() => app.showPage('profile'), 350);
}
function secretBadgesForStats() {
  const unlocked = getUnlockedSecretBadges();
  return SECRET_BADGE_DEFS.map(def => ({ ...def, secret:true, unlocked: unlocked.has(def.id) }));
}
function setupEasterEggs() {
  if (window.__optimizeEasterEggsReady) return;
  window.__optimizeEasterEggsReady = true;
  let logoClicks = 0;
  document.addEventListener('click', event => {
    if (!event.target.closest('.sidebar-logo, .brand-icon')) return;
    logoClicks += 1;
    if (logoClicks === 7) unlockSecretBadge('logo_hunter');
    clearTimeout(setupEasterEggs.logoTimer);
    setupEasterEggs.logoTimer = setTimeout(() => { logoClicks = 0; }, 2200);
  });
  const konami = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
  let keys = [];
  let typed = '';
  document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    keys.push(key); keys = keys.slice(-konami.length);
    if (keys.join('|') === konami.join('|')) unlockSecretBadge('konami');
    if (key.length === 1 && /[a-z0-9]/.test(key)) {
      typed = (typed + key).slice(-24);
      if (typed.endsWith('optimize')) unlockSecretBadge('optimize_core');
      if (typed.endsWith('ggwp')) unlockSecretBadge('ggwp');
      if (typed.endsWith('debug')) unlockSecretBadge('debugger');
    }
  });
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) setTimeout(() => unlockSecretBadge('midnight'), 900);
}

function emptyState(text = 'Ajoute un premier élément pour commencer.') { return `<div class="empty-state"><strong>Rien pour l’instant.</strong><p>${escapeHtml(text)}</p></div>`; }
function optionList(options, selected = '') { return options.map(v => `<option value="${escapeHtml(v)}" ${selected === v ? 'selected' : ''}>${escapeHtml(labelOf(v))}</option>`).join(''); }
function categoryOptions(options, selected = 'autre') { return options.map(v => `<option value="${v}" ${selected === v ? 'selected' : ''}>${escapeHtml(labelOf(v))}</option>`).join(''); }
function colorFor(category = 'autre') { return CATEGORY_COLORS[category] || CATEGORY_COLORS.autre; }
function dateLabel() { return new Intl.DateTimeFormat('fr-FR', { weekday:'long', day:'numeric', month:'long' }).format(new Date()); }

function safeCount(rows, predicate = () => true) { return Array.isArray(rows) ? rows.filter(predicate).length : 0; }
async function getRawDataForStats() {
  const tables = ['tasks','events','objectives','projects','homework','skills','creative_projects','site_links','progress_journal','deadlines','purchases','ideas'];
  const data = {};
  await Promise.all(tables.map(async table => {
    try { data[table] = await app.load(table); }
    catch { data[table] = []; }
  }));
  return data;
}
async function getGameStats() {
  const data = await getRawDataForStats();
  const completedTasks = safeCount(data.tasks, t => t.completed);
  const objectivesDone = safeCount(data.objectives, o => o.status === 'done');
  const activeObjectives = safeCount(data.objectives, o => o.status !== 'done' && o.status !== 'abandoned');
  const homeworkDone = safeCount(data.homework, h => h.status === 'done');
  const activeHomework = safeCount(data.homework, h => h.status !== 'done');
  const projectsDone = safeCount(data.projects, pr => pr.status === 'done');
  const activeProjects = safeCount(data.projects, pr => pr.status !== 'done');
  const creativeDone = safeCount(data.creative_projects, cp => cp.status === 'done');
  const boughtItems = safeCount(data.purchases, p => p.status === 'achete');
  const skillProgress = (data.skills || []).reduce((sum, sk) => sum + Number(sk.progress || 0), 0);
  const baseXp = completedTasks * 25 + objectivesDone * 140 + homeworkDone * 70 + projectsDone * 180 + creativeDone * 130 + boughtItems * 20 + (data.progress_journal || []).length * 45 + (data.site_links || []).length * 25 + (data.deadlines || []).length * 30 + (data.ideas || []).length * 12 + Math.round(skillProgress * 2.5);
  let state = defaultGameState();
  try { const rows = await app.load('game_state'); if (rows[0]) state = normalizeGameState(rows[0]); } catch {}
  const cards = await loadRewardCards().catch(() => DEFAULT_REWARD_CARDS);
  const equippedRewards = (state.unlocked_rewards || []).map(rewardById).filter(Boolean).filter(r => {
    if (r.type === 'theme') return state.equipped_theme === r.value;
    if (r.type === 'title') return state.equipped_title === r.value || state.equipped_title_2 === r.value;
    if (r.type === 'animation') return state.equipped_animation === r.value;
    if (r.type === 'companion') return (state.equipped_companions || []).includes(r.id);
    if (r.type === 'title_slot') return (state.unlocked_rewards || []).includes(r.id);
    return false;
  });
  const equippedCards = (state.equipped_cards || []).map(id => cards.find(c => c.id === id)).filter(Boolean);
  const rewardBoost = equippedRewards.reduce((sum, r) => sum + getRewardBoost(r, state), 0);
  const cardBoost = equippedCards.reduce((sum, c) => sum + getCardBoost(c, state), 0);
  const boostPercent = Math.min(MAX_XP_BOOST, Math.max(0, rewardBoost + cardBoost));
  const xp = Math.floor(baseXp * (1 + boostPercent / 100));
  const levelSize = 90;
  const level = Math.max(1, Math.floor(xp / levelSize) + 1);
  const levelBase = (level - 1) * levelSize;
  const nextLevel = level * levelSize;
  const levelPercent = Math.max(0, Math.min(100, ((xp - levelBase) / levelSize) * 100));
  const badges = [
    { icon:'🎯', title:'Première quête', desc:'Valide ton premier objectif.', unlocked: objectivesDone >= 1 },
    { icon:'✅', title:'Pilote de tâches', desc:'Termine 10 tâches.', unlocked: completedTasks >= 10 },
    { icon:'🧠', title:'Skill builder', desc:'Ajoute une compétence.', unlocked: (data.skills || []).length >= 1 },
    { icon:'🌐', title:'Architecte web', desc:'Ajoute 3 sites dans ton portail.', unlocked: (data.site_links || []).length >= 3 },
    { icon:'📘', title:'Étudiant organisé', desc:'Termine 5 devoirs.', unlocked: homeworkDone >= 5 },
    { icon:'🚀', title:'Créatif actif', desc:'Termine un projet créatif.', unlocked: creativeDone >= 1 },
    { icon:'📝', title:'Journal de bord', desc:'Écris 3 entrées de progression.', unlocked: (data.progress_journal || []).length >= 3 },
    { icon:'💰', title:'Gestionnaire', desc:'Coche 5 achats comme achetés.', unlocked: boughtItems >= 5 },
    { icon:'🕹️', title:'Gacha Ready', desc:'Atteins le niveau 2.', unlocked: level >= GACHA_UNLOCK_LEVEL },
    { icon:'🏪', title:'Boutique ouverte', desc:'Atteins le niveau 5.', unlocked: level >= SHOP_UNLOCK_LEVEL },
    { icon:'🧩', title:'Collectionneur', desc:'Débloque au moins 8 badges.', unlocked: false },
    { icon:'🔗', title:'Hub master', desc:'Épingle 5 sites sur l’accueil.', unlocked: safeCount(data.site_links, s => s.pinned) >= 5 },
    { icon:'⚔️', title:'Boss hunter', desc:'Ajoute 3 grosses échéances.', unlocked: (data.deadlines || []).length >= 3 },
    { icon:'🛠️', title:'Build maker', desc:'Crée 3 projets créatifs.', unlocked: (data.creative_projects || []).length >= 3 }
  ];
  const secretBadges = secretBadgesForStats();
  const unlockedNormal = badges.filter(b => b.unlocked).length;
  badges.find(b => b.title === 'Collectionneur').unlocked = unlockedNormal + secretBadges.filter(b => b.unlocked).length >= 8;
  const allBadges = [...badges, ...secretBadges];
  return { xp, baseXp, boostPercent, level, nextLevel, levelPercent, completedTasks, objectivesDone, activeObjectives, activeHomework, activeProjects, projectsDone, homeworkDone, creativeDone, sites:(data.site_links || []).length, deadlines:(data.deadlines || []).length, badges: allBadges, raw:data, equippedRewards, equippedCards };
}
function badgeGrid(stats) {
  return `<div class="badge-grid">${stats.badges.map(b => {
    const hidden = b.secret && !b.unlocked;
    const classes = ['achievement', b.unlocked ? 'unlocked' : 'locked', b.secret ? 'secret' : '', hidden ? 'mystery' : ''].filter(Boolean).join(' ');
    const icon = hidden ? '❔' : b.icon;
    const title = hidden ? 'Badge secret' : b.title;
    const desc = hidden ? b.hint : b.desc;
    return `<div class="${classes}"><span class="achievement-icon">${icon}</span><strong>${escapeHtml(title)}</strong><p class="muted">${escapeHtml(desc)}</p>${b.secret ? '<small class="badge purple">Easter egg</small>' : ''}</div>`;
  }).join('')}</div>`;
}



const RARITY = {
  common: { label:'Commun', weight:60, className:'rarity-common', boost:0 },
  rare: { label:'Rare', weight:25, className:'rarity-rare', boost:0 },
  epic: { label:'Épique', weight:10, className:'rarity-epic', boost:4 },
  legendary: { label:'Légendaire', weight:4, className:'rarity-legendary', boost:10 },
  secret: { label:'Secret', weight:.9, className:'rarity-secret', boost:12 },
  celestial: { label:'Céleste', weight:.1, className:'rarity-celestial', boost:18 }
};
const RARITY_ORDER = ['common','rare','epic','legendary','secret','celestial'];
function rarityRank(rarity) { const i = RARITY_ORDER.indexOf(String(rarity || 'common').toLowerCase()); return i === -1 ? 999 : i; }
function sortByRarityThenName(items = []) {
  return [...items].sort((a, b) => {
    const rarityDiff = rarityRank(a.rarity) - rarityRank(b.rarity);
    if (rarityDiff) return rarityDiff;
    const categoryDiff = String(a.category || a.family || '').localeCompare(String(b.category || b.family || ''), 'fr');
    if (categoryDiff) return categoryDiff;
    return String(a.name || '').localeCompare(String(b.name || ''), 'fr');
  });
}
function groupByRarity(items = []) {
  const sorted = sortByRarityThenName(items);
  return RARITY_ORDER.map(rarity => ({ rarity, items: sorted.filter(item => String(item.rarity || 'common').toLowerCase() === rarity) })).filter(group => group.items.length);
}
const GACHA_UNLOCK_LEVEL = 2;
const SHOP_UNLOCK_LEVEL = 5;
const GACHA_COST = 3;
const LEGENDARY_REACTIVATE_COST = 10;
const MAX_XP_BOOST = 50;
const CARD_SLOT_LIMIT = 6;
const COMPANION_SLOT_BASE = 2;

const PRICE_BY_RARITY = Object.freeze({ common:12, rare:32, epic:76, legendary:150, secret:0, celestial:0 });
const PHYSICAL_SEASONS = Object.freeze({
  spring:{ label:'Printemps', months:'Mars à mai', icon:'🌸' },
  summer:{ label:'Été', months:'Juin à août', icon:'🌊' },
  autumn:{ label:'Automne', months:'Septembre à novembre', icon:'🍂' },
  winter:{ label:'Hiver', months:'Décembre à février', icon:'❄️' }
});
function physicalSeasonId(date = new Date()) {
  const month = date.getMonth() + 1;
  if ([3,4,5].includes(month)) return 'spring';
  if ([6,7,8].includes(month)) return 'summer';
  if ([9,10,11].includes(month)) return 'autumn';
  return 'winter';
}
function fallbackPriceForRarity(rarity='common') { return PRICE_BY_RARITY[String(rarity).toLowerCase()] ?? PRICE_BY_RARITY.common; }
function isHighRarity(rarity) { return ['secret','celestial'].includes(String(rarity || '').toLowerCase()); }
function hasValidPositivePrice(value) { return Number.isFinite(Number(value)) && Number(value) > 0; }
function isSeasonalRewardAvailable(reward, date = new Date()) { return Boolean(reward?.seasonal && reward.season === physicalSeasonId(date)); }
function isShopEligible(reward) {
  return Boolean(reward && !reward.starter && !reward.gachaOnly && !reward.seasonal && ['theme','title','animation','companion'].includes(reward.type) && hasValidPositivePrice(reward.price));
}
function mergeCatalogById(baseItems = [], dynamicItems = []) {
  const map = new Map(baseItems.map(item => [item.id, { ...item }]));
  dynamicItems.forEach(item => {
    if (!item?.id) return;
    const base = map.get(item.id) || {};
    map.set(item.id, { ...base, ...item, boost: item.boost || base.boost });
  });
  return [...map.values()];
}

const DEFAULT_COMPANIONS = [
  { id:'pet_robot', type:'companion', rarity:'common', name:'Robot Optimize', desc:'Compagnon de base neutre et fiable.', value:'robot', icon:'🤖', price:0, phrase:'Je surveille tes missions.', starter:true },
  { id:'pet_terminal', type:'companion', rarity:'common', name:'Terminal vivant', desc:'Petit compagnon informatique discret.', value:'terminal', icon:'💾', price:12, phrase:'Commande prête.' },
  { id:'pet_cube', type:'companion', rarity:'common', name:'Cube IA', desc:'Petit cube assistant, simple et efficace.', value:'cube', icon:'🧊', price:14, phrase:'Calcul en cours.' },
  { id:'pet_drone', type:'companion', rarity:'common', name:'Drone de bureau', desc:'Survole ton QG et repère les tâches.', value:'drone', icon:'🚁', price:16, phrase:'Zone scannée.' },
  { id:'pet_sprout', type:'companion', rarity:'common', name:'Pousse Mémo', desc:'Une petite pousse qui garde tes idées.', value:'sprout', icon:'🌱', price:18, phrase:'Une idée plantée est une idée sauvée.' },
  { id:'pet_pixel', type:'companion', rarity:'rare', name:'Compagnon Pixel', desc:'Un petit allié rétro.', value:'pixel', icon:'👾', price:28, phrase:'Bip bip, pixel prêt.' },
  { id:'pet_holo', type:'companion', rarity:'rare', name:'Hologramme IA', desc:'Assistant visuel futuriste.', value:'holo', icon:'🧬', price:32, phrase:'Analyse en cours.' },
  { id:'pet_arcade_cat', type:'companion', rarity:'rare', name:'Chat Arcade', desc:'Un compagnon joueur et rapide.', value:'arcade_cat', icon:'🐱', price:34, phrase:'Combo productif détecté.' },
  { id:'pet_study_owl', type:'companion', rarity:'rare', name:'Chouette Study', desc:'Elle surveille les sessions sérieuses.', value:'study_owl', icon:'🦉', price:36, phrase:'Concentration activée.', boost:{ type:'study', value:3, scope:'equipped' } },
  { id:'pet_pocket_ai', type:'companion', rarity:'rare', name:'IA de Poche', desc:'Assistant miniature pour décisions rapides.', value:'pocket_ai', icon:'📱', price:38, phrase:'Je garde les infos utiles.', boost:{ type:'global', value:3, scope:'equipped' } },
  { id:'pet_ninja', type:'companion', rarity:'epic', name:'Ninja Tech', desc:'Discret, rapide, efficace.', value:'ninja', icon:'🥷', price:68, phrase:'Mission silencieuse.', boost:{ type:'objective', value:5, scope:'equipped' } },
  { id:'pet_dragon', type:'companion', rarity:'epic', name:'Dragon Digital', desc:'Compagnon puissant pour les gros objectifs.', value:'dragon', icon:'🐉', price:82, phrase:'On brûle les deadlines.', boost:{ type:'objective', value:7, scope:'equipped' } },
  { id:'pet_cyber_fox', type:'companion', rarity:'epic', name:'Renard Cyber', desc:'Rusé, rapide, très tech.', value:'cyber_fox', icon:'🦊', price:74, phrase:'Plan alternatif trouvé.', boost:{ type:'tech', value:6, scope:'equipped' } },
  { id:'pet_samurai_bot', type:'companion', rarity:'epic', name:'Robot Samouraï', desc:'Discipline et précision.', value:'samurai_bot', icon:'🤖', price:80, phrase:'Un coup, une tâche.', boost:{ type:'planning', value:6, scope:'equipped' } },
  { id:'pet_neon_specter', type:'companion', rarity:'epic', name:'Spectre Néon', desc:'Présence mystérieuse dans le QG.', value:'neon_specter', icon:'👻', price:86, phrase:'Je traverse le chaos.', boost:{ type:'global', value:6, scope:'equipped' } },
  { id:'pet_oracle', type:'companion', rarity:'legendary', name:'Oracle IA', desc:'Guide légendaire de progression.', value:'oracle', icon:'🔮', price:145, phrase:'Je vois ton prochain niveau.', boost:{ type:'global', value:12, scope:'season' } },
  { id:'pet_quantum_raven', type:'companion', rarity:'legendary', name:'Corbeau Quantique', desc:'Messager des grandes décisions.', value:'quantum_raven', icon:'🐦‍⬛', price:155, phrase:'Probabilité favorable.', boost:{ type:'tech', value:12, scope:'season' } },
  { id:'pet_guardian_qg', type:'companion', rarity:'legendary', name:'Gardien du QG', desc:'Protège ton cockpit personnel.', value:'guardian_qg', icon:'🛡️', price:165, phrase:'Base sécurisée.', boost:{ type:'global', value:12, scope:'season' } },
  { id:'pet_404', type:'companion', rarity:'secret', name:'Robot 404', desc:'Compagnon secret des chasseurs de bugs.', value:'404', icon:'❔', price:0, phrase:'Erreur trouvée. XP trouvé.', gachaOnly:true, boost:{ type:'tech', value:12, scope:'permanent' } },
  { id:'pet_glitch', type:'companion', rarity:'secret', name:'Glitch Pet', desc:'Créature secrète instable.', value:'glitch', icon:'🕳️', price:0, phrase:'Je suis un bug utile.', gachaOnly:true, boost:{ type:'global', value:10, scope:'permanent' } },
  { id:'pet_celestial', type:'companion', rarity:'celestial', name:'Gardien Céleste', desc:'Compagnon mythique avec troisième slot compagnon.', value:'celestial', icon:'🌌', price:0, phrase:'Le QG est sous protection divine.', gachaOnly:true, boost:{ type:'global', value:20, scope:'permanent' }, unlocks:'third_companion_slot' }
];

const REWARD_CATALOG = [
  { id:'theme_classic', type:'theme', rarity:'common', name:'Classic Optimize', desc:'Le thème doux de base.', value:'classic', icon:'🧭', price:0, starter:true },
  { id:'theme_study', type:'theme', rarity:'common', name:'Study Mode', desc:'Sobre, calme, orienté révisions.', value:'study', icon:'📚', price:12 },
  { id:'theme_minimal', type:'theme', rarity:'common', name:'Minimal Cloud', desc:'Une interface claire, blanche et très légère.', value:'minimal', icon:'☁️', price:14 },
  { id:'theme_sunset', type:'theme', rarity:'common', name:'Sunset Desk', desc:'Des tons chauds de fin de journée.', value:'sunset', icon:'🌇', price:18 },
  { id:'theme_arcade', type:'theme', rarity:'rare', name:'Arcade Soft', desc:'Touches jeu vidéo colorées et lisibles.', value:'arcade', icon:'🎮', price:26 },
  { id:'theme_cyber', type:'theme', rarity:'rare', name:'Cyber Calm', desc:'Ambiance tech sombre mais lisible.', value:'cyber', icon:'💻', price:30 },
  { id:'theme_forest', type:'theme', rarity:'rare', name:'Forest Focus', desc:'Une ambiance verte et naturelle.', value:'forest', icon:'🌲', price:32 },
  { id:'theme_ocean', type:'theme', rarity:'rare', name:'Ocean Flow', desc:'Bleus profonds et sensation de fluidité.', value:'ocean', icon:'🌊', price:34 },
  { id:'theme_pixel', type:'theme', rarity:'epic', name:'Pixel Desk', desc:'Un univers rétro informatique assumé.', value:'pixel', icon:'🕹️', price:58, boost:{ type:'tech', value:3, scope:'equipped' } },
  { id:'theme_neon', type:'theme', rarity:'epic', name:'Neon Hacker', desc:'Un dashboard fluo vert, violet et terminal.', value:'neon', icon:'🟢', price:72, boost:{ type:'tech', value:4, scope:'equipped' } },
  { id:'theme_synthwave', type:'theme', rarity:'epic', name:'Synthwave Grid', desc:'Néons rose et bleu façon jeu rétro futuriste.', value:'synthwave', icon:'🌆', price:78, boost:{ type:'creative', value:4, scope:'equipped' } },
  { id:'theme_aurora', type:'theme', rarity:'epic', name:'Aurora Glass', desc:'Des reflets d’aurore sur une interface vitrée.', value:'aurora', icon:'🌌', price:82, boost:{ type:'global', value:4, scope:'equipped' } },
  { id:'theme_legendary', type:'theme', rarity:'legendary', name:'Legendary Focus', desc:'Thème premium de boss final.', value:'legendary', icon:'🏆', price:125, boost:{ type:'global', value:10, scope:'season' } },
  { id:'theme_royal', type:'theme', rarity:'legendary', name:'Royal Command', desc:'Or, bleu nuit et interface de commandement.', value:'royal', icon:'👑', price:145, boost:{ type:'global', value:10, scope:'season' } },
  { id:'theme_void', type:'theme', rarity:'secret', name:'Void Interface', desc:'Thème secret glitch et interface cachée.', value:'void', icon:'🕳️', price:0, gachaOnly:true, boost:{ type:'global', value:12, scope:'permanent' } },
  { id:'theme_celestial', type:'theme', rarity:'celestial', name:'Celestial Command', desc:'Thème mythique réservé aux grands chanceux.', value:'celestial', icon:'💫', price:0, gachaOnly:true, boost:{ type:'global', value:18, scope:'permanent' } },
  { id:'theme_spring', type:'theme', rarity:'rare', name:'Printemps Bloom', desc:'Pétales, verts frais et lumière douce.', value:'spring', icon:'🌸', price:0, seasonal:true, season:'spring' },
  { id:'theme_summer', type:'theme', rarity:'rare', name:'Été Océan', desc:'Mer, écume et plage de sable qui monte pendant le défilement.', value:'summer', icon:'🏖️', price:0, seasonal:true, season:'summer' },
  { id:'theme_autumn', type:'theme', rarity:'rare', name:'Automne Ember', desc:'Feuilles, cuivre et lumière chaleureuse.', value:'autumn', icon:'🍂', price:0, seasonal:true, season:'autumn' },
  { id:'theme_winter', type:'theme', rarity:'rare', name:'Hiver Boréal', desc:'Neige légère, bleu polaire et aurore.', value:'winter', icon:'❄️', price:0, seasonal:true, season:'winter' },

  { id:'title_apprentice', type:'title', rarity:'common', name:'Apprenti Organisé', desc:'Titre de départ.', value:'Apprenti Organisé', icon:'🧭', price:0, starter:true },
  { id:'title_checklist', type:'title', rarity:'common', name:'Recrue de la Checklist', desc:'Pour les premières tâches bien rangées.', value:'Recrue de la Checklist', icon:'✅', price:10 },
  { id:'title_idea_explorer', type:'title', rarity:'common', name:'Explorateur d’Idées', desc:'Ton carnet commence à prendre vie.', value:'Explorateur d’Idées', icon:'💡', price:12 },
  { id:'title_student', type:'title', rarity:'common', name:'Étudiant Organisé', desc:'Cours, devoirs et révisions sous contrôle.', value:'Étudiant Organisé', icon:'🎓', price:14 },
  { id:'title_planner', type:'title', rarity:'rare', name:'Maître du Planning', desc:'Pour les stratèges du calendrier.', value:'Maître du Planning', icon:'🗓️', price:20 },
  { id:'title_focus_architect', type:'title', rarity:'rare', name:'Architecte du Focus', desc:'Tu construis des sessions plus propres.', value:'Architecte du Focus', icon:'🎯', price:24 },
  { id:'title_project_pilot', type:'title', rarity:'rare', name:'Pilote de Projets', desc:'Tu gardes plusieurs projets sur la bonne trajectoire.', value:'Pilote de Projets', icon:'🚀', price:28 },
  { id:'title_routine_strategist', type:'title', rarity:'rare', name:'Stratège des Routines', desc:'Tu transformes les habitudes en système.', value:'Stratège des Routines', icon:'♟️', price:32 },
  { id:'title_hacker', type:'title', rarity:'epic', name:'Hacker de Productivité', desc:'Pour les optimiseurs tech.', value:'Hacker de Productivité', icon:'⌨️', price:48, boost:{ type:'tech', value:4, scope:'equipped' } },
  { id:'title_deadline', type:'title', rarity:'epic', name:'Seigneur des Deadlines', desc:'Tu domines les échéances.', value:'Seigneur des Deadlines', icon:'⏳', price:52, boost:{ type:'deadline', value:4, scope:'equipped' } },
  { id:'title_digital_builder', type:'title', rarity:'epic', name:'Bâtisseur Numérique', desc:'Tes sites et outils deviennent un écosystème.', value:'Bâtisseur Numérique', icon:'🧱', price:58, boost:{ type:'tech', value:5, scope:'equipped' } },
  { id:'title_creative_captain', type:'title', rarity:'epic', name:'Capitaine Créatif', desc:'Idées, vidéos et projets avancent ensemble.', value:'Capitaine Créatif', icon:'🎬', price:62, boost:{ type:'creative', value:5, scope:'equipped' } },
  { id:'title_worldmaker', type:'title', rarity:'legendary', name:'Créateur de Mondes', desc:'Pour les projets créatifs ambitieux.', value:'Créateur de Mondes', icon:'🌍', price:98, boost:{ type:'creative', value:10, scope:'season' } },
  { id:'title_time_guardian', type:'title', rarity:'legendary', name:'Gardien du Temps', desc:'Chaque heure a une mission.', value:'Gardien du Temps', icon:'⌛', price:108, boost:{ type:'planning', value:10, scope:'season' } },
  { id:'title_commander', type:'title', rarity:'legendary', name:'Commandant Optimize', desc:'Le QG reconnaît ton autorité.', value:'Commandant Optimize', icon:'🫡', price:118, boost:{ type:'global', value:10, scope:'season' } },
  { id:'title_origin', type:'title', rarity:'secret', name:'Utilisateur Originel', desc:'Titre secret des premiers pilotes.', value:'Utilisateur Originel', icon:'⚡', price:0, gachaOnly:true, boost:{ type:'global', value:10, scope:'permanent' } },
  { id:'title_chaos_master', type:'title', rarity:'secret', name:'Maître du Chaos', desc:'Tu trouves une route même quand tout déborde.', value:'Maître du Chaos', icon:'🌀', price:0, gachaOnly:true, boost:{ type:'global', value:12, scope:'permanent' } },
  { id:'title_star_architect', type:'title', rarity:'celestial', name:'Architecte des Étoiles', desc:'Titre céleste de progression absolue.', value:'Architecte des Étoiles', icon:'🌠', price:0, gachaOnly:true, boost:{ type:'global', value:18, scope:'permanent' } },
  { id:'title_celestial_slot', type:'title_slot', rarity:'celestial', name:'Double Titre Divin', desc:'Débloque une deuxième ligne de titre active.', value:'second_title_slot', icon:'👑', price:0, gachaOnly:true, boost:{ type:'global', value:5, scope:'permanent' } },

  { id:'anim_classic', type:'animation', rarity:'common', name:'Confettis classiques', desc:'L’effet de victoire de base.', value:'classic', icon:'🎉', price:0, starter:true },
  { id:'anim_ripple', type:'animation', rarity:'common', name:'Onde douce', desc:'Chaque clic crée une petite onde lumineuse.', value:'ripple', icon:'⭕', price:10 },
  { id:'anim_soft', type:'animation', rarity:'common', name:'Glissement fluide', desc:'Transitions discrètes et naturelles.', value:'soft', icon:'🫧', price:12 },
  { id:'anim_pixel', type:'animation', rarity:'rare', name:'Explosion pixel', desc:'Clics et changements façon arcade.', value:'pixel', icon:'🟪', price:24 },
  { id:'anim_stars', type:'animation', rarity:'rare', name:'Pluie d’étoiles', desc:'Une validation plus brillante.', value:'stars', icon:'🌟', price:27 },
  { id:'anim_wave', type:'animation', rarity:'rare', name:'Vague digitale', desc:'Les pages arrivent comme une vague.', value:'wave', icon:'🌊', price:30 },
  { id:'anim_holo', type:'animation', rarity:'epic', name:'Hologramme', desc:'Effet tech et interface futuriste.', value:'holo', icon:'💠', price:58 },
  { id:'anim_scanline', type:'animation', rarity:'epic', name:'Scan système', desc:'Une ligne de scan révèle chaque page.', value:'scanline', icon:'📡', price:62 },
  { id:'anim_portal', type:'animation', rarity:'epic', name:'Portail', desc:'Les pages apparaissent depuis un anneau lumineux.', value:'portal', icon:'🌀', price:68 },
  { id:'anim_mission', type:'animation', rarity:'legendary', name:'Mission accomplie', desc:'Validation façon fin de niveau.', value:'mission', icon:'🏁', price:112, boost:{ type:'objective', value:8, scope:'season' } },
  { id:'anim_thunder', type:'animation', rarity:'legendary', name:'Impact Foudre', desc:'Un flash maîtrisé accompagne les grandes actions.', value:'thunder', icon:'⚡', price:128, boost:{ type:'global', value:8, scope:'season' } },
  { id:'anim_glitch', type:'animation', rarity:'secret', name:'Glitch Hacker', desc:'Décalage contrôlé sans aucun vrai bug.', value:'glitch', icon:'📺', price:0, gachaOnly:true, boost:{ type:'tech', value:12, scope:'permanent' } },
  { id:'anim_matrix', type:'animation', rarity:'secret', name:'Matrix Rain', desc:'Des lignes numériques traversent les clics.', value:'matrix', icon:'🟩', price:0, gachaOnly:true, boost:{ type:'tech', value:12, scope:'permanent' } },
  { id:'anim_celestial', type:'animation', rarity:'celestial', name:'Naissance Céleste', desc:'Éclats, halos et transition cosmique.', value:'celestial', icon:'✨', price:0, gachaOnly:true, boost:{ type:'global', value:18, scope:'permanent' } },
  { id:'anim_spring', type:'animation', rarity:'rare', name:'Pétales de Printemps', desc:'Des pétales accompagnent tes actions.', value:'petals', icon:'🌸', price:0, seasonal:true, season:'spring' },
  { id:'anim_summer', type:'animation', rarity:'rare', name:'Splash d’Été', desc:'Des gouttes et vagues légères sur les clics.', value:'splash', icon:'💦', price:0, seasonal:true, season:'summer' },
  { id:'anim_autumn', type:'animation', rarity:'rare', name:'Feuilles d’Automne', desc:'Des feuilles cuivrées tombent doucement.', value:'leaves', icon:'🍁', price:0, seasonal:true, season:'autumn' },
  { id:'anim_winter', type:'animation', rarity:'rare', name:'Neige Boréale', desc:'Des flocons accompagnent les transitions.', value:'snow', icon:'❄️', price:0, seasonal:true, season:'winter' },
  ...DEFAULT_COMPANIONS
];
const STARTER_REWARD_IDS = REWARD_CATALOG.filter(r => r.starter).map(r => r.id);

const DEFAULT_REWARD_CARDS = [
  { id:"card_first_steps", name:"Premiers Pas", rarity:"common", category:"progression", description:"Les débuts dans Optimize.", condition_hint:"Crée tes premiers éléments dans l’appli.", boost_type:"global", boost_value:0, season:"permanent", icon:"👣", active:true },
  { id:"card_planning_core", name:"Architecte du Chaos", rarity:"common", category:"organisation", description:"Tu commences à transformer le chaos en planning.", condition_hint:"Ajoute plusieurs créneaux dans le planning.", boost_type:"planning", boost_value:0, season:"permanent", icon:"🗓️", active:true },
  { id:"card_checklist_spark", name:"Étincelle Checklist", rarity:"common", category:"organisation", description:"Les petites tâches deviennent des victoires.", condition_hint:"Termine plusieurs tâches.", boost_type:"global", boost_value:0, season:"permanent", icon:"✅", active:true },
  { id:"card_journal_seed", name:"Graine de Journal", rarity:"common", category:"progression", description:"Premières traces de progression personnelle.", condition_hint:"Ajoute quelques entrées dans le journal.", boost_type:"journal", boost_value:0, season:"permanent", icon:"🌱", active:true },
  { id:"card_hub_starter", name:"Portail Personnel", rarity:"common", category:"tech", description:"Ton hub commence à connecter tes sites.", condition_hint:"Ajoute un site dans Mes sites.", boost_type:"tech", boost_value:0, season:"permanent", icon:"🌐", active:true },
  { id:"card_budget_seed", name:"Premiers Crédits", rarity:"common", category:"budget", description:"Début du suivi budget.", condition_hint:"Ajoute quelques lignes de budget.", boost_type:"budget", boost_value:0, season:"permanent", icon:"💰", active:true },
  { id:"card_doc_keeper", name:"Gardien des Docs", rarity:"common", category:"admin", description:"Tu gardes tes documents sous contrôle.", condition_hint:"Ajoute un document à préparer.", boost_type:"global", boost_value:0, season:"permanent", icon:"📄", active:true },
  { id:"card_class_tracker", name:"Radar de Cours", rarity:"common", category:"cours", description:"Tu suis mieux ce que tu vois en cours.", condition_hint:"Ajoute un suivi de cours.", boost_type:"study", boost_value:0, season:"permanent", icon:"📚", active:true },
  { id:"card_code_words", name:"Créateur de Sites", rarity:"rare", category:"tech", description:"Une carte liée au vocabulaire code / web.", condition_hint:"Utilise des mots comme site, code, html, css, github, supabase.", boost_type:"tech", boost_value:2, season:"permanent", icon:"💻", active:true },
  { id:"card_creative_studio", name:"Atelier Créatif", rarity:"rare", category:"creative", description:"Tes idées YouTube, montage ou dessin prennent forme.", condition_hint:"Ajoute plusieurs idées créatives.", boost_type:"creative", boost_value:2, season:"permanent", icon:"🎬", active:true },
  { id:"card_revision_engine", name:"Moteur de Révision", rarity:"rare", category:"study", description:"Les chapitres commencent à être cartographiés.", condition_hint:"Ajoute des matières et thèmes de révision.", boost_type:"study", boost_value:2, season:"permanent", icon:"🧠", active:true },
  { id:"card_calendar_weaver", name:"Tisseur de Semaine", rarity:"rare", category:"planning", description:"Tu utilises le planning comme une vraie carte.", condition_hint:"Ajoute plusieurs créneaux dans la semaine.", boost_type:"planning", boost_value:2, season:"permanent", icon:"🕸️", active:true },
  { id:"card_social_contact", name:"Réseau Activé", rarity:"rare", category:"contact", description:"Tes contacts utiles commencent à être centralisés.", condition_hint:"Ajoute plusieurs contacts.", boost_type:"global", boost_value:2, season:"permanent", icon:"📇", active:true },
  { id:"card_inventory_scout", name:"Scout du Matériel", rarity:"rare", category:"inventory", description:"Tu connais mieux ton matériel.", condition_hint:"Ajoute plusieurs objets dans l’inventaire matériel.", boost_type:"global", boost_value:2, season:"permanent", icon:"🎒", active:true },
  { id:"card_night_shift", name:"Signal Nocturne", rarity:"rare", category:"easter", description:"Une carte pour ceux qui croisent Optimize tard.", condition_hint:"Utilise l’appli ou écris une note dans une ambiance nocturne.", boost_type:"global", boost_value:2, season:"permanent", icon:"🌙", active:true },
  { id:"card_idea_storm", name:"Tempête d’Idées", rarity:"rare", category:"creative", description:"Ton carnet commence à bouillonner.", condition_hint:"Ajoute plusieurs idées dans le carnet.", boost_type:"creative", boost_value:2, season:"permanent", icon:"🌪️", active:true },
  { id:"card_deadline_runner", name:"Runner des Deadlines", rarity:"epic", category:"deadline", description:"Tu affrontes les grosses dates au lieu de les fuir.", condition_hint:"Crée plusieurs échéances importantes.", boost_type:"deadline", boost_value:5, season:"permanent", icon:"⏱️", active:true },
  { id:"card_aaa_pattern", name:"Triple A Signal", rarity:"epic", category:"easter", description:"Un motif étrange est apparu dans tes textes.", condition_hint:"Certaines répétitions de lettres peuvent déclencher cette carte.", boost_type:"global", boost_value:4, season:"permanent", icon:"🅰️", active:true },
  { id:"card_github_gate", name:"Portail GitHub", rarity:"epic", category:"tech", description:"Tu relies tes sites et ton univers web.", condition_hint:"Ajoute plusieurs sites GitHub Pages dans le Hub.", boost_type:"tech", boost_value:5, season:"permanent", icon:"🧭", active:true },
  { id:"card_quest_master", name:"Maître des Quêtes", rarity:"epic", category:"objective", description:"Tu avances vraiment dans tes objectifs.", condition_hint:"Valide plusieurs objectifs / quêtes.", boost_type:"objective", boost_value:5, season:"permanent", icon:"🎯", active:true },
  { id:"card_skill_builder", name:"Skill Builder", rarity:"epic", category:"skills", description:"Tu fais monter tes compétences.", condition_hint:"Ajoute et fais progresser plusieurs compétences.", boost_type:"global", boost_value:5, season:"permanent", icon:"🛠️", active:true },
  { id:"card_project_architect", name:"Architecte de Projets", rarity:"epic", category:"project", description:"Tes projets prennent une vraie structure.", condition_hint:"Crée plusieurs projets et avance-les.", boost_type:"project", boost_value:5, season:"permanent", icon:"🏗️", active:true },
  { id:"card_winter_focus", name:"Winter Focus", rarity:"legendary", category:"season", description:"Boost saisonnier de discipline et de calme.", condition_hint:"Carte saisonnière hivernale.", boost_type:"global", boost_value:10, season:"winter", icon:"❄️", active:true },
  { id:"card_summer_creator", name:"Creative Summer", rarity:"legendary", category:"season", description:"Boost saisonnier de créativité.", condition_hint:"Carte saisonnière d’été.", boost_type:"creative", boost_value:10, season:"summer", icon:"☀️", active:true },
  { id:"card_new_game_plus", name:"New Game+", rarity:"legendary", category:"season", description:"Nouveau cycle, nouvelles habitudes.", condition_hint:"Carte liée aux périodes de nouveau départ.", boost_type:"global", boost_value:10, season:"new_game", icon:"🎮", active:true },
  { id:"card_deep_work_core", name:"Deep Work Core", rarity:"legendary", category:"season", description:"Pour les périodes de travail profond.", condition_hint:"Carte liée aux phases focus / construction.", boost_type:"objective", boost_value:10, season:"deep_work", icon:"🧘", active:true },
  { id:"card_glitch_origin", name:"Glitch Origin", rarity:"secret", category:"secret", description:"Carte secrète avec boost permanent.", condition_hint:"Indice : bugs, 404, glitchs et mots cachés.", boost_type:"global", boost_value:12, season:"permanent", icon:"🕳️", active:true },
  { id:"card_optimize_origin", name:"Optimize Origin", rarity:"secret", category:"secret", description:"Carte secrète des pionniers.", condition_hint:"Elle aime le nom de l’application, mais pas seulement.", boost_type:"global", boost_value:10, season:"permanent", icon:"⚡", active:true },
  { id:"card_bug_whisperer", name:"Bug Whisperer", rarity:"secret", category:"secret", description:"Tu transformes les erreurs en progression.", condition_hint:"Indice : erreurs, corrections, debug et patience.", boost_type:"tech", boost_value:10, season:"permanent", icon:"🐞", active:true },
  { id:"card_divine_second_title", name:"Second Titre Divin", rarity:"celestial", category:"celestial", description:"Objet mythique : autorise deux titres actifs.", condition_hint:"Extrêmement rare. Peut tomber au gacha avec une chance minuscule.", boost_type:"global", boost_value:8, season:"permanent", icon:"👑", active:true, unlocks:"second_title_slot" }
];
function rewardCatalog() {
  const dynamicCompanions = Array.isArray(app?.companionCatalog) && app.companionCatalog.length ? app.companionCatalog : DEFAULT_COMPANIONS;
  const nonCompanionRewards = REWARD_CATALOG.filter(r => r.type !== 'companion');
  return [...nonCompanionRewards, ...dynamicCompanions];
}
function rewardById(id) { return rewardCatalog().find(r => r.id === id); }
function rarityBadge(rarity) { const r = RARITY[rarity] || RARITY.common; return `<span class="badge rarity ${r.className}">${r.label}</span>`; }
function typeLabel(type) { return ({ theme:'Thème', title:'Titre', title_slot:'Amélioration de titre', animation:'Animation', companion:'Compagnon', card:'Carte' }[type] || type); }
function rewardIcon(reward) { return reward?.icon || ({theme:'🎨', title:'🏷️', title_slot:'👑', animation:'✨', companion:'🤖'}[reward?.type] || '🎁'); }
function rewardDisplayNameByValue(type, value) { return rewardCatalog().find(r => r.type === type && r.value === value)?.name || value || '—'; }
function activeSeasonId() {
  const month = new Date().getMonth() + 1;
  if ([12,1].includes(month)) return 'winter_rewards';
  if ([2,3].includes(month)) return 'focus_mode';
  if ([4,5].includes(month)) return 'spring_upgrade';
  if ([6,7,8].includes(month)) return 'creative_summer';
  if ([9].includes(month)) return 'new_game_plus';
  if ([10].includes(month)) return 'build_season';
  return 'deep_work';
}
function seasonDefinition(id = activeSeasonId()) {
  const defs = {
    winter_rewards:{ name:'Winter Rewards', desc:'Bilan, calme, récompenses et préparation du prochain cycle.', target:520, months:'Décembre / Janvier' },
    focus_mode:{ name:'Focus Mode', desc:'Discipline, concentration et remise en ordre.', target:520, months:'Février / Mars' },
    spring_upgrade:{ name:'Spring Upgrade', desc:'Progression, créativité et redémarrage propre.', target:560, months:'Avril / Mai' },
    creative_summer:{ name:'Creative Summer', desc:'Liberté, projets perso, création, code et détente productive.', target:600, months:'Juin / Juillet / Août' },
    new_game_plus:{ name:'New Game+', desc:'Nouveau départ, nouvelles habitudes, nouvelle organisation.', target:540, months:'Septembre' },
    build_season:{ name:'Build Season', desc:'Construction solide, projets propres, régularité.', target:540, months:'Octobre' },
    deep_work:{ name:'Deep Work', desc:'Travail profond, progression silencieuse, amélioration.', target:540, months:'Novembre' }
  };
  return { id, ...(defs[id] || defs.focus_mode) };
}
function currentSeason(stats = {}) {
  const def = seasonDefinition();
  const points = (stats.objectivesDone || 0) * 8 + (stats.homeworkDone || 0) * 5 + (stats.completedTasks || 0) * 2 + (stats.sites || 0) * 4 + (stats.creativeDone || 0) * 10;
  return { id:def.id, name:def.name, desc:def.desc, months:def.months, points, target:def.target, level:stats.level || 1, percent:Math.max(0, Math.min(100, points/def.target*100)) };
}
function defaultGameState() {
  return {
    tickets: 0,
    unlocked_rewards: [...STARTER_REWARD_IDS],
    unlocked_cards: [],
    equipped_theme: 'classic',
    equipped_title: 'Apprenti Organisé',
    equipped_title_2: '',
    equipped_animation: 'classic',
    equipped_cards: [],
    equipped_companions: ['pet_robot'],
    active_legendary_boosts: {},
    claimed_level: 1,
    claimed_daily_date: '',
    claimed_daily_ids: [],
    mission_date: '',
    mission_claimed: false,
    used_secret_codes: [],
    notifications: []
  };
}
function asArray(v) { return Array.isArray(v) ? v : []; }
function normalizeGameState(row = {}) {
  const base = defaultGameState();
  const unlocked = new Set([...(base.unlocked_rewards || []), ...asArray(row.unlocked_rewards || row.inventory)]);
  return {
    ...base,
    ...row,
    unlocked_rewards:[...unlocked],
    unlocked_cards: asArray(row.unlocked_cards),
    equipped_cards: asArray(row.equipped_cards).slice(0, CARD_SLOT_LIMIT),
    equipped_companions: asArray(row.equipped_companions).length ? asArray(row.equipped_companions) : ['pet_robot'],
    active_legendary_boosts: row.active_legendary_boosts && typeof row.active_legendary_boosts === 'object' ? row.active_legendary_boosts : {},
    used_secret_codes: asArray(row.used_secret_codes),
    notifications:Array.isArray(row.notifications) ? row.notifications : []
  };
}
function companionSlotLimit(state) {
  const unlocked = new Set(state.unlocked_rewards || []);
  const thirdSlotReward = rewardCatalog().some(reward => reward.type === 'companion' && reward.unlocks === 'third_companion_slot' && unlocked.has(reward.id));
  return thirdSlotReward ? 3 : COMPANION_SLOT_BASE;
}
async function ensureGameState() {
  let rows = [];
  try { rows = await app.load('game_state'); } catch { rows = []; }
  let state = normalizeGameState(rows[0] || {});
  if (!rows[0]) state = await app.create('game_state', state);
  state = normalizeGameState(state);
  try { await loadCompanions(); } catch {}
  try {
    await autoUnlockCards(state);
    const stats = await getGameStats();
    if ((stats.level || 1) > (state.claimed_level || 1)) {
      const diff = (stats.level || 1) - (state.claimed_level || 1);
      const bonus = diff * 3;
      state.tickets = Number(state.tickets || 0) + bonus;
      state.claimed_level = stats.level;
      state = await saveGameState(state, `Niveau ${stats.level} atteint : +${bonus} ticket(s).`);
    }
  } catch { /* bonus facultatif */ }
  applyTheme(state.equipped_theme || 'classic');
  applyAnimation(state.equipped_animation || 'classic');
  return state;
}
async function saveGameState(state, notification) {
  const clean = normalizeGameState(state);
  if (notification) clean.notifications = [{ id:uid(), text:notification, date:new Date().toISOString(), read:false }, ...(clean.notifications || [])].slice(0,80);
  const rows = await app.load('game_state').catch(() => []);
  const payload = {
    tickets: Number(clean.tickets || 0),
    unlocked_rewards: clean.unlocked_rewards || [],
    unlocked_cards: clean.unlocked_cards || [],
    equipped_theme: clean.equipped_theme || 'classic',
    equipped_title: clean.equipped_title || 'Apprenti Organisé',
    equipped_title_2: clean.equipped_title_2 || '',
    equipped_animation: clean.equipped_animation || 'classic',
    equipped_cards: (clean.equipped_cards || []).slice(0, CARD_SLOT_LIMIT),
    equipped_companions: (clean.equipped_companions || []).slice(0, companionSlotLimit(clean)),
    active_legendary_boosts: clean.active_legendary_boosts || {},
    claimed_level: Number(clean.claimed_level || 1),
    claimed_daily_date: clean.claimed_daily_date || '',
    claimed_daily_ids: clean.claimed_daily_ids || [],
    mission_date: clean.mission_date || '',
    mission_claimed: Boolean(clean.mission_claimed),
    used_secret_codes: clean.used_secret_codes || [],
    notifications: clean.notifications || []
  };
  if (rows[0]) return normalizeGameState(await app.update('game_state', rows[0].id, payload));
  return normalizeGameState(await app.create('game_state', payload));
}
async function addNotification(text) { const state = await ensureGameState(); await saveGameState(state, text); await app.updateHud(); }
function updateSeasonalScrollDecoration() {
  if (document.body.dataset.theme !== 'summer') return;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
  document.body.style.setProperty('--sand-height', `${58 + Math.round(progress * 105)}px`);
}
function applyTheme(theme='classic') {
  const known = new Set(rewardCatalog().filter(r => r.type === 'theme').map(r => r.value));
  document.body.dataset.theme = known.has(theme) ? theme : 'classic';
  updateSeasonalScrollDecoration();
}
function applyAnimation(animation='classic') {
  const known = new Set(rewardCatalog().filter(r => r.type === 'animation').map(r => r.value));
  document.body.dataset.animation = known.has(animation) ? animation : 'classic';
}
function animationGroup(animation='classic') {
  if (['pixel'].includes(animation)) return 'pixel';
  if (['stars','celestial','snow','petals','leaves'].includes(animation)) return 'stars';
  if (['holo','scanline','matrix'].includes(animation)) return 'holo';
  if (['glitch'].includes(animation)) return 'glitch';
  if (['wave','splash'].includes(animation)) return 'wave';
  if (['portal'].includes(animation)) return 'portal';
  if (['mission','thunder'].includes(animation)) return 'mission';
  return 'soft';
}
function animatePageTransition(container, animation='classic') {
  if (!container || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const cls = `page-transition-${animationGroup(animation)}`;
  container.classList.remove('page-transition-soft','page-transition-pixel','page-transition-stars','page-transition-holo','page-transition-glitch','page-transition-wave','page-transition-portal','page-transition-mission');
  void container.offsetWidth;
  container.classList.add(cls);
  setTimeout(() => container.classList.remove(cls), 760);
}
function spawnClickEffect(event) {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const target = event.target.closest('button, a, .module-bubble, .reward-card');
  if (!target || target.disabled) return;
  const animation = document.body.dataset.animation || 'classic';
  const effect = document.createElement('span');
  effect.className = `click-effect click-effect-${animationGroup(animation)}`;
  effect.style.left = `${event.clientX}px`;
  effect.style.top = `${event.clientY}px`;
  effect.textContent = ({pixel:'▪',stars:'✦',holo:'◉',glitch:'▥',wave:'≈',portal:'○',mission:'✓'}[animationGroup(animation)] || '');
  document.body.appendChild(effect);
  setTimeout(() => effect.remove(), 820);
}
let visualEffectsBound = false;
function setupVisualEffects() {
  if (visualEffectsBound) return;
  visualEffectsBound = true;
  document.addEventListener('pointerdown', spawnClickEffect, { passive:true });
  window.addEventListener('scroll', updateSeasonalScrollDecoration, { passive:true });
  window.addEventListener('resize', updateSeasonalScrollDecoration, { passive:true });
}

function getRewardBoost(reward, state) {
  if (!reward?.boost) return 0;
  if (reward.rarity === 'legendary' && reward.boost.scope === 'season') {
    return state.active_legendary_boosts?.[reward.id] === activeSeasonId() ? Number(reward.boost.value || 0) : 0;
  }
  return Number(reward.boost.value || 0);
}
function getCardBoost(card, state) {
  if (!card) return 0;
  if (card.rarity === 'legendary') return state.active_legendary_boosts?.[`card:${card.id}`] === activeSeasonId() ? Number(card.boost_value || 0) : 0;
  return Number(card.boost_value || 0);
}

function normalizeCompanionRow(row) {
  const rarity = String(row.rarity || 'common').toLowerCase();
  const starter = Boolean(row.starter);
  const highRarity = isHighRarity(rarity);
  const explicitGachaOnly = row.gacha_only ?? row.gachaOnly;
  const gachaOnly = explicitGachaOnly == null ? highRarity : Boolean(explicitGachaOnly) || highRarity;
  const rawPrice = row.price;
  const price = starter ? 0 : (gachaOnly ? 0 : (hasValidPositivePrice(rawPrice) ? Number(rawPrice) : fallbackPriceForRarity(rarity)));
  const boostValue = Number(row.boost_value ?? row.boost?.value ?? 0);
  const boost = boostValue ? { type: row.boost_type || row.boost?.type || 'global', value: boostValue, scope: row.boost_scope || row.boost?.scope || (rarity === 'legendary' ? 'season' : 'equipped') } : row.boost;
  return {
    id: row.id,
    type: 'companion',
    rarity,
    name: row.name || 'Compagnon sans nom',
    desc: row.description || row.desc || '',
    value: row.value || row.id,
    icon: row.icon || '🤖',
    price,
    starter,
    gachaOnly,
    phrase: row.phrase || '',
    boost,
    unlocks: row.unlocks || undefined
  };
}
async function loadCompanions() {
  let dynamic = [];
  try {
    if (APP_MODE === 'local-personal') {
      const rows = await app.provider.list('companions');
      dynamic = (rows || []).filter(c => c.active !== false);
    }
  } catch {}
  app.companionCatalog = sortByRarityThenName(mergeCatalogById(DEFAULT_COMPANIONS, dynamic).map(normalizeCompanionRow));
  return app.companionCatalog;
}

async function loadRewardCards() {
  let dynamic = [];
  try {
    if (APP_MODE === 'local-personal') {
      const rows = await app.provider.list('reward_cards');
      dynamic = (rows || []).filter(c => c.active !== false);
    }
  } catch {}
  return sortByRarityThenName(mergeCatalogById(DEFAULT_REWARD_CARDS, dynamic));
}
async function autoUnlockCards(state) {
  const cards = await loadRewardCards();
  const unlocked = new Set(state.unlocked_cards || []);
  const raw = await getRawDataForStats();
  const textPool = [
    ...(raw.ideas || []).flatMap(x => [x.title, x.content]),
    ...(raw.projects || []).flatMap(x => [x.title, x.description, x.notes]),
    ...(raw.creative_projects || []).flatMap(x => [x.title, x.idea, x.steps, x.notes]),
    ...(raw.site_links || []).flatMap(x => [x.title, x.description, x.url])
  ].join(' ').toLowerCase();
  const containsAny = words => words.some(w => textPool.includes(w));
  const rules = {
    card_first_steps: () => (raw.tasks||[]).length + (raw.objectives||[]).length >= 3,
    card_planning_core: () => (raw.events||[]).length >= 2,
    card_checklist_spark: () => safeCount(raw.tasks, t => t.completed) >= 5,
    card_journal_seed: () => (raw.progress_journal||[]).length >= 2,
    card_hub_starter: () => (raw.site_links||[]).length >= 1,
    card_budget_seed: () => (raw.budget_entries||[]).length >= 2,
    card_doc_keeper: () => (raw.documents||[]).length >= 1,
    card_class_tracker: () => (raw.course_followups||[]).length >= 1,
    card_code_words: () => containsAny(['code','site','html','css','javascript','js','github','supabase','app','bug']),
    card_creative_studio: () => containsAny(['youtube','montage','vidéo','video','dessin','script','miniature']),
    card_revision_engine: () => (raw.subjects||[]).length >= 2 || (raw.topics||[]).length >= 5,
    card_calendar_weaver: () => (raw.events||[]).length >= 5,
    card_social_contact: () => (raw.contacts||[]).length >= 2,
    card_inventory_scout: () => (raw.inventory_items||[]).length >= 3,
    card_night_shift: () => new Date().getHours() >= 22 || containsAny(['nuit','nocturne','minuit','soir']),
    card_idea_storm: () => (raw.ideas||[]).length >= 5,
    card_deadline_runner: () => (raw.deadlines||[]).length >= 3,
    card_aaa_pattern: () => /a.*a.*a.*a.*a/.test(textPool),
    card_github_gate: () => (raw.site_links||[]).filter(s => String(s.url||'').includes('github.io')).length >= 2,
    card_quest_master: () => safeCount(raw.objectives, o => o.status === 'done') >= 5,
    card_skill_builder: () => (raw.skills||[]).length >= 3 || (raw.skills||[]).reduce((s,x)=>s+Number(x.progress||0),0) >= 150,
    card_project_architect: () => (raw.projects||[]).length >= 3 || safeCount(raw.projects, p => p.status === 'done') >= 1,
    card_optimize_origin: () => containsAny(['optimize','organisation','niveau','xp','gacha']),
    card_glitch_origin: () => containsAny(['404','glitch','debug','bug corrigé','bug','erreur']),
    card_bug_whisperer: () => containsAny(['corriger','correction','bug','erreur','debug']) && (raw.projects||[]).length >= 1
  };
  let changed = false;
  for (const card of cards) {
    if (unlocked.has(card.id)) continue;
    const rule = rules[card.id];
    if (rule && rule()) { unlocked.add(card.id); changed = true; }
  }
  if (changed) { state.unlocked_cards = [...unlocked]; await saveGameState(state, 'Nouvelle carte débloquée dans le Codex.'); }
}
function rewardCard(reward, state, mode='collection') {
  const owned = (state.unlocked_rewards || []).includes(reward.id);
  const equipped = (reward.type === 'theme' && state.equipped_theme === reward.value)
    || (reward.type === 'title' && (state.equipped_title === reward.value || state.equipped_title_2 === reward.value))
    || (reward.type === 'animation' && state.equipped_animation === reward.value)
    || (reward.type === 'companion' && (state.equipped_companions || []).includes(reward.id));
  const boost = getRewardBoost(reward, state);
  const seasonalAvailable = isSeasonalRewardAvailable(reward);
  const seasonInfo = reward.seasonal ? PHYSICAL_SEASONS[reward.season] : null;
  const shopEligible = isShopEligible(reward);
  const equipLabel = reward.type === 'companion' && equipped ? 'Retirer' : equipped ? 'Déjà équipé' : 'Équiper';
  const passive = reward.type === 'title_slot';
  return `<article class="reward-card ${owned ? 'owned' : 'locked'} ${RARITY[reward.rarity]?.className || ''}" data-reward-type="${escapeHtml(reward.type)}" data-reward-owned="${owned ? 'owned' : 'locked'}">
    <div class="reward-visual" aria-hidden="true"><span>${escapeHtml(rewardIcon(reward))}</span></div>
    <div class="item-head"><div><p class="eyebrow">${typeLabel(reward.type)}</p><h3>${escapeHtml(reward.name)}</h3></div>${rarityBadge(reward.rarity)}</div>
    <p class="muted">${escapeHtml(reward.desc)}</p>
    ${seasonInfo ? `<div class="season-chip ${seasonalAvailable ? 'available' : ''}">${seasonInfo.icon} Disponible ${escapeHtml(seasonInfo.months)}${seasonalAvailable ? ' · saison active' : ''}</div>` : ''}
    ${reward.boost ? `<div class="boost-line">Boost ${reward.boost.scope === 'season' ? 'saison' : reward.boost.scope === 'permanent' ? 'permanent' : 'actif'} : +${reward.boost.value}% XP${boost ? ` · actif +${boost}%` : ''}</div>` : ''}
    <div class="meta-row">${owned ? badge(equipped ? 'Équipé' : passive ? 'Passif débloqué' : 'Débloqué', equipped ? 'green' : '') : badge(reward.seasonal && !seasonalAvailable ? 'Hors saison' : 'Verrouillé')}</div>
    ${mode === 'shop' ? `<button class="${owned ? 'ghost-btn' : 'primary-btn'}" data-buy-reward="${reward.id}" ${owned || !shopEligible ? 'disabled' : ''}>${owned ? 'Déjà obtenu' : shopEligible ? `Acheter · ${Number(reward.price)} tickets` : 'Non disponible en boutique'}</button>` : ''}
    ${mode === 'collection' && owned && !passive ? `<button class="mini-btn" data-equip-reward="${reward.id}" ${equipped && reward.type !== 'companion' ? 'disabled' : ''}>${equipLabel}</button>${reward.rarity === 'legendary' && reward.boost ? `<button class="mini-btn" data-reactivate-boost="${reward.id}">Activer boost saison · ${LEGENDARY_REACTIVATE_COST} tickets</button>` : ''}` : ''}
    ${mode === 'collection' && !owned && reward.seasonal && seasonalAvailable ? `<button class="primary-btn" data-claim-seasonal="${reward.id}">Récupérer gratuitement</button>` : ''}
  </article>`;
}
function weightedRandomReward(ownedIds = []) {
  const pool = rewardCatalog().filter(r => !r.starter && !r.seasonal && !ownedIds.includes(r.id));
  if (!pool.length) return null;
  const total = pool.reduce((s,r) => s + (RARITY[r.rarity]?.weight || 1), 0);
  let roll = Math.random() * total;
  for (const item of pool) { roll -= (RARITY[item.rarity]?.weight || 1); if (roll <= 0) return item; }
  return pool[pool.length - 1];
}
async function weightedRandomPrize(state) {
  const cards = await loadRewardCards();
  await loadCompanions();
  const rewardPool = rewardCatalog().filter(r => !r.starter && !r.seasonal && !(state.unlocked_rewards || []).includes(r.id)).map(r => ({ kind:'reward', rarity:r.rarity, item:r }));
  const cardPool = cards.filter(c => !(state.unlocked_cards || []).includes(c.id)).map(c => ({ kind:'card', rarity:c.rarity, item:c }));
  const pool = [...rewardPool, ...cardPool];
  if (!pool.length) return null;
  const total = pool.reduce((s,p) => s + (RARITY[p.rarity]?.weight || 1), 0);
  let roll = Math.random() * total;
  for (const prize of pool) { roll -= (RARITY[prize.rarity]?.weight || 1); if (roll <= 0) return prize; }
  return pool[pool.length - 1];
}
async function unlockReward(reward, reason='Récompense débloquée.') {
  if (!reward) return null;
  let state = await ensureGameState();
  const unlocked = new Set(state.unlocked_rewards || []);
  if (!unlocked.has(reward.id)) unlocked.add(reward.id);
  state.unlocked_rewards = [...unlocked];
  if (reward.type === 'title_slot') state.equipped_title_2 = state.equipped_title_2 || 'Créateur Originel';
  state = await saveGameState(state, `${reason} ${reward.name} (${RARITY[reward.rarity]?.label || reward.rarity}).`);
  confetti(reward.type === 'animation' ? reward.value : state.equipped_animation);
  return state;
}
async function unlockCard(card, reason='Carte débloquée.') {
  let state = await ensureGameState();
  const unlocked = new Set(state.unlocked_cards || []);
  if (!unlocked.has(card.id)) unlocked.add(card.id);
  state.unlocked_cards = [...unlocked];
  state = await saveGameState(state, `${reason} ${card.name} (${RARITY[card.rarity]?.label || card.rarity}).`);
  confetti(card.rarity === 'celestial' ? 'holo' : 'stars');
  return state;
}
async function claimSeasonalReward(id) {
  const reward = rewardById(id);
  if (!reward?.seasonal) return showToast('Récompense saisonnière introuvable.');
  if (!isSeasonalRewardAvailable(reward)) return showToast('Cette récompense reviendra pendant sa saison.');
  const state = await ensureGameState();
  if ((state.unlocked_rewards || []).includes(id)) return showToast('Récompense déjà obtenue.');
  await unlockReward(reward, `Récompense ${PHYSICAL_SEASONS[reward.season]?.label || 'saisonnière'} :`);
  showToast(`${reward.name} ajouté à ta collection.`);
  await app.showPage(app.currentPage);
}

async function equipReward(id) {
  let state = await ensureGameState();
  const reward = rewardById(id);
  if (!reward || !(state.unlocked_rewards || []).includes(id)) return showToast('Récompense verrouillée.');
  if (reward.type === 'title_slot') return showToast('Cette amélioration est active automatiquement.');
  if (reward.type === 'theme') state.equipped_theme = reward.value;
  if (reward.type === 'title') {
    if (state.equipped_title === reward.value || state.equipped_title_2 === reward.value) return showToast('Titre déjà équipé.');
    if ((state.unlocked_rewards || []).includes('title_celestial_slot') || (state.unlocked_cards || []).includes('card_divine_second_title')) {
      if (!state.equipped_title || state.equipped_title === 'Apprenti Organisé') state.equipped_title = reward.value;
      else if (!state.equipped_title_2) state.equipped_title_2 = reward.value;
      else state.equipped_title = reward.value;
    } else state.equipped_title = reward.value;
  }
  if (reward.type === 'animation') state.equipped_animation = reward.value;
  if (reward.type === 'companion') {
    const current = [...(state.equipped_companions || [])];
    const existingIndex = current.indexOf(id);
    if (existingIndex >= 0) current.splice(existingIndex, 1);
    else {
      const limit = companionSlotLimit(state);
      while (current.length >= limit) current.shift();
      current.push(id);
    }
    state.equipped_companions = current;
  }
  await saveGameState(state, `${reward.name} ${reward.type === 'companion' && !(state.equipped_companions || []).includes(id) ? 'retiré' : 'équipé'}.`);
  applyTheme(state.equipped_theme);
  applyAnimation(state.equipped_animation);
  showToast(`${reward.name} ${reward.type === 'companion' && !(state.equipped_companions || []).includes(id) ? 'retiré' : 'équipé'}.`);
  await app.showPage(app.currentPage);
}
async function equipCard(id) {
  let state = await ensureGameState();
  const cards = await loadRewardCards();
  const card = cards.find(c => c.id === id);
  if (!card || !(state.unlocked_cards || []).includes(id)) return showToast('Carte verrouillée.');
  const set = new Set(state.equipped_cards || []);
  if (set.has(id)) set.delete(id); else set.add(id);
  state.equipped_cards = [...set].slice(0, CARD_SLOT_LIMIT);
  await saveGameState(state, `${card.name} ${set.has(id) ? 'équipée' : 'retirée'}.`);
  await app.showPage(app.currentPage);
}
async function reactivateLegendary(id, isCard=false) {
  let state = await ensureGameState();
  if (Number(state.tickets || 0) < LEGENDARY_REACTIVATE_COST) return showToast('Pas assez de tickets.');
  state.tickets = Number(state.tickets || 0) - LEGENDARY_REACTIVATE_COST;
  state.active_legendary_boosts = { ...(state.active_legendary_boosts || {}), [isCard ? `card:${id}` : id]: activeSeasonId() };
  await saveGameState(state, 'Boost légendaire activé pour la saison actuelle.');
  showToast('Boost légendaire activé.');
  await app.showPage(app.currentPage);
}
async function readRemoteSecretCode() { return null; }

async function redeemSecretCode(codeRaw) {
  const code = String(codeRaw || '').trim().toUpperCase();
  if (!code) return;
  let state = await ensureGameState();
  if ((state.used_secret_codes || []).includes(code)) return showToast('Code déjà utilisé.');
  const fallbackCodes = {
    START: { tickets:1, card:'card_first_steps', msg:'Démarrage validé : carte commune +1 ticket.' },
    KARATE: { tickets:1, reward:null, msg:'Esprit combatif : +1 ticket.' },
    NOCTURNE: { tickets:1, reward:'anim_stars', msg:'Mode nocturne : animation rare débloquée.' },
    PIXEL: { tickets:1, reward:'pet_pixel', msg:'Signal pixel : compagnon rare débloqué.' },
    OPTIMIZE: { tickets:1, reward:'title_planner', msg:'Utilisateur curieux : titre rare débloqué.' },
    DEBUG: { tickets:1, reward:'pet_terminal', msg:'Débugueur prudent : petit bonus commun.' },
    404: { tickets:1, card:'card_code_words', msg:'Erreur repérée : carte rare débloquée.' }
  };
  const remote = await readRemoteSecretCode(code);
  const entry = remote || fallbackCodes[code];
  if (!entry) return showToast('Code inconnu.');
  if (entry.expired) return showToast(entry.msg || 'Code expiré.');
  const stats = await getGameStats();
  if (Number(entry.min_level || 1) > stats.level) return showToast(`Code réservé au niveau ${entry.min_level}+.`);

  state = await ensureGameState();
  state.used_secret_codes = [...(state.used_secret_codes || []), code];
  state.tickets = Number(state.tickets || 0) + Number(entry.tickets || 0);
  await saveGameState(state, entry.msg);

  if (entry.reward) {
    await loadCompanions().catch(() => []);
    const reward = rewardById(entry.reward);
    if (reward) await unlockReward(reward, 'Code secret :');
  }
  if (entry.card) {
    const cards = await loadRewardCards();
    const card = cards.find(c => c.id === entry.card);
    if (card) await unlockCard(card, 'Code secret :');
  }
  // L’historique des codes utilisés est conservé directement dans game_state local.
  confetti('pixel'); showToast(entry.msg || 'Code validé.');
  await app.showPage(app.currentPage);
}
function todayRows(rows, dateField='created_at') {
  return (rows || []).filter(r => String(r[dateField] || '').slice(0,10) === todayISO());
}
function dailyQuestDefinitions(stats) {
  const raw = stats.raw || {};
  const todayTasks = todayRows(raw.tasks, 'completed_at').filter(t=>t.completed).length;
  const todayObjectivesCreated = todayRows(raw.objectives).length;
  const todayObjectivesDone = todayRows(raw.objectives, 'updated_at').filter(o=>o.status==='done').length;
  const todayJournal = todayRows(raw.progress_journal, 'date').length || todayRows(raw.progress_journal).length;
  const todayIdeas = todayRows(raw.ideas).length;
  const todayEvents = todayRows(raw.events).length;
  const todayHomeworkDone = todayRows(raw.homework, 'updated_at').filter(h=>h.status==='done').length;
  const todaySites = todayRows(raw.site_links).length;
  const pool = [
    { id:'daily_task', title:'Valider une tâche', desc:'Termine au moins une tâche aujourd’hui.', xp:35, tickets:1, done: todayTasks >= 1 },
    { id:'daily_tasks_plus', title:'Combo checklist', desc:'Termine au moins 3 tâches aujourd’hui.', xp:70, tickets:2, done: todayTasks >= 3 },
    { id:'daily_objective', title:'Avancer une quête', desc:'Crée ou termine un objectif.', xp:65, tickets:2, done: todayObjectivesCreated >= 1 || todayObjectivesDone >= 1 },
    { id:'daily_homework', title:'Devoir maîtrisé', desc:'Termine au moins un devoir.', xp:75, tickets:2, done: todayHomeworkDone >= 1 },
    { id:'daily_journal', title:'Écrire dans le journal', desc:'Ajoute une entrée de progression.', xp:45, tickets:1, done: todayJournal >= 1 },
    { id:'daily_idea', title:'Capturer une idée', desc:'Ajoute une idée dans le carnet.', xp:35, tickets:1, done: todayIdeas >= 1 },
    { id:'daily_planning', title:'Piloter le temps', desc:'Ajoute ou consulte un créneau du planning.', xp:35, tickets:1, done: todayEvents >= 1 || (raw.events||[]).length >= 1 },
    { id:'daily_hub', title:'Faire vivre le Hub', desc:'Ajoute un site ou garde ton portail actif.', xp:40, tickets:1, done: todaySites >= 1 || (raw.site_links||[]).length >= 3 },
    { id:'daily_cockpit', title:'Consulter le cockpit', desc:'Ouvre Optimize et garde le cap.', xp:20, tickets:1, done: true }
  ];
  return pool;
}
async function claimDailyQuest(id) {
  const stats = await getGameStats();
  const quest = dailyQuestDefinitions(stats).find(q => q.id === id);
  if (!quest || !quest.done) return showToast('Quête pas encore validée.');
  let state = await ensureGameState();
  if (state.claimed_daily_date !== todayISO()) { state.claimed_daily_date = todayISO(); state.claimed_daily_ids = []; }
  if ((state.claimed_daily_ids || []).includes(id)) return showToast('Déjà récupéré aujourd’hui.');
  state.claimed_daily_ids = [...(state.claimed_daily_ids || []), id];
  state.tickets = Number(state.tickets || 0) + Number(quest.tickets || 0);
  await saveGameState(state, `Quête quotidienne réussie : ${quest.title} · +${quest.tickets} ticket(s).`);
  confetti('mission'); showToast(`Récompense récupérée : +${quest.tickets} ticket(s).`);
  await app.showPage(app.currentPage);
}
function pickMission(objectives=[], homework=[], deadlines=[]) {
  const objective = objectives.find(o => o.status !== 'done' && o.status !== 'abandoned');
  if (objective) return { type:'objective', id:objective.id, title:objective.title, reward:3, desc:'Valide cette quête prioritaire.' };
  const hw = homework.find(h => h.status !== 'done');
  if (hw) return { type:'homework', id:hw.id, title:hw.title, reward:2, desc:'Termine ce devoir.' };
  const dl = deadlines.sort((a,b)=>new Date(a.datetime||'2999')-new Date(b.datetime||'2999'))[0];
  if (dl) return { type:'deadline', id:dl.id, title:dl.title, reward:2, desc:'Prépare cette échéance.' };
  return { type:'daily', id:'open', title:'Ouvre ton cockpit et choisis une action', reward:2, desc:'Crée une tâche, une quête ou une note.' };
}
async function claimMission() {
  let state = await ensureGameState();
  if (state.mission_date === todayISO() && state.mission_claimed) return showToast('Mission du jour déjà validée.');
  const [objectives, homework, deadlines] = await Promise.all([
    app.load('objectives').catch(() => []),
    app.load('homework').catch(() => []),
    app.load('deadlines').catch(() => [])
  ]);
  const mission = pickMission(objectives, homework, deadlines);
  const reward = Number(mission.reward || 2);
  state.mission_date = todayISO();
  state.mission_claimed = true;
  state.tickets = Number(state.tickets || 0) + reward;
  await saveGameState(state, `Mission du jour validée : +${reward} ticket(s).`);
  confetti('mission'); showToast(`Mission du jour validée · +${reward} ticket(s).`);
  await app.showPage('dashboard');
}

class PersonalLocalProvider {
  constructor() {
    this.storageKey = 'optimize_personal_v4_5';
    this.rollbackStorageKey = 'optimize_personal_v4_5_before_import';
    this.legacyStorageKeys = ['optimize_personal_v4_4', 'optimize_personal_v4_3', 'optimize_local_v2'];
    this.state = this.loadState();
    this.user = this.userFromState();
  }
  emptyState() {
    const state = {};
    TABLES.forEach(table => { state[table] = []; });
    state._meta = { username:'joueur', createdAt:new Date().toISOString() };
    return state;
  }
  userFromState() {
    return { id:'local', username:sanitizeDisplayName(this.state?._meta?.username || 'joueur') };
  }
  loadState() {
    const candidates = [this.storageKey, ...this.legacyStorageKeys];
    for (const key of candidates) {
      try {
        const saved = JSON.parse(localStorage.getItem(key));
        if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
          const merged = { ...this.emptyState(), ...saved };
          if (!merged._meta || typeof merged._meta !== 'object') merged._meta = { username:'joueur', createdAt:new Date().toISOString() };
          if (key !== this.storageKey) localStorage.setItem(this.storageKey, JSON.stringify(merged));
          return merged;
        }
      } catch {}
    }
    return this.emptyState();
  }
  saveState() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }
  saveRollback() {
    try { localStorage.setItem(this.rollbackStorageKey, JSON.stringify(this.ensureData())); } catch {}
  }
  replaceState(nextState, profile = {}) {
    const base = this.emptyState();
    this.state = { ...base, ...cloneJson(nextState) };
    TABLES.forEach(table => { if (!Array.isArray(this.state[table])) this.state[table] = []; });
    this.state._meta = {
      ...base._meta,
      ...(nextState?._meta || {}),
      username:sanitizeDisplayName(profile.username || nextState?._meta?.username || 'joueur')
    };
    this.user = this.userFromState();
    this.saveState();
    return this.state;
  }
  ensureData() {
    TABLES.forEach(table => { if (!Array.isArray(this.state[table])) this.state[table] = []; });
    if (!this.state._meta || typeof this.state._meta !== 'object') this.state._meta = { username:'joueur', createdAt:new Date().toISOString() };
    this.state._meta.username = sanitizeDisplayName(this.state._meta.username || 'joueur');
    this.user = this.userFromState();
    this.saveState();
    return this.state;
  }
  async init() { this.ensureData(); return this.user; }
  async list(table, filter = {}) {
    const rows = [...(this.ensureData()[table] || [])];
    return rows.filter(row => Object.entries(filter).every(([key,val]) => row[key] === val));
  }
  async create(table, payload) {
    const data = this.ensureData();
    if (!Array.isArray(data[table])) data[table] = [];
    const row = { id: uid(), ...payload, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    data[table].push(row); this.saveState(); return row;
  }
  async update(table, id, patch) {
    const data = this.ensureData();
    const idx = data[table].findIndex(row => String(row.id) === String(id));
    if (idx === -1) throw new Error('Élément introuvable.');
    data[table][idx] = { ...data[table][idx], ...patch, updated_at: new Date().toISOString() };
    this.saveState(); return data[table][idx];
  }
  async remove(table, id) {
    const data = this.ensureData();
    const target = String(id);
    data[table] = data[table].filter(row => String(row.id) !== target);
    if (table === 'subjects') data.topics = data.topics.filter(row => String(row.subject_id) !== target);
    this.saveState();
  }
}

const app = {
  provider: new PersonalLocalProvider(),
  currentPage: document.body.dataset.startPage || 'dashboard',
  pageHistory: [],
  calendar: null,
  editing: {},
  cache: {},
  companionCatalog: DEFAULT_COMPANIONS,
  async init() {
    $('#today-label').textContent = dateLabel();
    this.bindNav();
    try {
      await this.provider.init();
      await this.enterApp();
    } catch (err) { showToast(err.message || 'Erreur de démarrage.'); }
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  },
  bindNav() {
    $$('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#') return;
      link.addEventListener('click', event => { event.preventDefault(); this.showPage(link.dataset.page); });
    });
    const toggleMenu = () => $('#sidebar')?.classList.toggle('open');
    $('#menu-toggle')?.addEventListener('click', toggleMenu);
    $('#floating-menu-toggle')?.addEventListener('click', toggleMenu);
    $('#floating-home')?.addEventListener('click', () => { window.location.href = './index.html'; });
    $('#floating-back')?.addEventListener('click', () => this.goBack());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#sidebar')?.classList.remove('open'); });
  },
  async enterApp() {
    $('#app-shell').classList.remove('hidden');
    $('#sidebar-user').textContent = 'Espace personnel local';
    setupEasterEggs();
    setupVisualEffects();
    await ensureGameState();
    await this.showPage(this.currentPage || 'dashboard');
    await this.updateHud();
  },
  async showPage(page, options = {}) {
    const target = page || 'dashboard';
    if (!options.skipHistory && this.currentPage && this.currentPage !== target) {
      this.pageHistory.push(this.currentPage);
      if (this.pageHistory.length > 30) this.pageHistory.shift();
    }
    this.currentPage = target; this.calendar = null;
    $$('.nav-link').forEach(btn => btn.classList.toggle('active', btn.dataset.page === target));
    $('#sidebar').classList.remove('open'); $('#page-title').textContent = PAGES[target] || 'Optimize';
    const floatingBack = $('#floating-back'); if (floatingBack) floatingBack.disabled = this.pageHistory.length === 0;
    const container = $('#page-container'); container.innerHTML = '<div class="empty-state">Chargement...</div>';
    try {
      const renderer = pageRenderers[target] || pageRenderers.dashboard;
      await renderer(container);
      const visualRows = await this.load('game_state').catch(() => []);
      const visualState = normalizeGameState(visualRows[0] || {});
      applyTheme(visualState.equipped_theme);
      applyAnimation(visualState.equipped_animation);
      animatePageTransition(container, visualState.equipped_animation);
      await this.updateHud();
    } catch (err) {
      container.innerHTML = `<div class="empty-state"><strong>Erreur.</strong><p>${escapeHtml(err.message || String(err))}</p></div>`;
    }
  },
  async goBack() {
    const previous = this.pageHistory.pop();
    if (!previous) return this.showPage('dashboard', { skipHistory: true });
    await this.showPage(previous, { skipHistory: true });
  },
  async updateHud() {
    try {
      const stats = await getGameStats();
      const xpText = `Niveau ${stats.level} · ${stats.xp} XP`;
      const sidebarXp = $('#sidebar-xp'); if (sidebarXp) sidebarXp.textContent = xpText;
      let topXp = $('#top-xp');
      const topActions = $('.top-actions');
      if (!topXp && topActions) { topXp = document.createElement('span'); topXp.id = 'top-xp'; topXp.className = 'pill xp-pill'; topActions.prepend(topXp); }
      if (topXp) topXp.textContent = xpText;
      const game = await ensureGameState();
      const unread = (game.notifications || []).filter(n => !n.read).length;
      const counts = { sites: stats.sites, objectives: stats.activeObjectives, homework: stats.activeHomework, deadlines: stats.deadlines, projects: stats.activeProjects, notifications: unread, gacha: game.tickets, collection: (game.unlocked_rewards || []).length, cards: (game.unlocked_cards || []).length, companions: (game.equipped_companions || []).length, qg: stats.level, codex: (game.unlocked_cards || []).length + (game.unlocked_rewards || []).length };
      $$('.nav-link').forEach(btn => {
        const page = btn.dataset.page;
        const label = BASE_NAV_LABELS[page] || btn.textContent.trim();
        const count = counts[page];
        btn.innerHTML = `<span>${escapeHtml(label)}</span>${count ? `<span class="nav-count">${count}</span>` : ''}`;
      });
    } catch { /* HUD facultatif : ne bloque jamais l'app */ }
  },
  async load(table, filter = {}) { return this.provider.list(table, filter); },
  async create(table, payload) { return this.provider.create(table, payload); },
  async update(table, id, patch) { return this.provider.update(table, id, patch); },
  async remove(table, id) { return this.provider.remove(table, id); }
};

function formField(field, value = '') {
  const val = value ?? field.default ?? '';
  const label = escapeHtml(field.label);
  const name = escapeHtml(field.name);
  if (field.type === 'textarea') return `<label>${label}<textarea name="${name}" placeholder="${escapeHtml(field.placeholder || '')}">${escapeHtml(val)}</textarea></label>`;
  if (field.type === 'select') return `<label>${label}<select name="${name}">${optionList(field.options || [], val)}</select></label>`;
  if (field.type === 'category') return `<label>${label}<select name="${name}">${categoryOptions(field.options || ['autre'], val || 'autre')}</select></label>`;
  if (field.type === 'checkbox') return `<label class="check-line"><input type="checkbox" name="${name}" ${val ? 'checked' : ''}/> ${label}</label>`;
  return `<label>${label}<input name="${name}" type="${escapeHtml(field.type || 'text')}" value="${escapeHtml(val)}" placeholder="${escapeHtml(field.placeholder || '')}" ${field.min !== undefined ? `min="${field.min}"` : ''} ${field.max !== undefined ? `max="${field.max}"` : ''}/></label>`;
}
function readForm(form, fields) {
  const out = {};
  fields.forEach(field => {
    const input = form.elements[field.name];
    if (!input) return;
    let value = field.type === 'checkbox' ? input.checked : input.value;
    if (field.type === 'number') value = value === '' ? 0 : Number(value);
    out[field.name] = value;
  });
  return out;
}
function fillForm(form, fields, item = {}) {
  fields.forEach(field => {
    const input = form.elements[field.name]; if (!input) return;
    const value = item[field.name] ?? field.default ?? '';
    if (field.type === 'checkbox') input.checked = Boolean(value); else input.value = value;
  });
}

function genericCard(item, fields, titleField = 'title') {
  const metas = fields.filter(f => f.name !== titleField && f.name !== 'description' && f.name !== 'notes' && f.name !== 'content' && item[f.name]).slice(0, 5)
    .map(f => badge(f.type === 'category' ? labelOf(item[f.name]) : `${f.label}: ${labelOf(item[f.name])}`)).join('');
  const details = ['description','notes','content','idea','steps','actions','objective'].filter(k => item[k]).map(k => `<p class="muted">${escapeHtml(item[k])}</p>`).join('');
  const link = item.url || item.link;
  return `<div class="item-head"><strong>${escapeHtml(item[titleField] || item.name || 'Sans titre')}</strong><div class="item-actions"><button class="mini-btn" data-edit="${item.id}">Modifier</button><button class="mini-btn" data-delete="${item.id}">Supprimer</button></div></div><div class="meta-row">${metas}</div>${details}${link ? `<a class="mini-btn" href="${escapeHtml(link)}" target="_blank" rel="noopener">Ouvrir le lien</a>` : ''}`;
}
async function renderGenericPage(container, config) {
  const rows = (await app.load(config.table)).sort(config.sort || ((a,b) => String(b.created_at || '').localeCompare(String(a.created_at || ''))));
  const editingId = app.editing[config.table];
  const editingItem = rows.find(r => String(r.id) === String(editingId)) || null;
  container.innerHTML = `
    <div class="split">
      <section class="card form-card">
        <div><p class="eyebrow">${escapeHtml(config.eyebrow || 'Ajouter')}</p><h3>${escapeHtml(editingItem ? 'Modifier' : config.formTitle || 'Nouvel élément')}</h3><p class="muted">${escapeHtml(config.subtitle || '')}</p></div>
        <form id="generic-form" class="form-grid">${config.fields.map(f => formField(f, editingItem ? editingItem[f.name] : f.default)).join('')}
          <div class="form-actions"><button class="primary-btn" type="submit">${editingItem ? 'Enregistrer' : 'Ajouter'}</button>${editingItem ? '<button class="ghost-btn" type="button" id="cancel-edit">Annuler</button>' : ''}</div>
        </form>
      </section>
      <section class="card"><h3>${escapeHtml(config.listTitle || 'Liste')}</h3><div class="list" id="generic-list">${rows.length ? rows.map(item => `<article class="list-item ${config.table === 'objectives' ? 'quest-card' : ''}">${(config.card || genericCard)(item, config.fields)}</article>`).join('') : emptyState(config.empty || 'Ajoute un premier élément.')}</div></section>
    </div>`;
  const form = $('#generic-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = readForm(form, config.fields);
    try {
      if (editingItem) { await app.update(config.table, editingItem.id, payload); app.editing[config.table] = null; showToast('Modification enregistrée.'); }
      else { await app.create(config.table, payload); showToast('Élément ajouté.'); }
      if (config.onSaved) config.onSaved(payload);
      await app.showPage(app.currentPage);
    } catch (err) { showToast(err.message || 'Erreur.'); }
  });
  $('#cancel-edit')?.addEventListener('click', async () => { app.editing[config.table] = null; await app.showPage(app.currentPage); });
  $$('[data-edit]', container).forEach(btn => btn.addEventListener('click', async () => { app.editing[config.table] = btn.dataset.edit; await app.showPage(app.currentPage); }));
  $$('[data-delete]', container).forEach(btn => btn.addEventListener('click', async () => {
    if (!confirm('Supprimer cet élément ?')) return;
    await app.remove(config.table, btn.dataset.delete); showToast('Élément supprimé.'); await app.showPage(app.currentPage);
  }));
  $$('[data-complete-objective]', container).forEach(btn => btn.addEventListener('click', async () => {
    await app.update('objectives', btn.dataset.completeObjective, { status:'done', progress:100 });
    let state = await ensureGameState();
    state.tickets = Number(state.tickets || 0) + 1;
    await saveGameState(state, 'Objectif validé : +1 ticket.');
    confetti(state.equipped_animation); showToast('Mission accomplie · +1 ticket !'); await app.showPage('objectives');
  }));
}

function renderHubPage(container, hubKey) {
  const hub = HUBS[hubKey];
  if (!hub) return;
  container.innerHTML = `
    <section class="hub-hero soft-card">
      <div class="hub-hero-icon">${hub.icon}</div>
      <div><p class="eyebrow">Espace Optimize</p><h3>${escapeHtml(hub.title)}</h3><p class="muted">${escapeHtml(hub.description)}</p></div>
    </section>
    <section class="module-bubbles" aria-label="Fonctionnalités ${escapeHtml(hub.title)}">
      ${hub.items.map(([page,title,description,icon]) => `
        <button class="module-bubble" type="button" data-open-module="${page}">
          <span class="module-bubble-icon">${icon}</span>
          <span class="module-bubble-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(description)}</small></span>
          <span class="module-bubble-arrow">→</span>
        </button>`).join('')}
    </section>`;
  $$('[data-open-module]', container).forEach(button => button.addEventListener('click', () => app.showPage(button.dataset.openModule)));
}

const pageRenderers = {
  async todayHub(container) { renderHubPage(container, 'todayHub'); },
  async organizationHub(container) { renderHubPage(container, 'organizationHub'); },
  async progressionHub(container) { renderHubPage(container, 'progressionHub'); },
  async profileHub(container) { renderHubPage(container, 'profileHub'); },
  async dashboard(container) {
    const [tasks, objectives, projects, deadlines, sites, journal, homework, events] = await Promise.all([
      app.load('tasks'), app.load('objectives'), app.load('projects'), app.load('deadlines'), app.load('site_links'), app.load('progress_journal'), app.load('homework'), app.load('personal_events')
    ]);
    const stats = await getGameStats();
    const game = await ensureGameState();
    const mission = pickMission(objectives, homework, deadlines);
    const season = currentSeason(stats);
    const dayTasks = tasks.filter(t => t.is_day_task && !t.completed);
    const doneDay = tasks.filter(t => t.is_day_task && t.completed && (t.completed_at || '').slice(0,10) === todayISO()).length;
    const totalDay = dayTasks.length + doneDay;
    const percent = totalDay ? doneDay / totalDay * 100 : 0;
    const nextDeadlines = deadlines.sort((a,b) => new Date(a.datetime || a.date || '2999') - new Date(b.datetime || b.date || '2999')).slice(0,3);
    const pinnedSites = sites.filter(s => s.pinned).slice(0,4);
    const latestSites = [...sites].sort((a,b) => String(b.created_at || '').localeCompare(String(a.created_at || ''))).slice(0,4);
    const dashboardSites = pinnedSites.length ? pinnedSites : latestSites;
    const activeQuests = objectives.filter(o => o.status !== 'done' && o.status !== 'abandoned').slice(0,4);
    container.innerHTML = `
      <section class="hero soft-card game-panel"><p class="eyebrow">Mission Control</p><h3>${app.provider.user.username === 'joueur' ? 'Salut.' : 'Salut @' + escapeHtml(app.provider.user.username) + '.'}</h3><p class="muted">Ton cockpit perso : quêtes, projets, cours, budget, sites et progression au même endroit.</p><div class="hero-actions"><button class="primary-btn" data-go="day">Lancer ma journée</button><button class="ghost-btn" data-go="objectives">Voir mes quêtes</button><button class="ghost-btn" data-go="profile">Profil / XP</button><button class="ghost-btn" data-go="sites">Portail sites</button></div></section>
      <section class="grid-2"><article class="card game-panel mission-card"><p class="eyebrow">Mission du jour</p><h3>${escapeHtml(mission.title)}</h3><p class="muted">${escapeHtml(mission.desc)} · Récompense : +${mission.reward} ticket(s)</p><button class="primary-btn" id="claim-mission-btn" ${game.mission_date === todayISO() && game.mission_claimed ? 'disabled' : ''}>${game.mission_date === todayISO() && game.mission_claimed ? 'Mission validée' : 'Valider la mission'}</button></article><article class="card game-panel"><p class="eyebrow">${escapeHtml(season.name)}</p><h3>${season.points}/${season.target} points de saison</h3>${progressHtml(season.percent)}<p class="muted">${escapeHtml(season.desc)}</p></article></section>
      <section class="card game-panel"><div class="item-head"><div><p class="eyebrow">Progression joueur</p><h3>Niveau ${stats.level} · ${stats.xp} XP</h3></div><span class="badge teal">Next level : ${stats.nextLevel} XP</span></div>${progressHtml(stats.levelPercent)}<div class="stat-grid"><div class="stat-tile"><strong>${stats.objectivesDone}</strong><span>Quêtes réussies</span></div><div class="stat-tile"><strong>${stats.completedTasks}</strong><span>Tâches validées</span></div><div class="stat-tile"><strong>${stats.sites}</strong><span>Sites liés</span></div><div class="stat-tile"><strong>${stats.badges.filter(b=>b.unlocked).length}/${stats.badges.length}</strong><span>Badges</span></div></div></section>
      <section class="dashboard-grid">
        <article class="card"><h3>Ma journée</h3>${progressHtml(percent)}<p class="muted">${doneDay} élément(s) terminé(s), ${dayTasks.length} restant(s).</p>${dayTasks.slice(0,5).map(t => `<div class="list-item"><strong>${escapeHtml(t.title)}</strong><span class="badge">${escapeHtml(labelOf(t.category))}</span></div>`).join('') || emptyState('Aucune tâche du jour active.')}</article>
        <article class="card"><h3>Quêtes du moment</h3>${activeQuests.map(o => `<div class="list-item quest-card"><div class="item-head"><strong>${escapeHtml(o.title)}</strong><span class="badge orange">${escapeHtml(labelOf(o.scope))}</span></div>${progressHtml(o.progress || 0)}</div>`).join('') || emptyState('Aucune quête active.')}</article>
      </section>
      <section class="grid-3">
        <article class="feature-card"><span class="badge red">Boss à venir</span><strong>${deadlines.length}</strong><p class="muted">${nextDeadlines.map(d => `${escapeHtml(d.title)} : J${daysUntil(d.datetime) >= 0 ? '-' + daysUntil(d.datetime) : '+' + Math.abs(daysUntil(d.datetime))}`).join('<br>') || 'Aucune échéance.'}</p></article>
        <article class="feature-card"><span class="badge teal">Devoirs actifs</span><strong>${homework.filter(h => h.status !== 'done').length}</strong><p class="muted">Travail scolaire à suivre.</p></article>
        <article class="feature-card"><span class="badge green">Hub sites</span><strong>${sites.length}</strong><p>${dashboardSites.map(s => `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.title)}${s.pinned ? ' ⭐' : ''}</a>`).join('<br>') || '<span class="muted">Aucun site ajouté.</span>'}</p><small class="muted">${pinnedSites.length ? 'Sites épinglés affichés.' : (sites.length ? 'Derniers sites affichés. Coche Épingler pour les fixer ici.' : 'Ajoute un site dans le portail.')}</small></article>
      </section>
      <section class="grid-2">
        <article class="card"><h3>Prochains événements</h3>${events.sort((a,b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`)).slice(0,4).map(e => `<div class="list-item"><strong>${escapeHtml(e.title)}</strong><span class="muted">${formatDate(e.date)} ${escapeHtml(e.time || '')}</span></div>`).join('') || emptyState('Aucun événement perso.')}</article>
        <article class="card"><h3>Journal de bord</h3>${journal.slice(-3).reverse().map(j => `<div class="list-item"><strong>${formatDate(j.date)}</strong><p class="muted">${escapeHtml(j.content || '')}</p></div>`).join('') || emptyState('Pas encore d’entrée de journal.')}</article>
      </section>`;
    $('#claim-mission-btn')?.addEventListener('click', claimMission);
    $$('[data-go]', container).forEach(btn => btn.addEventListener('click', () => app.showPage(btn.dataset.go)));
  },

  async profile(container) {
    const stats = await getGameStats();
    const game = await ensureGameState();
    container.innerHTML = `
      <section class="hero soft-card game-panel"><p class="eyebrow">Profil joueur</p><h3>${app.provider.user.username === 'joueur' ? 'Profil local' : '@' + escapeHtml(app.provider.user.username)} · ${escapeHtml(game.equipped_title || 'Apprenti Organisé')} · Niveau ${stats.level}</h3><p class="muted">Ton profil résume ton avancée dans Optimize : XP, badges, quêtes, tâches, sites et compétences.</p></section>
      <section class="card game-panel"><div class="item-head"><div><p class="eyebrow">XP global</p><h3>${stats.xp} XP</h3></div><span class="badge teal">Objectif : ${stats.nextLevel} XP</span></div>${progressHtml(stats.levelPercent)}</section>
      <section class="stat-grid"><div class="stat-tile"><strong>${stats.completedTasks}</strong><span>Tâches terminées</span></div><div class="stat-tile"><strong>${stats.objectivesDone}</strong><span>Objectifs réussis</span></div><div class="stat-tile"><strong>${game.tickets || 0}</strong><span>Tickets</span></div><div class="stat-tile"><strong>${(game.unlocked_rewards || []).length}</strong><span>Récompenses</span></div></section>
      <section class="grid-3"><button class="feature-card profile-shortcut" data-go="collection"><span class="badge purple">Collection</span><strong>Inventaire</strong><p class="muted">Skins, titres, animations.</p></button><button class="feature-card profile-shortcut" data-go="gacha"><span class="badge orange">${game.tickets || 0} tickets</span><strong>Gacha</strong><p class="muted">Tirages gratuits.</p></button><button class="feature-card profile-shortcut" data-go="shop"><span class="badge teal">Boutique</span><strong>Récompenses</strong><p class="muted">Achats avec tickets.</p></button></section>
      <section class="card"><div class="item-head"><div><h3>Badges & easter eggs</h3><p class="muted">Certains badges sont visibles, d’autres se débloquent avec des actions cachées dans l’appli.</p></div><span class="badge purple">${stats.badges.filter(b=>b.unlocked).length}/${stats.badges.length}</span></div>${badgeGrid(stats)}</section>`;
    $$('[data-go]', container).forEach(btn => btn.addEventListener('click', () => app.showPage(btn.dataset.go)));
  },

  async day(container) {
    const tasks = await app.load('tasks');
    const todayDone = tasks.filter(t => t.is_day_task && t.completed && (t.completed_at || '').slice(0,10) === todayISO());
    const active = tasks.filter(t => t.is_day_task && !t.completed);
    const total = active.length + todayDone.length;
    const percent = total ? todayDone.length / total * 100 : 0;
    container.innerHTML = `<section class="card"><h3>Progression du jour</h3>${progressHtml(percent)}</section><section class="split"><article class="card form-card"><h3>Ajouter une tâche du jour</h3><form id="day-form" class="form-grid"><label>Tâche<input name="title" required placeholder="ex : relire mon plan de Grand Oral"></label><label>Catégorie<select name="category">${categoryOptions(OPTIONS.taskCategory)}</select></label><button class="primary-btn">Ajouter</button></form></article><article class="card"><h3>Tâches du jour</h3><div class="list">${active.length ? active.map(t => `<div class="list-item"><div class="item-head"><strong>${escapeHtml(t.title)}</strong><div class="item-actions"><button class="mini-btn" data-done="${t.id}">Valider</button><button class="mini-btn" data-delete="${t.id}">Supprimer</button></div></div>${badge(t.category)}</div>`).join('') : emptyState('Ta journée est vide.')}</div></article></section>`;
    $('#day-form').addEventListener('submit', async e => { e.preventDefault(); await app.create('tasks', { title:e.target.title.value, category:e.target.category.value, is_day_task:true, completed:false, due_date: todayISO() }); showToast('Tâche ajoutée.'); await app.showPage('day'); });
    $$('[data-done]', container).forEach(btn => btn.addEventListener('click', async () => { await app.update('tasks', btn.dataset.done, { completed:true, completed_at:new Date().toISOString() }); confetti(); showToast('Objectif du jour validé.'); await app.showPage('day'); }));
    $$('[data-delete]', container).forEach(btn => btn.addEventListener('click', async () => { await app.remove('tasks', btn.dataset.delete); await app.showPage('day'); }));
  },

  async checklist(container) {
    const tasks = await app.load('tasks');
    const active = tasks.filter(t => !t.completed && !t.is_day_task);
    const done = tasks.filter(t => t.completed && !t.is_day_task).sort((a,b) => String(b.completed_at || '').localeCompare(String(a.completed_at || '')));
    const grouped = OPTIONS.taskCategory.map(cat => ({ cat, rows: active.filter(t => t.category === cat) })).filter(g => g.rows.length);
    container.innerHTML = `<section class="split"><article class="card form-card"><h3>Nouvelle tâche</h3><form id="task-form" class="form-grid"><label>Tâche<input name="title" required></label><label>Catégorie<select name="category">${categoryOptions(OPTIONS.taskCategory)}</select></label><button class="primary-btn">Ajouter</button></form></article><article class="card"><h3>Tâches actives</h3>${grouped.length ? grouped.map(g => `<div class="category-section"><div class="category-title"><span>${escapeHtml(labelOf(g.cat))}</span><span>${g.rows.length}</span></div>${g.rows.map(t => `<div class="list-item"><div class="item-head"><strong>${escapeHtml(t.title)}</strong><div class="item-actions"><button class="mini-btn" data-check="${t.id}">Cocher</button><button class="mini-btn" data-delete="${t.id}">Supprimer</button></div></div></div>`).join('')}</div>`).join('') : emptyState('Aucune tâche active.')}</article></section><section class="card"><h3>Historique des tâches terminées</h3><div class="list">${done.slice(0,30).map(t => `<div class="list-item"><strong>${escapeHtml(t.title)}</strong><div class="meta-row">${badge(t.category,'green')}<span>${formatDateTime(t.completed_at)}</span></div></div>`).join('') || emptyState('Aucune tâche terminée.')}</div></section>`;
    $('#task-form').addEventListener('submit', async e => { e.preventDefault(); await app.create('tasks', { title:e.target.title.value, category:e.target.category.value, is_day_task:false, completed:false }); e.target.reset(); await app.showPage('checklist'); });
    $$('[data-check]', container).forEach(btn => btn.addEventListener('click', async () => { await app.update('tasks', btn.dataset.check, { completed:true, completed_at:new Date().toISOString() }); confetti(); await app.showPage('checklist'); }));
    $$('[data-delete]', container).forEach(btn => btn.addEventListener('click', async () => { await app.remove('tasks', btn.dataset.delete); await app.showPage('checklist'); }));
  },

  async planning(container) {
    const events = await app.load('events');
    const editingId = app.editing.events;
    const editing = events.find(e => String(e.id) === String(editingId));
    container.innerHTML = `<section class="split"><article class="card form-card"><h3>${editing ? 'Modifier le créneau' : 'Ajouter un créneau'}</h3><form id="event-form" class="form-grid"><label>Titre<input name="title" required value="${escapeHtml(editing?.title || '')}"></label><label>Catégorie<select name="category">${categoryOptions(OPTIONS.planCategory, editing?.category || 'autre')}</select></label><label>Début<input name="start" type="datetime-local" required value="${escapeHtml(toDateTimeLocal(editing?.start || currentDateTimeLocal()))}"></label><label>Fin<input name="end" type="datetime-local" required value="${escapeHtml(toDateTimeLocal(editing?.end || currentDateTimeLocal()))}"></label><label>Notes<textarea name="notes">${escapeHtml(editing?.notes || '')}</textarea></label><div class="form-actions"><button class="primary-btn">${editing ? 'Enregistrer' : 'Ajouter'}</button>${editing ? '<button class="ghost-btn" type="button" id="cancel-event">Annuler</button>' : ''}</div></form></article><article class="card"><h3>Mes créneaux</h3><div class="list">${events.length ? events.sort((a,b) => new Date(a.start)-new Date(b.start)).map(e => `<div class="list-item"><div class="item-head"><strong>${escapeHtml(e.title)}</strong><div class="item-actions"><button class="mini-btn" data-edit-event="${e.id}">Modifier</button><button class="mini-btn" data-delete-event="${e.id}">Supprimer</button></div></div><div class="meta-row">${badge(e.category)}<span>${formatDateTime(e.start)} → ${formatDateTime(e.end)}</span></div>${e.notes ? `<p class="muted">${escapeHtml(e.notes)}</p>` : ''}</div>`).join('') : emptyState('Aucun créneau.')}</div></article></section><section class="card calendar-wrap"><div id="calendar"></div></section>`;
    $('#event-form').addEventListener('submit', async e => { e.preventDefault(); const payload = { title:e.target.title.value, category:e.target.category.value, color: colorFor(e.target.category.value), start:new Date(e.target.start.value).toISOString(), end:new Date(e.target.end.value).toISOString(), notes:e.target.notes.value }; if (editing) { await app.update('events', editing.id, payload); app.editing.events = null; } else await app.create('events', payload); showToast('Planning enregistré.'); await app.showPage('planning'); });
    $('#cancel-event')?.addEventListener('click', async () => { app.editing.events = null; await app.showPage('planning'); });
    $$('[data-edit-event]', container).forEach(btn => btn.addEventListener('click', async () => { app.editing.events = btn.dataset.editEvent; await app.showPage('planning'); }));
    $$('[data-delete-event]', container).forEach(btn => btn.addEventListener('click', async () => { if (!confirm('Supprimer ce créneau ?')) return; await app.remove('events', btn.dataset.deleteEvent); showToast('Créneau supprimé.'); await app.showPage('planning'); }));
    setTimeout(() => initCalendar(events), 0);
  },

  async projects(container) { return renderGenericPage(container, configs.projects); },
  async objectives(container) { return renderGenericPage(container, configs.objectives); },
  async homework(container) { return renderGenericPage(container, configs.homework); },
  async ideas(container) { return renderGenericPage(container, configs.ideas); },
  async budget(container) { await renderBudget(container); },
  async deadlines(container) { return renderGenericPage(container, configs.deadlines); },
  async courses(container) { return renderGenericPage(container, configs.courses); },
  async documents(container) { return renderGenericPage(container, configs.documents); },
  async sites(container) { return renderGenericPage(container, configs.sites); },
  async journal(container) { return renderGenericPage(container, configs.journal); },
  async purchases(container) { return renderGenericPage(container, configs.purchases); },
  async skills(container) { return renderGenericPage(container, configs.skills); },
  async contacts(container) { return renderGenericPage(container, configs.contacts); },
  async creative(container) { return renderGenericPage(container, configs.creative); },
  async agenda(container) { return renderGenericPage(container, configs.agenda); },
  async inventory(container) { return renderGenericPage(container, configs.inventory); },

  async revisions(container) {
    const [subjects, topics] = await Promise.all([app.load('subjects'), app.load('topics')]);
    container.innerHTML = `<section class="split"><article class="card form-card"><h3>Ajouter une matière</h3><form id="subject-form" class="form-grid"><label>Matière<input name="title" required placeholder="Maths, physique, philo..."></label><label>Description<textarea name="description"></textarea></label><button class="primary-btn">Ajouter</button></form><hr><h3>Ajouter un thème</h3><form id="topic-form" class="form-grid"><label>Matière<select name="subject_id">${subjects.map(s => `<option value="${s.id}">${escapeHtml(s.title)}</option>`).join('')}</select></label><label>Thème<input name="title" required></label><label>Statut<select name="status">${optionList(OPTIONS.revisionStatus)}</select></label><button class="primary-btn" ${subjects.length ? '' : 'disabled'}>Ajouter le thème</button></form></article><article class="card"><h3>Mes révisions</h3>${subjects.length ? subjects.map(s => revisionSubjectCard(s, topics.filter(t => t.subject_id === s.id))).join('') : emptyState('Ajoute une matière pour commencer.')}</article></section>`;
    $('#subject-form').addEventListener('submit', async e => { e.preventDefault(); await app.create('subjects', { title:e.target.title.value, description:e.target.description.value }); await app.showPage('revisions'); });
    $('#topic-form').addEventListener('submit', async e => { e.preventDefault(); await app.create('topics', { subject_id:e.target.subject_id.value, title:e.target.title.value, status:e.target.status.value }); await app.showPage('revisions'); });
    $$('[data-topic-status]', container).forEach(sel => sel.addEventListener('change', async () => { await app.update('topics', sel.dataset.topicStatus, { status: sel.value }); await app.showPage('revisions'); }));
    $$('[data-delete-topic]', container).forEach(btn => btn.addEventListener('click', async () => { await app.remove('topics', btn.dataset.deleteTopic); await app.showPage('revisions'); }));
    $$('[data-delete-subject]', container).forEach(btn => btn.addEventListener('click', async () => { if (!confirm('Supprimer cette matière et ses thèmes ?')) return; await app.remove('subjects', btn.dataset.deleteSubject); await app.showPage('revisions'); }));
  },


  async collection(container) {
    const state = await ensureGameState();
    const stats = await getGameStats();
    const grouped = ['theme','title','animation'].map(type => ({ type, items: rewardCatalog().filter(r => r.type === type) }));
    container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Inventaire de récompenses</p><h3>${state.tickets || 0} tickets · ${rewardCatalog().filter(item => (state.unlocked_rewards || []).includes(item.id)).length}/${rewardCatalog().length} récompenses</h3><p class="muted">Équipe tes skins, titres et animations. Les badges restent affichés dans le profil.</p></section>
    ${grouped.map(group => `<section class="card"><div class="item-head"><h3>${typeLabel(group.type)}s</h3><span class="badge">${group.items.filter(i => (state.unlocked_rewards || []).includes(i.id)).length}/${group.items.length}</span></div><div class="reward-grid">${group.items.map(item => rewardCard(item, state, 'collection')).join('')}</div></section>`).join('')}
    <section class="card"><h3>Badges</h3>${badgeGrid(stats)}</section>`;
    $$('[data-equip-reward]', container).forEach(btn => btn.addEventListener('click', () => equipReward(btn.dataset.equipReward)));
  },

  async quests(container) {
    const stats = await getGameStats();
    const state = await ensureGameState();
    const quests = dailyQuestDefinitions(stats);
    const claimed = state.claimed_daily_date === todayISO() ? (state.claimed_daily_ids || []) : [];
    container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Quêtes quotidiennes</p><h3>Missions du jour</h3><p class="muted">Termine des actions concrètes dans Optimize pour gagner des tickets. Reset chaque jour.</p></section><section class="reward-grid">${quests.map(q => `<article class="reward-card ${q.done ? 'owned' : ''}"><div class="item-head"><div><p class="eyebrow">Quête quotidienne</p><h3>${escapeHtml(q.title)}</h3></div>${q.done ? badge('Validée','green') : badge('À faire')}</div><p class="muted">${escapeHtml(q.desc)}</p><p><strong>Récompense :</strong> +${q.tickets} ticket(s)</p><button class="primary-btn" data-claim-daily="${q.id}" ${!q.done || claimed.includes(q.id) ? 'disabled' : ''}>${claimed.includes(q.id) ? 'Récupérée' : 'Récupérer'}</button></article>`).join('')}</section>`;
    $$('[data-claim-daily]', container).forEach(btn => btn.addEventListener('click', () => claimDailyQuest(btn.dataset.claimDaily)));
  },

  async gacha(container) {
    const state = await ensureGameState();
    const canPull = Number(state.tickets || 0) >= 3;
    container.innerHTML = `<section class="hero soft-card game-panel gacha-hero"><p class="eyebrow">Gacha gratuit</p><h3>${state.tickets || 0} tickets disponibles</h3><p class="muted">Un tirage coûte 3 tickets. Aucun argent réel : tu gagnes les tickets en montant de niveau et en validant des quêtes.</p><button class="primary-btn big-action" id="gacha-pull" ${canPull ? '' : 'disabled'}>Tirage · 3 tickets</button></section><section class="grid-2"><article class="card"><h3>Taux de rareté</h3><div class="list">${Object.entries(RARITY).map(([k,v]) => `<div class="list-item"><span>${rarityBadge(k)}</span><strong>${v.weight}%</strong></div>`).join('')}</div></article><article class="card"><h3>Objets possibles</h3><p class="muted">Thèmes, titres de profil et animations de réussite.</p></article></section>`;
    $('#gacha-pull')?.addEventListener('click', async () => {
      let s = await ensureGameState();
      if (Number(s.tickets || 0) < 3) return showToast('Pas assez de tickets.');
      const reward = weightedRandomReward(s.unlocked_rewards || []);
      s.tickets = Number(s.tickets || 0) - 3;
      if (!reward) { await saveGameState(s, 'Tous les objets du gacha sont déjà débloqués.'); showToast('Collection déjà complète.'); return app.showPage('gacha'); }
      await saveGameState(s);
      await unlockReward(reward, 'Tirage gacha :');
      showToast(`Tu as obtenu : ${reward.name} !`);
      await app.showPage('gacha');
    });
  },

  async shop(container) {
    const state = await ensureGameState();
    const shopItems = rewardCatalog().filter(r => !r.starter).sort((a,b) => a.price - b.price);
    container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Boutique gratuite</p><h3>${state.tickets || 0} tickets</h3><p class="muted">Achète directement certains skins, titres ou animations. Aucun paiement réel.</p></section><section class="reward-grid">${shopItems.map(item => rewardCard(item, state, 'shop')).join('')}</section>`;
    $$('[data-buy-reward]', container).forEach(btn => btn.addEventListener('click', async () => {
      const reward = rewardById(btn.dataset.buyReward); let s = await ensureGameState();
      if (!reward) return;
      if ((s.unlocked_rewards || []).includes(reward.id)) return showToast('Déjà obtenu.');
      if (Number(s.tickets || 0) < Number(reward.price || 0)) return showToast('Pas assez de tickets.');
      s.tickets = Number(s.tickets || 0) - Number(reward.price || 0);
      await saveGameState(s);
      await unlockReward(reward, 'Achat boutique :');
      await app.showPage('shop');
    }));
  },

  async notifications(container) {
    let state = await ensureGameState();
    const notes = state.notifications || [];
    container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Centre de notifications</p><h3>${notes.filter(n=>!n.read).length} non lue(s)</h3><p class="muted">Récompenses, quêtes, tickets, niveaux et événements importants.</p><button class="ghost-btn" id="mark-all-read">Tout marquer comme lu</button></section><section class="card"><h3>Notifications</h3><div class="list">${notes.length ? notes.map(n => `<div class="list-item ${n.read ? '' : 'notification-unread'}"><div class="item-head"><strong>${escapeHtml(n.text)}</strong>${n.read ? badge('Lu') : badge('Nouveau','green')}</div><p class="muted">${formatDateTime(n.date)}</p></div>`).join('') : emptyState('Aucune notification pour l’instant.')}</div></section>`;
    $('#mark-all-read')?.addEventListener('click', async () => { state.notifications = notes.map(n => ({ ...n, read:true })); await saveGameState(state); await app.showPage('notifications'); });
  },

  async seasons(container) {
    const stats = await getGameStats();
    const season = currentSeason(stats);
    container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Saison active</p><h3>${escapeHtml(season.name)}</h3><p class="muted">${escapeHtml(season.desc)}</p></section><section class="card"><div class="item-head"><div><h3>Progression de saison</h3><p class="muted">Objectif : rester régulier et avancer sur les vrais sujets.</p></div><span class="badge orange">${season.points}/${season.target}</span></div>${progressHtml(season.percent)}</section><section class="grid-3"><article class="feature-card"><span class="badge teal">Récompense 25%</span><strong>+2 tickets</strong><p class="muted">À débloquer plus tard.</p></article><article class="feature-card"><span class="badge purple">Récompense 60%</span><strong>Titre spécial</strong><p class="muted">Saison Bac Mode.</p></article><article class="feature-card"><span class="badge orange">Récompense 100%</span><strong>Skin saison</strong><p class="muted">Récompense finale.</p></article></section>`;
  },

  async backups(container) {
    renderBackupsPage(container);
  },

  async settings(container) {
    container.innerHTML = `<section class="card"><h3>Paramètres</h3><div class="list"><div class="list-item"><strong>Mode personnel</strong><p class="muted">Optimize fonctionne sans compte et sans connexion.</p></div><div class="list-item"><strong>Stockage</strong><p class="muted">Les données sont enregistrées uniquement dans le navigateur utilisé.</p></div><div class="list-item"><strong>Clé locale</strong><p class="muted">optimize_personal_v4_4</p></div><div class="list-item"><strong>Sauvegardes</strong><p class="muted">Utilise Profil → Sauvegardes pour exporter ou importer un fichier JSON.</p></div><div class="list-item"><strong>Univers de progression</strong><p class="muted">Collection, gacha, boutique, quêtes quotidiennes, titres, cartes, compagnons, thèmes saisonniers et animations visuelles sont conservés.</p></div></div></section>`;
  }
};

function revisionSubjectCard(subject, rows) {
  const done = rows.filter(t => t.status === 'completed').length;
  const inProgress = rows.filter(t => t.status === 'in_progress').length;
  const percent = rows.length ? (done + inProgress * 0.5) / rows.length * 100 : 0;
  return `<div class="list-item"><div class="item-head"><strong>${escapeHtml(subject.title)}</strong><button class="mini-btn" data-delete-subject="${subject.id}">Supprimer</button></div>${subject.description ? `<p class="muted">${escapeHtml(subject.description)}</p>` : ''}${progressHtml(percent)}<div class="list">${rows.map(t => `<div class="list-item"><div class="item-head"><strong>${escapeHtml(t.title)}</strong><button class="mini-btn" data-delete-topic="${t.id}">Supprimer</button></div><select data-topic-status="${t.id}">${optionList(OPTIONS.revisionStatus, t.status)}</select></div>`).join('') || '<p class="muted">Aucun thème.</p>'}</div></div>`;
}

function initCalendar(rows) {
  const el = $('#calendar'); if (!el || !window.FullCalendar) return;
  const calendar = new FullCalendar.Calendar(el, {
    initialView: 'timeGridWeek', locale: 'fr', firstDay: 1, height: 'auto', allDaySlot: false,
    slotMinTime: '00:00:00', slotMaxTime: '24:00:00', nowIndicator: true, editable: true, selectable: true,
    headerToolbar: { left: 'prev,next today', center: 'title', right: 'timeGridWeek,timeGridDay' },
    events: rows.map(e => ({ id:e.id, title:e.title, start:e.start, end:e.end, backgroundColor:e.color || colorFor(e.category), borderColor:e.color || colorFor(e.category), extendedProps:{ category:e.category, notes:e.notes } })),
    select(info) { app.editing.events = null; const form = $('#event-form'); if (form) { form.start.value = toDateTimeLocal(info.start); form.end.value = toDateTimeLocal(info.end); form.title.focus(); } },
    eventClick(info) { app.editing.events = info.event.id; app.showPage('planning'); },
    async eventDrop(info) { await app.update('events', info.event.id, { start: info.event.start.toISOString(), end: info.event.end?.toISOString() || info.event.start.toISOString() }); showToast('Créneau déplacé.'); },
    async eventResize(info) { await app.update('events', info.event.id, { start: info.event.start.toISOString(), end: info.event.end.toISOString() }); showToast('Durée modifiée.'); }
  });
  calendar.render(); app.calendar = calendar;
}

const configs = {
  projects: { table:'projects', formTitle:'Nouveau projet', listTitle:'Mes projets', subtitle:'Suis tes projets généraux.', fields:[
    {name:'title', label:'Nom du projet'}, {name:'status', label:'Statut', type:'select', options:OPTIONS.projectStatus, default:'active'}, {name:'progress', label:'Avancement %', type:'number', min:0, max:100, default:0}, {name:'description', label:'Description', type:'textarea'}, {name:'notes', label:'Notes d’évolution', type:'textarea'}], card:(item, fields)=>`${genericCard(item, fields)}${progressHtml(item.progress || 0)}` },
  objectives: { table:'objectives', formTitle:'Nouvel objectif / quête', listTitle:'Objectifs / Quêtes', subtitle:'Objectifs du jour, semaine, mois ou long terme.', fields:[
    {name:'title', label:'Objectif'}, {name:'scope', label:'Période', type:'select', options:OPTIONS.objectiveScope, default:'jour'}, {name:'priority', label:'Priorité', type:'select', options:OPTIONS.priority, default:'moyenne'}, {name:'status', label:'Statut', type:'select', options:OPTIONS.objectiveStatus, default:'not_started'}, {name:'deadline', label:'Deadline', type:'date'}, {name:'progress', label:'Progression %', type:'number', min:0, max:100, default:0}, {name:'description', label:'Description', type:'textarea'}], onSaved: payload => { if (payload.status === 'done') { confetti(); showToast('Mission accomplie · XP gagné !'); } }, card:(item, fields)=>`${genericCard(item, fields)}${progressHtml(item.status === 'done' ? 100 : item.progress || 0)}${item.status !== 'done' ? `<button class="mini-btn mission-complete" data-complete-objective="${item.id}">Valider la quête</button>` : `<span class="badge green">Mission accomplie</span>`}` },
  homework: { table:'homework', formTitle:'Nouveau devoir', listTitle:'Devoirs', fields:[
    {name:'subject', label:'Matière'}, {name:'title', label:'Travail à faire'}, {name:'due_date', label:'Date limite', type:'date'}, {name:'urgency', label:'Urgence', type:'select', options:OPTIONS.priority, default:'moyenne'}, {name:'estimated_time', label:'Temps estimé'}, {name:'status', label:'Statut', type:'select', options:OPTIONS.workStatus, default:'todo'}, {name:'notes', label:'Notes', type:'textarea'}] },
  ideas: { table:'ideas', formTitle:'Nouvelle idée', listTitle:'Carnet d’idées', fields:[
    {name:'title', label:'Titre'}, {name:'category', label:'Catégorie', type:'category', options:['youtube','montage','dessin','site','projet','cours','autre'], default:'autre'}, {name:'status', label:'Statut', type:'select', options:OPTIONS.ideaStatus, default:'brute'}, {name:'pinned', label:'Épingler', type:'checkbox'}, {name:'content', label:'Idée / notes', type:'textarea'}] },
  deadlines: { table:'deadlines', formTitle:'Nouvelle échéance', listTitle:'Examens et échéances', fields:[
    {name:'title', label:'Nom'}, {name:'category', label:'Catégorie', type:'category', options:['examen','oral','rendu','concours','administratif','autre'], default:'examen'}, {name:'datetime', label:'Date et heure', type:'datetime-local'}, {name:'importance', label:'Importance', type:'select', options:OPTIONS.priority, default:'haute'}, {name:'preparation', label:'À préparer avant', type:'textarea'}, {name:'notes', label:'Notes', type:'textarea'}], card:(item, fields)=>`${genericCard(item, fields)}<p class="muted">${item.datetime ? `Compte à rebours : J${daysUntil(item.datetime) >= 0 ? '-' + daysUntil(item.datetime) : '+' + Math.abs(daysUntil(item.datetime))}` : 'Aucune date.'}</p>` },
  courses: { table:'course_followups', formTitle:'Suivi de cours', listTitle:'Mes cours', fields:[
    {name:'subject', label:'Matière'}, {name:'last_lesson', label:'Dernier cours vu'}, {name:'catchup', label:'Cours à rattraper', type:'textarea'}, {name:'exercises', label:'Exercices à refaire', type:'textarea'}, {name:'understanding', label:'Compréhension', type:'select', options:OPTIONS.understanding, default:'moyen'}, {name:'notes', label:'Notes importantes', type:'textarea'}] },
  documents: { table:'documents', formTitle:'Nouveau document', listTitle:'Documents à préparer', fields:[
    {name:'title', label:'Document'}, {name:'category', label:'Catégorie'}, {name:'status', label:'Statut', type:'select', options:OPTIONS.documentStatus, default:'a_faire'}, {name:'deadline', label:'Deadline', type:'date'}, {name:'link', label:'Lien vers fichier', type:'url'}, {name:'notes', label:'Notes', type:'textarea'}] },
  sites: { table:'site_links', formTitle:'Nouveau site', listTitle:'Mes sites / Portail personnel', fields:[
    {name:'title', label:'Nom du site'}, {name:'url', label:'Lien', type:'url'}, {name:'category', label:'Catégorie', type:'category', options:['revisions','site','youtube','code','ecole','projet','autre'], default:'site'}, {name:'pinned', label:'Épingler sur l’accueil', type:'checkbox', default:true}, {name:'description', label:'Description', type:'textarea'}], empty:'Ajoute ton premier site pour construire ton hub. Par défaut, les nouveaux sites sont épinglés sur l’accueil.', card:(item, fields)=>`<div class="item-head"><strong>${escapeHtml(item.title || 'Sans titre')}</strong><div class="item-actions"><button class="mini-btn" data-edit="${item.id}">Modifier</button><button class="mini-btn" data-delete="${item.id}">Supprimer</button></div></div><div class="meta-row">${badge(item.category)}${item.pinned ? badge('Épinglé','green') : ''}</div>${item.description ? `<p class="muted">${escapeHtml(item.description)}</p>` : ''}<div class="form-actions"><a class="primary-btn" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Ouvrir le site</a></div>` },
  journal: { table:'progress_journal', formTitle:'Nouvelle entrée', listTitle:'Journal de progression', fields:[
    {name:'date', label:'Date', type:'date', default:todayISO()}, {name:'category', label:'Catégorie', type:'category', options:['cours','projet','sport','perso','site','autre'], default:'cours'}, {name:'mood', label:'Humeur', type:'select', options:OPTIONS.mood, default:'bien'}, {name:'content', label:'Ce que j’ai fait', type:'textarea'}] },
  purchases: { table:'purchases', formTitle:'Nouvel achat', listTitle:'Liste d’achats', fields:[
    {name:'title', label:'À acheter'}, {name:'category', label:'Catégorie', type:'category', options:['cours','perso','sport','tech','vetements','autre'], default:'perso'}, {name:'estimated_price', label:'Prix estimé', type:'number', min:0, default:0}, {name:'priority', label:'Priorité', type:'select', options:OPTIONS.priority, default:'moyenne'}, {name:'status', label:'Statut', type:'select', options:OPTIONS.purchaseStatus, default:'a_acheter'}, {name:'notes', label:'Notes', type:'textarea'}] },
  skills: { table:'skills', formTitle:'Nouvelle compétence', listTitle:'Compétences', fields:[
    {name:'title', label:'Compétence'}, {name:'category', label:'Catégorie', type:'category', options:['code','cours','oral','dessin','sport','organisation','autre'], default:'code'}, {name:'level', label:'Niveau actuel', type:'select', options:OPTIONS.level, default:'debutant'}, {name:'progress', label:'Progression %', type:'number', min:0, max:100, default:0}, {name:'objective', label:'Objectif', type:'textarea'}, {name:'actions', label:'Actions à faire', type:'textarea'}, {name:'notes', label:'Notes', type:'textarea'}], card:(item, fields)=>`${genericCard(item, fields)}${progressHtml(item.progress || 0)}` },
  contacts: { table:'contacts', formTitle:'Nouveau contact', listTitle:'Contacts importants', fields:[
    {name:'name', label:'Nom'}, {name:'role', label:'Rôle'}, {name:'email', label:'Email', type:'email'}, {name:'phone', label:'Téléphone'}, {name:'category', label:'Catégorie', type:'category', options:['ecole','perso','sport','projet','administratif','autre'], default:'autre'}, {name:'notes', label:'Notes', type:'textarea'}], card:(item, fields)=>`<div class="item-head"><strong>${escapeHtml(item.name || 'Sans nom')}</strong><div class="item-actions"><button class="mini-btn" data-edit="${item.id}">Modifier</button><button class="mini-btn" data-delete="${item.id}">Supprimer</button></div></div><div class="meta-row">${badge(item.category)}${item.role ? badge(item.role) : ''}</div><p>${item.email ? `<a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a>` : ''}${item.phone ? `<br><a href="tel:${escapeHtml(item.phone)}">${escapeHtml(item.phone)}</a>` : ''}</p>${item.notes ? `<p class="muted">${escapeHtml(item.notes)}</p>` : ''}` },
  creative: { table:'creative_projects', formTitle:'Nouveau projet créatif', listTitle:'Projets créatifs', fields:[
    {name:'title', label:'Titre'}, {name:'type', label:'Type', type:'category', options:['youtube','montage','dessin','site','code','amis','autre'], default:'youtube'}, {name:'status', label:'Statut', type:'select', options:OPTIONS.creativeStatus, default:'idee'}, {name:'idea', label:'Idée de départ', type:'textarea'}, {name:'steps', label:'Étapes à faire', type:'textarea'}, {name:'link', label:'Lien', type:'url'}, {name:'last_modified', label:'Dernière modification', type:'date', default:todayISO()}, {name:'notes', label:'Notes', type:'textarea'}] },
  agenda: { table:'personal_events', formTitle:'Nouvel événement', listTitle:'Agenda perso', fields:[
    {name:'title', label:'Événement'}, {name:'date', label:'Date', type:'date'}, {name:'time', label:'Heure', type:'time'}, {name:'location', label:'Lieu'}, {name:'category', label:'Catégorie', type:'category', options:['sport','amis','famille','ecole','perso','autre'], default:'perso'}, {name:'notes', label:'Notes', type:'textarea'}] },
  inventory: { table:'inventory_items', formTitle:'Nouvel objet', listTitle:'Inventaire matériel', fields:[
    {name:'name', label:'Objet'}, {name:'category', label:'Catégorie', type:'category', options:['tech','cours','sport','dessin','maison','autre'], default:'tech'}, {name:'condition', label:'État', type:'select', options:OPTIONS.condition, default:'bon'}, {name:'location', label:'Lieu'}, {name:'estimated_price', label:'Prix approximatif', type:'number', min:0, default:0}, {name:'purchase_date', label:'Date d’achat', type:'date'}, {name:'status', label:'Statut', type:'select', options:OPTIONS.inventoryStatus, default:'utilise'}, {name:'notes', label:'Notes', type:'textarea'}], titleField:'name' }
};

async function renderBudget(container) {
  const rows = await app.load('budget_entries');
  const income = rows.filter(r => r.type === 'income').reduce((s,r) => s + Number(r.amount || 0), 0);
  const expense = rows.filter(r => r.type === 'expense').reduce((s,r) => s + Number(r.amount || 0), 0);
  await renderGenericPage(container, {
    table:'budget_entries', formTitle:'Nouvelle opération', listTitle:`Solde estimé : ${(income - expense).toFixed(2)} €`, subtitle:`Revenus : ${income.toFixed(2)} € — Dépenses : ${expense.toFixed(2)} €`, fields:[
      {name:'title', label:'Nom'}, {name:'type', label:'Type', type:'select', options:OPTIONS.budgetType, default:'expense'}, {name:'category', label:'Catégorie', type:'category', options:['nourriture','transport','sorties','abonnements','materiel','autre'], default:'autre'}, {name:'amount', label:'Montant', type:'number', min:0, default:0}, {name:'date', label:'Date', type:'date', default:todayISO()}, {name:'notes', label:'Notes', type:'textarea'}]
  });
}


function cardView(card, state, mode='cards') {
  const owned = (state.unlocked_cards || []).includes(card.id);
  const equipped = (state.equipped_cards || []).includes(card.id);
  const boost = getCardBoost(card, state);
  return `<article class="reward-card card-collectible ${owned ? 'owned' : 'locked'} ${RARITY[card.rarity]?.className || ''}" data-card-state="${equipped ? 'equipped' : owned ? 'owned' : 'locked'}" data-card-rarity="${escapeHtml(card.rarity || 'common')}" data-card-name="${escapeHtml(String(card.name || '').toLowerCase())}">
    <div class="card-art"><span>${escapeHtml(card.icon || '🃏')}</span></div>
    <div class="item-head"><div><p class="eyebrow">Carte · ${escapeHtml(card.category || 'collection')}</p><h3>${escapeHtml(owned ? card.name : 'Carte inconnue')}</h3></div>${rarityBadge(card.rarity)}</div>
    <p class="muted">${escapeHtml(owned ? (card.description || '') : (card.condition_hint || 'Condition inconnue.'))}</p>
    ${card.boost_value ? `<div class="boost-line">${card.rarity === 'legendary' ? 'Boost saison' : card.rarity === 'secret' || card.rarity === 'celestial' ? 'Boost permanent' : 'Boost actif'} : +${card.boost_value}% XP${boost ? ` · actif +${boost}%` : ''}</div>` : ''}
    <div class="meta-row">${owned ? badge(equipped ? 'Équipée' : 'Débloquée', equipped ? 'green' : '') : badge('Verrouillée')}</div>
    ${owned ? `<button class="mini-btn" data-equip-card="${card.id}">${equipped ? 'Retirer' : 'Équiper'}</button>${card.rarity === 'legendary' && card.boost_value ? `<button class="mini-btn" data-reactivate-card="${card.id}">Activer boost saison · ${LEGENDARY_REACTIVATE_COST} tickets</button>` : ''}` : ''}
  </article>`;
}
function activeCompanionCards(state) {
  return (state.equipped_companions || []).map(rewardById).filter(Boolean);
}
function companionBubbleText(companions) {
  if (!companions.length) return 'Aucun compagnon actif.';
  if (companions.length === 1) return companions[0].phrase || 'Prêt pour la prochaine mission.';
  const names = companions.map(c => c.name).join(' + ');
  return `${names} discutent dans le QG : "On garde le cap, mission par mission."`;
}
async function renderQG(container) {
  const stats = await getGameStats();
  const state = await ensureGameState();
  const companions = activeCompanionCards(state);
  const season = currentSeason(stats);
  container.innerHTML = `<section class="hero soft-card game-panel qg-hero"><p class="eyebrow">QG personnel</p><h3>Base niveau ${stats.level}</h3><p class="muted">Ton bureau évolutif : progression, compagnons, saison active, tickets et mission du jour.</p></section>
    <section class="qg-room card">
      <div class="qg-screen"><p class="eyebrow">Système</p><h3>${stats.xp} XP · +${stats.boostPercent || 0}% boost</h3>${progressHtml(stats.levelPercent)}</div>
      <div class="qg-desk">${companions.map(c => `<div class="pet-avatar pet-${escapeHtml(c.value)}" title="${escapeHtml(c.name)}"><span>${companionIcon(c.value)}</span><small>${escapeHtml(c.name)}</small></div>`).join('') || '<div class="pet-avatar"><span>🤖</span><small>Aucun</small></div>'}</div>
      <div class="qg-chat"><strong>Compagnons</strong><p class="muted">${escapeHtml(companionBubbleText(companions))}</p></div>
    </section>
    <section class="grid-3"><article class="feature-card"><span class="badge teal">Tickets</span><strong>${state.tickets || 0}</strong><p class="muted">Monnaie gratuite de l’appli.</p></article><article class="feature-card"><span class="badge orange">${escapeHtml(season.name)}</span><strong>${Math.round(season.percent)}%</strong><p class="muted">${escapeHtml(season.months || '')}</p></article><article class="feature-card"><span class="badge purple">Slots</span><strong>${(state.equipped_cards || []).length}/6 cartes</strong><p class="muted">${(state.equipped_companions || []).length}/${companionSlotLimit(state)} compagnons.</p></article></section>`;
}
function companionIcon(value) {
  const pet = rewardCatalog().find(r => r.type === 'companion' && r.value === value);
  if (pet?.icon) return pet.icon;
  return ({ robot:'🤖', terminal:'💾', cube:'🧊', drone:'🚁', pixel:'👾', holo:'🧬', arcade_cat:'🐱', study_owl:'🦉', pocket_ai:'📱', ninja:'🥷', dragon:'🐉', cyber_fox:'🦊', samurai_bot:'🤖', neon_specter:'👻', oracle:'🔮', quantum_raven:'🐦‍⬛', guardian_qg:'🛡️', '404':'❔', glitch:'🕳️', celestial:'🌌' }[value] || '🤖');
}
async function renderCardsPage(container) {
  const state = await ensureGameState();
  const cards = await loadRewardCards();
  const grouped = groupByRarity(cards);
  container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Cartes bonus</p><h3>${(state.unlocked_cards || []).length}/${cards.length} cartes · ${(state.equipped_cards || []).length}/${CARD_SLOT_LIMIT} équipées</h3><p class="muted">Les cartes ne sont jamais vendues dans la boutique : elles se gagnent par les actions, le gacha, les codes et les saisons.</p></section>
    <section class="card collection-toolbar"><div class="filter-row"><button class="filter-chip active" data-card-filter="all">Toutes</button><button class="filter-chip" data-card-filter="owned">Débloquées</button><button class="filter-chip" data-card-filter="equipped">Équipées</button><button class="filter-chip" data-card-filter="locked">Verrouillées</button></div><div class="filter-row"><label class="compact-label">Rareté<select id="card-rarity-filter"><option value="all">Toutes</option>${RARITY_ORDER.map(r => `<option value="${r}">${RARITY[r].label}</option>`).join('')}</select></label><label class="compact-label">Recherche<input id="card-search-filter" placeholder="Nom d’une carte"></label></div></section>
    <div id="cards-groups">${grouped.map(g => `<section class="card card-rarity-group" data-rarity-group="${g.rarity}"><div class="item-head"><h3>${RARITY[g.rarity]?.label}</h3><span class="badge">${g.items.filter(c => (state.unlocked_cards || []).includes(c.id)).length}/${g.items.length}</span></div><div class="reward-grid">${g.items.map(c => cardView(c, state)).join('')}</div></section>`).join('')}</div>`;
  const filters = { state:'all', rarity:'all', search:'' };
  const applyFilters = () => {
    $$('.card-collectible', container).forEach(card => {
      const stateMatch = filters.state === 'all' || card.dataset.cardState === filters.state || (filters.state === 'owned' && ['owned','equipped'].includes(card.dataset.cardState));
      const rarityMatch = filters.rarity === 'all' || card.dataset.cardRarity === filters.rarity;
      const searchMatch = !filters.search || (card.dataset.cardName || '').includes(filters.search);
      card.classList.toggle('hidden', !(stateMatch && rarityMatch && searchMatch));
    });
    $$('.card-rarity-group', container).forEach(group => group.classList.toggle('hidden', !group.querySelector('.card-collectible:not(.hidden)')));
  };
  $$('[data-card-filter]', container).forEach(btn => btn.addEventListener('click', () => { $$('[data-card-filter]', container).forEach(x => x.classList.remove('active')); btn.classList.add('active'); filters.state = btn.dataset.cardFilter; applyFilters(); }));
  $('#card-rarity-filter')?.addEventListener('change', e => { filters.rarity = e.target.value; applyFilters(); });
  $('#card-search-filter')?.addEventListener('input', e => { filters.search = String(e.target.value || '').trim().toLowerCase(); applyFilters(); });
  $$('[data-equip-card]', container).forEach(btn => btn.addEventListener('click', () => equipCard(btn.dataset.equipCard)));
  $$('[data-reactivate-card]', container).forEach(btn => btn.addEventListener('click', () => reactivateLegendary(btn.dataset.reactivateCard, true)));
}
async function renderCompanionsPage(container) {
  const state = await ensureGameState();
  const pets = await loadCompanions();
  const slots = companionSlotLimit(state);
  const grouped = groupByRarity(pets);
  container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Compagnons</p><h3>${(state.equipped_companions || []).length}/${slots} actifs</h3><p class="muted">Équipe deux compagnons. Un objet céleste peut débloquer un troisième slot. Tous restent visibles et rangés par rareté.</p></section>
    ${grouped.map(g => `<section class="card"><div class="item-head"><h3>${RARITY[g.rarity]?.label}</h3><span class="badge">${g.items.filter(p => (state.unlocked_rewards || []).includes(p.id)).length}/${g.items.length}</span></div><div class="reward-grid">${g.items.map(p => rewardCard(p, state, 'collection')).join('')}</div></section>`).join('')}`;
  $$('[data-equip-reward]', container).forEach(btn => btn.addEventListener('click', () => equipReward(btn.dataset.equipReward)));
  $$('[data-reactivate-boost]', container).forEach(btn => btn.addEventListener('click', () => reactivateLegendary(btn.dataset.reactivateBoost, false)));
}
async function renderCodexPage(container) {
  const state = await ensureGameState();
  const cards = await loadRewardCards();
  const stats = await getGameStats();
  container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Codex</p><h3>Encyclopédie Optimize</h3><p class="muted">Toutes tes découvertes : badges, cartes, titres, skins, compagnons, codes secrets et récompenses de saison.</p></section>
    <section class="stat-grid"><div class="stat-tile"><strong>${stats.badges.filter(b=>b.unlocked).length}/${stats.badges.length}</strong><span>Badges</span></div><div class="stat-tile"><strong>${(state.unlocked_cards||[]).length}/${cards.length}</strong><span>Cartes</span></div><div class="stat-tile"><strong>${(state.unlocked_rewards||[]).length}/${rewardCatalog().length}</strong><span>Récompenses</span></div><div class="stat-tile"><strong>${(state.used_secret_codes||[]).length}</strong><span>Codes utilisés</span></div></section>
    <section class="card"><h3>Codes secrets équilibrés</h3><p class="muted">Les codes intégrés restent équilibrés. Les récompenses rares, secrètes et célestes gardent une vraie valeur de progression.</p><form id="secret-code-form" class="form-grid"><label>Entrer un code<input name="code" placeholder="ex : START, KARATE, NOCTURNE"></label><button class="primary-btn">Tester le code</button></form></section>
    <section class="card"><h3>Badges</h3>${badgeGrid(stats)}</section>`;
  $('#secret-code-form')?.addEventListener('submit', async e => { e.preventDefault(); await redeemSecretCode(e.target.code.value); e.target.reset(); });
}
async function renderCollectionV25(container) {
  const stats = await getGameStats();
  const state = await ensureGameState();
  const categories = [
    { key:'theme', label:'Thèmes', icon:'🎨', types:['theme'] },
    { key:'title', label:'Titres', icon:'🏷️', types:['title','title_slot'] },
    { key:'animation', label:'Animations', icon:'✨', types:['animation'] },
    { key:'companion', label:'Compagnons', icon:'🤖', types:['companion'] }
  ];
  container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Inventaire de récompenses</p><h3>${state.tickets || 0} tickets · ${rewardCatalog().filter(item => (state.unlocked_rewards || []).includes(item.id)).length}/${rewardCatalog().length} récompenses</h3><p class="muted">Tous les thèmes, titres, animations et compagnons sont visibles, même verrouillés. Les récompenses saisonnières sont récupérables uniquement pendant leur saison.</p></section>
    <section class="card"><h3>Équipement actif</h3><div class="equipment-grid"><div><strong>Thème</strong><p>${escapeHtml(rewardDisplayNameByValue('theme', state.equipped_theme))}</p></div><div><strong>Titres</strong><p>${escapeHtml(state.equipped_title)}${state.equipped_title_2 ? '<br>'+escapeHtml(state.equipped_title_2) : ''}</p></div><div><strong>Animation</strong><p>${escapeHtml(rewardDisplayNameByValue('animation', state.equipped_animation))}</p></div><div><strong>Boost XP</strong><p>+${stats.boostPercent || 0}% actif</p></div></div></section>
    <section class="card collection-toolbar"><div class="filter-row"><button class="filter-chip active" data-collection-filter="all">Tout afficher</button>${categories.map(c => `<button class="filter-chip" data-collection-filter="${c.key}">${c.icon} ${c.label}</button>`).join('')}</div></section>
    <div id="collection-sections">${categories.map(category => {
      const items = sortByRarityThenName(rewardCatalog().filter(r => category.types.includes(r.type)));
      const rarityGroups = groupByRarity(items);
      const ownedCount = items.filter(i => (state.unlocked_rewards || []).includes(i.id)).length;
      return `<section class="card collection-section" data-collection-section="${category.key}"><div class="item-head"><div><p class="eyebrow">${category.icon} Collection</p><h3>${category.label}</h3></div><span class="badge">${ownedCount}/${items.length}</span></div>${rarityGroups.map(group => `<div class="rarity-subsection"><div class="rarity-subhead"><strong>${RARITY[group.rarity]?.label}</strong><span>${group.items.filter(i => (state.unlocked_rewards || []).includes(i.id)).length}/${group.items.length}</span></div><div class="reward-grid">${group.items.map(item => rewardCard(item, state, 'collection')).join('')}</div></div>`).join('')}</section>`;
    }).join('')}</div>
    <section class="card"><h3>Badges</h3>${badgeGrid(stats)}</section>`;
  $$('[data-collection-filter]', container).forEach(btn => btn.addEventListener('click', () => {
    $$('[data-collection-filter]', container).forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const value = btn.dataset.collectionFilter;
    $$('.collection-section', container).forEach(section => section.classList.toggle('hidden', value !== 'all' && section.dataset.collectionSection !== value));
  }));
  $$('[data-equip-reward]', container).forEach(btn => btn.addEventListener('click', () => equipReward(btn.dataset.equipReward)));
  $$('[data-reactivate-boost]', container).forEach(btn => btn.addEventListener('click', () => reactivateLegendary(btn.dataset.reactivateBoost, false)));
  $$('[data-claim-seasonal]', container).forEach(btn => btn.addEventListener('click', () => claimSeasonalReward(btn.dataset.claimSeasonal)));
}
async function renderGachaV25(container) {
  const stats = await getGameStats();
  const state = await ensureGameState();
  if (stats.level < GACHA_UNLOCK_LEVEL) {
    container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Gacha verrouillé</p><h3>Niveau ${GACHA_UNLOCK_LEVEL} requis</h3><p class="muted">Tu es niveau ${stats.level}. Ajoute quelques tâches/objectifs pour débloquer rapidement le gacha.</p></section>`;
    return;
  }
  const canPull = Number(state.tickets || 0) >= GACHA_COST;
  container.innerHTML = `<section class="hero soft-card game-panel gacha-hero"><p class="eyebrow">Gacha gratuit</p><h3>${state.tickets || 0} tickets disponibles</h3><p class="muted">Un tirage coûte ${GACHA_COST} tickets. Aucun argent réel. Les secrets sont puissants, les célestes sont mythiques.</p><button class="primary-btn big-action" id="gacha-pull" ${canPull ? '' : 'disabled'}>Tirage · ${GACHA_COST} tickets</button></section>
    <section class="grid-2"><article class="card"><h3>Taux de rareté</h3><div class="list">${Object.entries(RARITY).map(([k,v]) => `<div class="list-item"><span>${rarityBadge(k)}</span><strong>${v.weight}%</strong></div>`).join('')}</div></article><article class="card"><h3>Objets possibles</h3><p class="muted">Skins, titres, animations, compagnons et cartes bonus. Les codes visibles restent limités à commun/rare. Gacha accessible dès le niveau ${GACHA_UNLOCK_LEVEL}.</p></article></section>`;
  $('#gacha-pull')?.addEventListener('click', async () => {
    let s = await ensureGameState();
    if (Number(s.tickets || 0) < GACHA_COST) return showToast('Pas assez de tickets.');
    const prize = await weightedRandomPrize(s);
    s.tickets = Number(s.tickets || 0) - GACHA_COST;
    await saveGameState(s);
    if (!prize) { showToast('Collection déjà complète.'); return app.showPage('gacha'); }
    if (prize.kind === 'reward') await unlockReward(prize.item, 'Tirage gacha :'); else await unlockCard(prize.item, 'Tirage gacha :');
    showToast(`Tu as obtenu : ${prize.item.name} !`);
    await app.showPage('gacha');
  });
}
async function renderShopV25(container) {
  const stats = await getGameStats();
  const state = await ensureGameState();
  if (stats.level < SHOP_UNLOCK_LEVEL) {
    container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Boutique verrouillée</p><h3>Niveau ${SHOP_UNLOCK_LEVEL} requis</h3><p class="muted">Le gacha arrive tôt, mais la boutique s’ouvre plus tard pour garder une vraie progression.</p></section>`;
    return;
  }
  const categories = [
    { type:'theme', label:'Thèmes' }, { type:'title', label:'Titres' }, { type:'animation', label:'Animations' }, { type:'companion', label:'Compagnons' }
  ];
  const shopItems = rewardCatalog().filter(isShopEligible);
  container.innerHTML = `<section class="hero soft-card game-panel"><p class="eyebrow">Boutique gratuite</p><h3>${state.tickets || 0} tickets</h3><p class="muted">Aucun objet achetable ne coûte 0 ticket. Les cartes, récompenses saisonnières, secrets et célestes se gagnent ailleurs.</p></section>${categories.map(category => {
    const items = sortByRarityThenName(shopItems.filter(item => item.type === category.type)).sort((a,b) => Number(a.price) - Number(b.price));
    if (!items.length) return '';
    return `<section class="card shop-section"><div class="item-head"><h3>${category.label}</h3><span class="badge">${items.length} objet(s)</span></div><div class="reward-grid">${items.map(item => rewardCard(item, state, 'shop')).join('')}</div></section>`;
  }).join('')}`;
  $$('[data-buy-reward]', container).forEach(btn => btn.addEventListener('click', async () => {
    const reward = rewardById(btn.dataset.buyReward); let s = await ensureGameState();
    if (!isShopEligible(reward)) return showToast('Objet non disponible en boutique.');
    if ((s.unlocked_rewards || []).includes(reward.id)) return showToast('Déjà obtenu.');
    const price = Number(reward.price);
    if (!Number.isFinite(price) || price <= 0) return showToast('Prix invalide : achat bloqué.');
    if (Number(s.tickets || 0) < price) return showToast('Pas assez de tickets.');
    s.tickets = Number(s.tickets || 0) - price;
    await saveGameState(s);
    await unlockReward(reward, 'Achat boutique :');
    await app.showPage('shop');
  }));
}
async function renderSeasonsV25(container) {
  const stats = await getGameStats();
  const state = await ensureGameState();
  const season = currentSeason(stats);
  const physical = physicalSeasonId();
  const seasonalRewards = sortByRarityThenName(rewardCatalog().filter(r => r.seasonal));
  const upcoming = ['winter_rewards','focus_mode','spring_upgrade','creative_summer','new_game_plus','build_season','deep_work'].map(seasonDefinition);
  container.innerHTML = `<section class="hero soft-card game-panel seasonal-hero"><p class="eyebrow">Saison active</p><h3>${PHYSICAL_SEASONS[physical].icon} ${PHYSICAL_SEASONS[physical].label}</h3><p class="muted">${escapeHtml(PHYSICAL_SEASONS[physical].months)} · récupère les éléments exclusifs avant le changement de saison.</p></section>
    <section class="card"><div class="item-head"><div><h3>Récompenses saisonnières</h3><p class="muted">Elles sont toutes visibles. Seules celles de la saison active peuvent être récupérées gratuitement.</p></div><span class="badge green">${PHYSICAL_SEASONS[physical].label}</span></div><div class="reward-grid">${seasonalRewards.map(item => rewardCard(item, state, 'collection')).join('')}</div></section>
    <section class="card"><div class="item-head"><div><h3>Progression ${escapeHtml(season.name)}</h3><p class="muted">${escapeHtml(season.months)} · ${escapeHtml(season.desc)}</p></div><span class="badge orange">${season.points}/${season.target}</span></div>${progressHtml(season.percent)}</section>
    <section class="grid-3">${upcoming.map(s => `<article class="feature-card ${s.id === season.id ? 'season-active' : ''}"><span class="badge ${s.id === season.id ? 'green' : ''}">${escapeHtml(s.months)}</span><strong>${escapeHtml(s.name)}</strong><p class="muted">${escapeHtml(s.desc)}</p></article>`).join('')}</section>`;
  $$('[data-claim-seasonal]', container).forEach(btn => btn.addEventListener('click', () => claimSeasonalReward(btn.dataset.claimSeasonal)));
  $$('[data-equip-reward]', container).forEach(btn => btn.addEventListener('click', () => equipReward(btn.dataset.equipReward)));
}
Object.assign(pageRenderers, {
  qg: renderQG,
  cards: renderCardsPage,
  companions: renderCompanionsPage,
  codex: renderCodexPage,
  collection: renderCollectionV25,
  gacha: renderGachaV25,
  shop: renderShopV25,
  seasons: renderSeasonsV25
});

function confetti(variant='classic') {
  const layer = $('#confetti-layer');
  const palettes = { classic:['#4faaa2','#214f71','#ed9b5f','#ef8069','#7da85b','#8667a8'], pixel:['#30d158','#0a84ff','#ff9f0a','#ff375f'], stars:['#ffe082','#ffcc33','#7dd3fc','#c084fc'], holo:['#8be9fd','#bd93f9','#50fa7b','#ff79c6'], mission:['#4faaa2','#ed9b5f','#f8d66d','#214f71'], glitch:['#ff2d95','#00e5ff','#f8d66d','#7f5cff'], ripple:['#4faaa2','#214f71','#dcebf2'], soft:['#7dd3fc','#c4b5fd','#a7f3d0'], wave:['#38bdf8','#0ea5e9','#e0f2fe'], splash:['#38bdf8','#7dd3fc','#fef3c7'], scanline:['#22d3ee','#67e8f9','#a7f3d0'], portal:['#c084fc','#60a5fa','#22d3ee'], thunder:['#fde047','#f8fafc','#60a5fa'], matrix:['#22c55e','#86efac','#14532d'], celestial:['#fde68a','#c084fc','#67e8f9'], petals:['#f9a8d4','#fbcfe8','#86efac'], leaves:['#f59e0b','#b45309','#facc15'], snow:['#ffffff','#bae6fd','#e0f2fe'] };
  const colors = palettes[variant] || palettes.classic;
  for (let i = 0; i < 42; i++) {
    const bit = document.createElement('span');
    bit.className = `confetti confetti-${variant}`;
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = colors[Math.floor(Math.random() * colors.length)];
    bit.style.animationDelay = `${Math.random() * 0.28}s`;
    bit.style.transform = `rotate(${Math.random()*360}deg)`;
    layer.appendChild(bit);
    setTimeout(() => bit.remove(), 2400);
  }
}

document.addEventListener('DOMContentLoaded', () => app.init());
