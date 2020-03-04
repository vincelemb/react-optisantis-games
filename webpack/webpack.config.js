export const PROJECTS = {
    Memory: {
        entryPath: 'src/projects/memory',
        entryPoint: 'index.tsx',
    },
    Chrono: {
        entryPath: 'src/projects/chrono',
        entryPoint: 'index.tsx',
    },
    Cardiaque: {
        entryPath: 'src/projects/cardiaque',
        entryPoint: 'index.tsx',
    },
};

const buildEntries = () => {
    const entries = {};
    
    for (const project in PROJECTS) {
        entries[project] = `./${PROJECTS[project].entryPath}/${PROJECTS[project].entryPoint}`;
    }

    return entries;
};

const buildResolveModules = () => {
    const modules = [];

    for (const project in PROJECTS) {
        modules.push(PROJECTS[project].entryPath);
    }

    return modules;
};

export default {
    entry: buildEntries(),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs'],
        modules: [...buildResolveModules(), 'node_modules/'],
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
        __dirname: false,
        __filename: false,
    },
    stats: {
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        timings: true,
        version: false,
    },
};
