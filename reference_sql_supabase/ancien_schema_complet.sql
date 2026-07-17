-- ============================================================
-- OPTIMIZE — SQL COMPLET CONSOLIDÉ
-- Base + modules + gamification + cartes + compagnons + codes
-- Version de référence pour audit / correction par développeur
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- 1. PROFILS / UTILISATEURS
-- ============================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 2. MODULES PRINCIPAUX
-- ============================================================

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'autre',
  due_date date,
  is_day_task boolean not null default false,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'autre',
  color text,
  start timestamptz not null,
  "end" timestamptz not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'active',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  description text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  title text not null,
  status text not null default 'not_started',
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- ============================================================
-- 3. MODULES AJOUTÉS V2 / V3
-- ============================================================

create table if not exists public.objectives (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  scope text not null default 'jour',
  priority text not null default 'moyenne',
  status text not null default 'not_started',
  deadline date,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.homework (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text,
  title text not null,
  due_date date,
  urgency text not null default 'moyenne',
  estimated_time text,
  status text not null default 'todo',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'autre',
  status text not null default 'brute',
  pinned boolean not null default false,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.budget_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  type text not null default 'expense',
  category text not null default 'autre',
  amount numeric not null default 0,
  date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.deadlines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'examen',
  datetime timestamptz,
  importance text not null default 'haute',
  preparation text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.course_followups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null,
  last_lesson text,
  catchup text,
  exercises text,
  understanding text not null default 'moyen',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text,
  status text not null default 'a_faire',
  deadline date,
  link text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.site_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  category text not null default 'site',
  pinned boolean not null default false,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.progress_journal (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date,
  category text not null default 'cours',
  mood text not null default 'bien',
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'perso',
  estimated_price numeric not null default 0,
  priority text not null default 'moyenne',
  status text not null default 'a_acheter',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'code',
  level text not null default 'debutant',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  objective text,
  actions text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  role text,
  email text,
  phone text,
  category text not null default 'autre',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.creative_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  type text not null default 'youtube',
  status text not null default 'idee',
  idea text,
  steps text,
  link text,
  last_modified date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.personal_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  date date,
  time text,
  location text,
  category text not null default 'perso',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null default 'tech',
  condition text not null default 'bon',
  location text,
  estimated_price numeric not null default 0,
  purchase_date date,
  status text not null default 'utilise',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- ============================================================
-- 4. ÉTAT DE JEU / XP / TICKETS
-- ============================================================

create table if not exists public.game_state (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tickets integer not null default 0,
  unlocked_rewards jsonb not null default '[]'::jsonb,
  unlocked_cards jsonb not null default '[]'::jsonb,
  equipped_theme text not null default 'classic',
  equipped_title text not null default 'Apprenti Organisé',
  equipped_title_2 text,
  equipped_animation text not null default 'classic',
  equipped_cards jsonb not null default '[]'::jsonb,
  equipped_companions jsonb not null default '[]'::jsonb,
  active_legendary_boosts jsonb not null default '[]'::jsonb,
  used_secret_codes jsonb not null default '[]'::jsonb,
  claimed_level integer not null default 1,
  claimed_daily_date text,
  claimed_daily_ids jsonb not null default '[]'::jsonb,
  mission_date text,
  mission_claimed boolean not null default false,
  notifications jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

alter table public.game_state add column if not exists unlocked_cards jsonb not null default '[]'::jsonb;
alter table public.game_state add column if not exists equipped_title_2 text;
alter table public.game_state add column if not exists equipped_cards jsonb not null default '[]'::jsonb;
alter table public.game_state add column if not exists equipped_companions jsonb not null default '[]'::jsonb;
alter table public.game_state add column if not exists active_legendary_boosts jsonb not null default '[]'::jsonb;
alter table public.game_state add column if not exists used_secret_codes jsonb not null default '[]'::jsonb;

-- ============================================================
-- 5. CARTES
-- ============================================================

create table if not exists public.reward_cards (
  id text primary key,
  name text not null,
  rarity text not null default 'common',
  category text not null default 'general',
  description text,
  condition_hint text,
  boost_type text default 'global',
  boost_value numeric not null default 0,
  season text not null default 'permanent',
  icon text default '🃏',
  active boolean not null default true,
  unlocks text,
  price integer not null default 0,
  gacha_only boolean not null default false,
  value text,
  boost_scope text not null default 'equipped',
  starter boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

alter table public.reward_cards add column if not exists price integer not null default 0;
alter table public.reward_cards add column if not exists gacha_only boolean not null default false;
alter table public.reward_cards add column if not exists value text;
alter table public.reward_cards add column if not exists boost_scope text not null default 'equipped';
alter table public.reward_cards add column if not exists starter boolean not null default false;

create table if not exists public.user_reward_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null references public.reward_cards(id) on delete cascade,
  source text not null default 'gacha',
  obtained_at timestamptz not null default now(),
  equipped boolean not null default false,
  unique(user_id, card_id)
);

-- ============================================================
-- 6. COMPAGNONS
-- ============================================================

create table if not exists public.companions (
  id text primary key,
  name text not null,
  rarity text not null default 'common',
  family text not null default 'robot',
  description text,
  phrase text,
  boost_type text default 'global',
  boost_value numeric not null default 0,
  season text not null default 'permanent',
  icon text default '🤖',
  active boolean not null default true,
  unlocks text,
  price integer not null default 0,
  gacha_only boolean not null default false,
  value text,
  boost_scope text not null default 'equipped',
  starter boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

alter table public.companions add column if not exists price integer not null default 0;
alter table public.companions add column if not exists gacha_only boolean not null default false;
alter table public.companions add column if not exists value text;
alter table public.companions add column if not exists boost_scope text not null default 'equipped';
alter table public.companions add column if not exists starter boolean not null default false;

create table if not exists public.user_companions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  companion_id text not null references public.companions(id) on delete cascade,
  source text not null default 'gacha',
  obtained_at timestamptz not null default now(),
  equipped boolean not null default false,
  unique(user_id, companion_id)
);

-- ============================================================
-- 7. CODES SECRETS / CODES DE RÉCOMPENSE
-- ============================================================

create table if not exists public.secret_codes (
  code text primary key,
  label text,
  message text,
  reward_type text not null default 'tickets',
  reward_id text,
  tickets integer not null default 0,
  min_level integer not null default 1,
  max_uses integer,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.user_secret_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  code text not null references public.secret_codes(code) on delete cascade,
  claimed_at timestamptz not null default now(),
  reward_type text,
  reward_id text,
  tickets integer not null default 0,
  unique(user_id, code)
);

-- ============================================================
-- 8. RLS — SÉCURITÉ DES TABLES UTILISATEUR
-- ============================================================

alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
drop policy if exists profiles_insert_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;

create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);

create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

do $$
declare
  t text;
begin
  foreach t in array array[
    'tasks',
    'events',
    'projects',
    'subjects',
    'topics',
    'objectives',
    'homework',
    'ideas',
    'budget_entries',
    'deadlines',
    'course_followups',
    'documents',
    'site_links',
    'progress_journal',
    'purchases',
    'skills',
    'contacts',
    'creative_projects',
    'personal_events',
    'inventory_items',
    'game_state',
    'user_reward_cards',
    'user_companions',
    'user_secret_codes'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop policy if exists %I on public.%I', t || '_select_own', t);
    execute format('drop policy if exists %I on public.%I', t || '_insert_own', t);
    execute format('drop policy if exists %I on public.%I', t || '_update_own', t);
    execute format('drop policy if exists %I on public.%I', t || '_delete_own', t);

    execute format(
      'create policy %I on public.%I for select using (auth.uid() = user_id)',
      t || '_select_own',
      t
    );

    execute format(
      'create policy %I on public.%I for insert with check (auth.uid() = user_id)',
      t || '_insert_own',
      t
    );

    execute format(
      'create policy %I on public.%I for update using (auth.uid() = user_id) with check (auth.uid() = user_id)',
      t || '_update_own',
      t
    );

    execute format(
      'create policy %I on public.%I for delete using (auth.uid() = user_id)',
      t || '_delete_own',
      t
    );
  end loop;
end $$;

-- ============================================================
-- 9. RLS — TABLES PUBLIQUES DE CATALOGUE
-- ============================================================

alter table public.reward_cards enable row level security;
alter table public.companions enable row level security;
alter table public.secret_codes enable row level security;

drop policy if exists reward_cards_select_active on public.reward_cards;
create policy reward_cards_select_active on public.reward_cards
  for select using (active = true);

drop policy if exists companions_select_active on public.companions;
create policy companions_select_active on public.companions
  for select using (active = true);

drop policy if exists secret_codes_select_active on public.secret_codes;
create policy secret_codes_select_active on public.secret_codes
  for select using (active = true);

-- ============================================================
-- 10. CODES PUBLICS DE BASE
-- ============================================================

insert into public.secret_codes
(code, label, message, reward_type, reward_id, tickets, min_level, active, expires_at)
values
('START', 'Code de départ', 'Démarrage validé : carte commune + 1 ticket.', 'card', 'card_first_steps', 1, 1, true, null),
('KARATE', 'Esprit combatif', 'Esprit combatif : + 1 ticket.', 'tickets', null, 1, 1, true, null),
('PIXEL', 'Signal pixel', 'Signal pixel : compagnon rare débloqué.', 'companion', 'pet_pixel_slime', 1, 1, true, null),
('DEBUG', 'Debug prudent', 'Débugueur prudent : petit bonus commun.', 'companion', 'pet_green_terminal', 1, 1, true, null),
('OPTIMIZE', 'Utilisateur curieux', 'Utilisateur curieux : titre rare débloqué.', 'title', 'title_planner', 1, 1, true, null),
('HUB', 'Portail actif', 'Carte Hub Starter + 1 ticket.', 'card', 'card_site_seed', 1, 1, true, null),
('STUDIO', 'Studio créatif', 'Carte créative rare + 1 ticket.', 'card', 'card_youtube_mind', 1, 1, true, null),
('BUDGET', 'Budget propre', 'Carte budget commune + 1 ticket.', 'card', 'card_budget_coin', 1, 1, true, null),
('404', 'Erreur repérée', 'Erreur repérée : carte tech rare + 1 ticket.', 'card', 'card_404_echo', 1, 1, true, null)
on conflict (code) do update set
  label = excluded.label,
  message = excluded.message,
  reward_type = excluded.reward_type,
  reward_id = excluded.reward_id,
  tickets = excluded.tickets,
  min_level = excluded.min_level,
  active = excluded.active,
  expires_at = excluded.expires_at,
  updated_at = now();

-- ============================================================
-- 11. CARTES NOMMÉES IMPORTANTES
-- ============================================================

insert into public.reward_cards
(id, name, rarity, category, description, condition_hint, boost_type, boost_value, season, icon, active, unlocks, price, gacha_only, value, boost_scope, starter)
values
('card_first_steps','Premiers Pas','common','progression','La première carte de progression Optimize.','Obtenue au démarrage ou par code.','global',0,'permanent','👣',true,null,0,false,'card_first_steps','equipped',true),
('card_morning_start','Départ du Matin','common','life','Une carte pour ceux qui lancent leur journée proprement.','Ouvre Optimize et prépare ta journée.','global',0,'permanent','🌅',true,null,0,false,'card_morning_start','equipped',false),
('card_clean_checklist','Checklist Claire','common','organisation','Une checklist bien tenue évite le chaos.','Ajoute et termine des tâches simples.','tasks',0,'permanent','📝',true,null,0,false,'card_clean_checklist','equipped',false),
('card_site_seed','Premier Portail','common','tech','Tu relies ton univers numérique.','Ajoute un premier site dans le Hub.','tech',0,'permanent','🌐',true,null,0,false,'card_site_seed','equipped',false),
('card_budget_coin','Première Pièce','common','budget','Tu commences à suivre ton argent.','Ajoute tes premières dépenses ou revenus.','budget',0,'permanent','🪙',true,null,0,false,'card_budget_coin','equipped',false),
('card_youtube_mind','YouTube Mind','rare','creative','Carte liée aux idées de vidéos, scripts, montages et miniatures.','Ajoute des idées autour de YouTube, montage ou vidéo.','creative',2,'permanent','🎥',true,null,35,false,'card_youtube_mind','equipped',false),
('card_html_builder','HTML Builder','rare','tech','Tu construis des pages et des interfaces.','Utilise des mots autour de HTML, CSS ou JS dans tes projets.','tech',2,'permanent','🧩',true,null,35,false,'card_html_builder','equipped',false),
('card_git_runner','Git Runner','rare','tech','Tu avances dans ton écosystème GitHub.','Ajoute plusieurs sites GitHub Pages.','tech',3,'permanent','🐙',true,null,45,false,'card_git_runner','equipped',false),
('card_deep_focus','Deep Focus','epic','organisation','Tu entres dans un vrai mode concentration.','Valide plusieurs objectifs importants.','global',5,'permanent','🎧',true,null,0,true,'card_deep_focus','equipped',false),
('card_creator_mode','Creator Mode','epic','creative','Ton espace créatif devient sérieux.','Crée plusieurs projets créatifs.','creative',5,'permanent','🎬',true,null,0,true,'card_creator_mode','equipped',false),
('card_site_architect','Architecte Web','epic','tech','Tu construis un vrai réseau de sites.','Ajoute plusieurs sites et projets web.','tech',5,'permanent','🏛️',true,null,0,true,'card_site_architect','equipped',false),
('card_reset_protocol','Reset Protocol','legendary','season','Repartir proprement, avec méthode.','Liée aux périodes de nouveau départ.','global',10,'new_start','🔄',true,null,0,true,'card_reset_protocol','equipped',false),
('card_focus_forge','Forge du Focus','legendary','season','Tu transformes la discipline en puissance.','Carte saisonnière de concentration.','global',10,'winter','🔥',true,null,0,true,'card_focus_forge','equipped',false),
('card_hidden_console','Console Cachée','secret','secret','Une carte pour ceux qui aiment chercher derrière l’interface.','Liée aux signes cachés, au code et aux patterns.','tech',10,'permanent','⌨️',true,null,0,true,'card_hidden_console','permanent',false),
('card_404_echo','Écho 404','secret','secret','Une erreur n’est pas toujours un échec.','Liée aux bugs, aux chemins perdus et aux signaux 404.','tech',12,'permanent','🚫',true,null,0,true,'card_404_echo','permanent',false),
('card_celestial_compiler','Compilateur Céleste','celestial','celestial','Une carte mythique pour ceux qui assemblent leur propre système.','Extrêmement rare.','tech',15,'permanent','💠',true,null,0,true,'card_celestial_compiler','permanent',false),
('card_origin_admin','Admin Originel','celestial','celestial','Récompense mythique du créateur et des comptes fondateurs.','Très rare, prestige pur.','global',15,'permanent','👑',true,'second_title_slot',0,true,'card_origin_admin','permanent',false)
on conflict (id) do update set
  name = excluded.name,
  rarity = excluded.rarity,
  category = excluded.category,
  description = excluded.description,
  condition_hint = excluded.condition_hint,
  boost_type = excluded.boost_type,
  boost_value = excluded.boost_value,
  season = excluded.season,
  icon = excluded.icon,
  active = excluded.active,
  unlocks = excluded.unlocks,
  price = excluded.price,
  gacha_only = excluded.gacha_only,
  value = excluded.value,
  boost_scope = excluded.boost_scope,
  starter = excluded.starter,
  updated_at = now();

-- ============================================================
-- 12. GÉNÉRATION DES 200 CARTES V4.1
-- ============================================================

do $$
declare
  i integer;
  r text;
  c text;
  b numeric;
  p integer;
  ico text;
begin
  for i in 1..200 loop
    r := case
      when i <= 80 then 'common'
      when i <= 135 then 'rare'
      when i <= 175 then 'epic'
      when i <= 190 then 'legendary'
      when i <= 198 then 'secret'
      else 'celestial'
    end;

    c := case
      when i % 10 = 0 then 'tech'
      when i % 10 = 1 then 'organisation'
      when i % 10 = 2 then 'creative'
      when i % 10 = 3 then 'study'
      when i % 10 = 4 then 'projects'
      when i % 10 = 5 then 'budget'
      when i % 10 = 6 then 'planning'
      when i % 10 = 7 then 'objectives'
      when i % 10 = 8 then 'gaming'
      else 'life'
    end;

    b := case r
      when 'common' then 0
      when 'rare' then 2
      when 'epic' then 5
      when 'legendary' then 10
      when 'secret' then 12
      else 15
    end;

    p := case r
      when 'common' then 12 + i
      when 'rare' then 30 + i
      else 0
    end;

    ico := case c
      when 'tech' then '💻'
      when 'organisation' then '📝'
      when 'creative' then '🎨'
      when 'study' then '📚'
      when 'projects' then '🚀'
      when 'budget' then '🪙'
      when 'planning' then '📆'
      when 'objectives' then '🎯'
      when 'gaming' then '🎮'
      else '✨'
    end;

    insert into public.reward_cards
    (id, name, rarity, category, description, condition_hint, boost_type, boost_value, season, icon, active, unlocks, price, gacha_only, value, boost_scope, starter)
    values
    (
      'card_v41_' || r || '_' || lpad(i::text, 3, '0'),
      initcap(replace(c, '_', ' ')) || ' #' || lpad(i::text, 3, '0'),
      r,
      c,
      'Carte V4.1 générée pour enrichir la collection Optimize.',
      'Obtenable via gacha, boutique, codes ou événements selon la logique du site.',
      c,
      b,
      case when r = 'legendary' and i % 4 = 0 then 'winter'
           when r = 'legendary' and i % 4 = 1 then 'spring'
           when r = 'legendary' and i % 4 = 2 then 'summer'
           when r = 'legendary' and i % 4 = 3 then 'autumn'
           else 'permanent'
      end,
      ico,
      true,
      case when r = 'celestial' then 'second_title_slot' else null end,
      p,
      case when r in ('epic','legendary','secret','celestial') then true else false end,
      'card_v41_' || r || '_' || lpad(i::text, 3, '0'),
      case when r in ('secret','celestial') then 'permanent' else 'equipped' end,
      false
    )
    on conflict (id) do update set
      name = excluded.name,
      rarity = excluded.rarity,
      category = excluded.category,
      description = excluded.description,
      condition_hint = excluded.condition_hint,
      boost_type = excluded.boost_type,
      boost_value = excluded.boost_value,
      season = excluded.season,
      icon = excluded.icon,
      active = excluded.active,
      unlocks = excluded.unlocks,
      price = excluded.price,
      gacha_only = excluded.gacha_only,
      value = excluded.value,
      boost_scope = excluded.boost_scope,
      starter = excluded.starter,
      updated_at = now();
  end loop;
end $$;

-- ============================================================
-- 13. COMPAGNONS NOMMÉS IMPORTANTS
-- ============================================================

insert into public.companions
(id, name, rarity, family, description, phrase, boost_type, boost_value, season, icon, active, unlocks, price, gacha_only, value, boost_scope, starter)
values
('pet_mini_bot','Mini Bot','common','robot','Petit robot simple et efficace.','Je note, je classe, je progresse.','global',0,'permanent','🤖',true,null,0,false,'pet_mini_bot','equipped',true),
('pet_pixel_slime','Slime Pixel','rare','pixel','Petit slime rétro et motivant.','Blob blob, objectif suivant.','global',2,'permanent','🟩',true,null,30,false,'pet_pixel_slime','equipped',false),
('pet_green_terminal','Terminal Vert','rare','tech','Un terminal old-school vivant.','> progression --run','tech',2,'permanent','💚',true,null,35,false,'pet_green_terminal','equipped',false),
('pet_github_octobot','Octobot GitHub','rare','tech','Un petit compagnon pour les projets web.','Commit mental effectué.','tech',3,'permanent','🐙',true,null,45,false,'pet_github_octobot','equipped',false),
('pet_cyber_wolf','Loup Cyber','epic','animal','Un loup numérique protecteur.','Je garde ta trajectoire.','global',5,'permanent','🐺',true,null,0,true,'pet_cyber_wolf','equipped',false),
('pet_code_mage','Mage du Code','epic','mage','Il lance des sorts sur les bugs.','Compilation magique réussie.','tech',5,'permanent','🧙‍♂️',true,null,0,true,'pet_code_mage','equipped',false),
('pet_oracle_gold','Oracle Doré','legendary','ai','Un oracle lumineux pour guider tes choix.','Je vois une meilleure route.','global',10,'permanent','🔮',true,null,0,true,'pet_oracle_gold','equipped',false),
('pet_guardian_core','Gardien du Noyau','legendary','guardian','Il protège le cœur de ton QG.','Le noyau est stable.','global',10,'permanent','🛡️',true,null,0,true,'pet_guardian_core','equipped',false),
('pet_glitch_rabbit','Lapin Glitch','secret','glitch','Il saute entre les bugs et les menus cachés.','Tu ne m’as pas vu passer.','global',10,'permanent','🐇',true,null,0,true,'pet_glitch_rabbit','permanent',false),
('pet_404_shadow','Ombre 404','secret','glitch','Une ombre qui vit dans les erreurs.','Chemin introuvable, récompense trouvée.','tech',12,'permanent','🕳️',true,null,0,true,'pet_404_shadow','permanent',false),
('pet_divine_core','Noyau Divin','celestial','origin','Un fragment vivant du cœur Optimize.','Le système reconnaît ton rang.','global',15,'permanent','💠',true,'third_companion_slot',0,true,'pet_divine_core','permanent',false),
('pet_origin_dragon','Dragon Originel','celestial','dragon','Dragon mythique lié à la première version du QG.','Je garde la source.','global',15,'permanent','🐉',true,'third_companion_slot',0,true,'pet_origin_dragon','permanent',false)
on conflict (id) do update set
  name = excluded.name,
  rarity = excluded.rarity,
  family = excluded.family,
  description = excluded.description,
  phrase = excluded.phrase,
  boost_type = excluded.boost_type,
  boost_value = excluded.boost_value,
  season = excluded.season,
  icon = excluded.icon,
  active = excluded.active,
  unlocks = excluded.unlocks,
  price = excluded.price,
  gacha_only = excluded.gacha_only,
  value = excluded.value,
  boost_scope = excluded.boost_scope,
  starter = excluded.starter,
  updated_at = now();

-- ============================================================
-- 14. GÉNÉRATION DES 100 COMPAGNONS V4.1
-- ============================================================

do $$
declare
  i integer;
  r text;
  f text;
  b numeric;
  p integer;
  ico text;
begin
  for i in 1..100 loop
    r := case
      when i <= 40 then 'common'
      when i <= 70 then 'rare'
      when i <= 88 then 'epic'
      when i <= 96 then 'legendary'
      when i <= 99 then 'secret'
      else 'celestial'
    end;

    f := case
      when i % 10 = 0 then 'robot'
      when i % 10 = 1 then 'pixel'
      when i % 10 = 2 then 'tech'
      when i % 10 = 3 then 'animal'
      when i % 10 = 4 then 'dragon'
      when i % 10 = 5 then 'holo'
      when i % 10 = 6 then 'guardian'
      when i % 10 = 7 then 'arcade'
      when i % 10 = 8 then 'glitch'
      else 'study'
    end;

    b := case r
      when 'common' then 0
      when 'rare' then 2
      when 'epic' then 5
      when 'legendary' then 10
      when 'secret' then 12
      else 15
    end;

    p := case r
      when 'common' then 15 + i
      when 'rare' then 35 + i
      else 0
    end;

    ico := case f
      when 'robot' then '🤖'
      when 'pixel' then '🟩'
      when 'tech' then '⌨️'
      when 'animal' then '🐺'
      when 'dragon' then '🐉'
      when 'holo' then '🔷'
      when 'guardian' then '🛡️'
      when 'arcade' then '🕹️'
      when 'glitch' then '👻'
      else '🦉'
    end;

    insert into public.companions
    (id, name, rarity, family, description, phrase, boost_type, boost_value, season, icon, active, unlocks, price, gacha_only, value, boost_scope, starter)
    values
    (
      'pet_v41_' || r || '_' || lpad(i::text, 3, '0'),
      initcap(f) || ' Companion #' || lpad(i::text, 3, '0'),
      r,
      f,
      'Compagnon V4.1 généré pour enrichir la collection Optimize.',
      'Progression détectée.',
      case when f in ('tech','pixel','glitch','study') then f else 'global' end,
      b,
      case when r = 'legendary' and i % 4 = 0 then 'winter'
           when r = 'legendary' and i % 4 = 1 then 'spring'
           when r = 'legendary' and i % 4 = 2 then 'summer'
           when r = 'legendary' and i % 4 = 3 then 'autumn'
           else 'permanent'
      end,
      ico,
      true,
      case when r = 'celestial' then 'third_companion_slot' else null end,
      p,
      case when r in ('epic','legendary','secret','celestial') then true else false end,
      'pet_v41_' || r || '_' || lpad(i::text, 3, '0'),
      case when r in ('secret','celestial') then 'permanent' else 'equipped' end,
      false
    )
    on conflict (id) do update set
      name = excluded.name,
      rarity = excluded.rarity,
      family = excluded.family,
      description = excluded.description,
      phrase = excluded.phrase,
      boost_type = excluded.boost_type,
      boost_value = excluded.boost_value,
      season = excluded.season,
      icon = excluded.icon,
      active = excluded.active,
      unlocks = excluded.unlocks,
      price = excluded.price,
      gacha_only = excluded.gacha_only,
      value = excluded.value,
      boost_scope = excluded.boost_scope,
      starter = excluded.starter,
      updated_at = now();
  end loop;
end $$;

-- ============================================================
-- 15. INDEX UTILES
-- ============================================================

create index if not exists idx_tasks_user_id on public.tasks(user_id);
create index if not exists idx_events_user_id on public.events(user_id);
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_site_links_user_id on public.site_links(user_id);
create index if not exists idx_reward_cards_rarity on public.reward_cards(rarity);
create index if not exists idx_companions_rarity on public.companions(rarity);
create index if not exists idx_user_reward_cards_user_id on public.user_reward_cards(user_id);
create index if not exists idx_user_companions_user_id on public.user_companions(user_id);
create index if not exists idx_secret_codes_active on public.secret_codes(active);

-- ============================================================
-- 16. VÉRIFICATION RAPIDE
-- ============================================================

select 'profiles' as table_name, count(*) as total from public.profiles
union all
select 'tasks', count(*) from public.tasks
union all
select 'projects', count(*) from public.projects
union all
select 'site_links', count(*) from public.site_links
union all
select 'reward_cards', count(*) from public.reward_cards
union all
select 'companions', count(*) from public.companions
union all
select 'secret_codes', count(*) from public.secret_codes;