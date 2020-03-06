# Outils

## Roadmap

`🎯 Prévu`, `🚧 En cours`, `🎉 Terminé`

| Outils                    | Status       | Livraison   |
| ------------------------- | ------------ | ----------- |
| **Memory**                | `🚧 En cours` | `20 mars`   |
| **Chrono**                | `🚧 En cours` | `20 mars`   |
| **Cardiaque**             | `🚧 En cours` | `20 mars`   |
| **Portitions de la main** | `🎯 Prévu`    | `à definir` |
| **Vidéos**                | `🚧 En cours` | `20 mars`   |

## Installation

Le projet utilise yarn pour la gestion des différents projet avec les [`workspaces`](https://classic.yarnpkg.com/en/docs/workspaces/).

Pour installer toutes les dépendances :

```bash
yarn install
```

## Developpement

```bash
yarn dev
```

Lors du premier lancement du script `yarn dev`, on `link` le `global` avec tous les dossiers présents dans le dossier `projects`. Ce qui permet ensuite de pouvoir importer les fichiers présents dans le dossir `global` via `import { <name> } from '@optisantis/outil-global`.

### Urls

Pour accéder au `Hot Module Replacement` vous devez accéder à cette url :

`http://localhost:8089/projects/<project-name>/public/`

### Styles

```bash
# Créer un fichier tailwind.css dans global/
yarn css
```

Le css utilise la dépendance [`tailwind`](https://tailwindcss.com/), nous avons donc besoin de générer un fichier css contenant toutes les classes utilitaires nécessaires.

## Architecture

```
.
├── dist
├── global
│   ├── components
│   ├── context
│   ├── logics
│   ├── styles
│   └── type
├── node_modules
├── projects
│   ├── cardiaque
│   ├── chrono
│   └── memory
├── scripts
└── webpack
```

`global` contient tous les fichiers réutilisablent dans les différents `projects`.

`projects` contients tous les dossiers qui deviendrons un outils servis dans l'API via le dossier `public`.

