# Outils

## Roadmap

`🎯 Prévu`, `🚧 En cours`, `🎉 Terminé`

| Outils                    | Status        | Livraison   |
| ------------------------- | ------------- | ----------- |
| **Memory**                | `🚧 En cours` | `20 mars`   |
| **Chrono**                | `🚧 En cours` | `20 mars`   |
| **Cardiaque**             | `🚧 En cours` | `20 mars`   |
| **Portitions de la main** | `🎯 Prévu`    | `à definir` |

## Installation

Le projet utilise yarn pour la gestion des différents projet avec les [`workspaces`](https://classic.yarnpkg.com/en/docs/workspaces/).

Pour installer toutes les dépendances :

```bash
yarn install
```

### Link global package

Pour pouvoir utiliser les fichiers sources en dehors des projets, vous devez créer un `symlink` avec le dossier `global`.

```bash
# Créer un symlink pour tous les dossier présents dans `projects/`.
yarn pckg:link
```

## Developpement

```bash
yarn dev
```

### Urls

Pour accéder au `Hot Module Replacement` vous devez accéder à cette url :

`http://localhost:8089/projects/<project-name>/public/`

## Production

```bash
yarn build
```

## Styles

```bash
# Créer un fichier tailwind.css dans global/
yarn css
```

Le css utilise la dépendance [`tailwind`](https://tailwindcss.com/), nous avons donc besoin de générer un fichier css contenant toutes les classes utilitaires nécessaires.