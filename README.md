# Outils

## Roadmap

`🎯 Prévu`, `🚧 En cours`, `🎉 Terminé`

| Outils                    | Status       | Livraison   |
| ------------------------- | ------------ | ----------- |
| **Memory**                | `🚧 En cours` | `à definir` |
| **Chrono**                | `🚧 En cours` | `à definir` |
| **Cardiaque**             | `🚧 En cours` | `à definir` |
| **Portitions de la main** | `🎯 Prévu`    | `à definir` |

## Installation

Le projet utilise yarn pour la gestion des différents projet avec les [`workspaces`](https://classic.yarnpkg.com/en/docs/workspaces/).

Pour installer toutes les dépendances :

```bash
yarn install
```

### Link global package

Pour pouvoir utiliser les fichiers sources en dehors des projets, vous devez créer un `symlink` avec `npm`.

```bash
# <project-name> étant le nom du projet ciblé,
# faire cette manipulation pour chaques projet.

cd projects/<project-name> && npm link ../../global
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