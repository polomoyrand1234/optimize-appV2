# Optimize V4.5 — Univers visuel et sauvegardes locales

Cette version est une application locale mono-utilisateur, distribuable et **sans donnée personnelle préchargée**.

## Démarrage

Publie tout le dossier sur GitHub Pages, Netlify, Vercel ou un autre hébergeur statique. Pour tester sur PC, utilise de préférence **Live Server** dans VS Code ou un petit serveur local.

## Données

Au premier lancement, Optimize démarre vierge au niveau 1. Les données sont enregistrées dans `localStorage`, sous la clé `optimize_personal_v4_5`, uniquement dans le navigateur utilisé.

Si une ancienne installation V4.4 existe sur la même adresse, elle est migrée automatiquement vers la V4.5.

## Sauvegarde et transfert

Dans **Profil → Sauvegardes** :

- **Exporter une sauvegarde** télécharge un fichier JSON complet ;
- **Importer une sauvegarde** restaure une sauvegarde locale Optimize ou un ancien export Supabase ;
- l’import remplace les données présentes sur l’appareil concerné.

Conserve plusieurs fichiers datés dans un cloud, une clé USB ou un disque externe.

## Collection V4.5

- tous les thèmes, titres, animations et compagnons sont affichés, y compris lorsqu’ils sont verrouillés ;
- les cartes disposent de filtres par état, rareté et nom ;
- les thèmes modifient réellement les couleurs, les fonds et certains composants ;
- les animations modifient les clics et les transitions entre les pages ;
- les récompenses saisonnières reviennent au printemps, en été, en automne et en hiver ;
- le thème **Été Océan** ajoute une ambiance marine et une plage qui monte avec le défilement.

## Boutique

Aucun objet achetable ne peut coûter 0 ticket. Lorsqu’une ancienne sauvegarde contient un compagnon sans prix, Optimize lui attribue automatiquement un prix selon sa rareté. Les objets secrets, célestes et saisonniers ne sont pas vendus directement.

## Pages principales

- `index.html` : accueil ;
- `aujourdhui.html` : espace Aujourd’hui ;
- `organisation.html` : espace Organisation ;
- `progression.html` : espace Progression ;
- `profil.html` : profil, paramètres et sauvegardes.

Le dossier `reference_sql_supabase` est conservé uniquement comme archive technique de l’ancien fonctionnement. Il n’est jamais exécuté par l’application.
