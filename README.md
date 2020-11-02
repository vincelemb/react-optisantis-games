# Outils

## Roadmap

`🎯 Prévu`, `🚧 En cours`, `🎉 Terminé`

| Outils        | Status                      |
| ------------- | --------------------------- |
| **Memory**    | `🚧 écriture test unitaire` |
| **Chrono**    | `🚧 écriture test unitaire` |
| **Cardiaque** | `🚧 écriture test unitaire` |

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

Lors du premier lancement du script `yarn dev`, on `link` le `global` avec tous les dossiers présents dans le dossier `projects`. Ce qui permet ensuite de pouvoir importer les fichiers présents dans le dossier `global` via `import { <name> } from '@optisantis/outil-global`.

### Urls

Pour accéder au `Hot Module Replacement` vous devez accéder à cette url :

`http://localhost:8089/projects/<project-name>/public/`

### Styles

```bash
# Créer un fichier tailwind.css dans global/
yarn css
```

Le css utilise la dépendance [`tailwind`](https://tailwindcss.com/), nous avons donc besoin de générer un fichier css contenant toutes les classes utilitaires nécessaires.

### Images

Pour l'outil Memory, un fichier `images.json` est nécessaire pour la grille de jeux. Pour générer le fichier il vous suffit d'avoir un dossier avec des images dans `projects/memeory/public/assets/images`. Ensuite soit, lors de `yarn dev`, le fichier ce mettra à jour, soit vous pouvez forcer sa mise à jour avec :

```
yarn pckg:images
```

## Architecture

```
.
├── dist
├── global
├── node_modules
├── projects
├── scripts
└── webpack
```

`global` contient tous les fichiers réutilisablent dans les différents `projects`.

`projects` contients tous les dossiers qui deviendrons un outils servis dans l'API via le dossier `public`.
