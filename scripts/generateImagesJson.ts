import { readdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import chalk from 'chalk';

const pathToProjects = resolve(
    __dirname,
    '../projects/memory/public/assets/img'
);
const pathToAssets = resolve(
    __dirname,
    '../projects/memory/src/assets/images.json'
);
const json = {};

try {
    const getDirectoriesName = (path: string): string[] =>
        readdirSync(path, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

    const getFilesName = (path: string): string[] =>
        readdirSync(path, { withFileTypes: true }).map((dirent) => dirent.name);

    const categoriesNames = getDirectoriesName(pathToProjects);

    categoriesNames.forEach((name) => {
        json[name] = getFilesName(join(pathToProjects, name))
            .map((name) => name.split('.')[0])
            .sort((a, b) => Number(a) - Number(b))
            .map((id) => id + '.png');
    });

    writeFileSync(join(pathToAssets), JSON.stringify(json), {
        encoding: 'utf8',
    });

    console.log(chalk.green('Fichier images.json, mis à jour.'));
} catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
}
