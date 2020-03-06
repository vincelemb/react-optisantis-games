import { readdirSync } from 'fs';
import { resolve } from 'path';
import { exec } from 'child_process';
import chalk from 'chalk';

const pathToProjects = resolve(__dirname, '../projects');
const pathToPackage = resolve(__dirname, '../global');

const getDirectoriesName = (path: string): string[] =>
    readdirSync(path, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

const projectsNames = getDirectoriesName(resolve(pathToProjects));

projectsNames.forEach((name) => {
    const path = resolve(pathToProjects, name);

    exec(`cd ${path} && npm link ${pathToPackage}`, (err) => {
        if (err) {
            console.error(chalk.red(err));
            process.exit(1);
        }

        console.log(chalk.green(`${name} linked !`));
    });
});
