export const PROJECTS = {
    Memory: {
        entryPath: 'projects/memory/src',
        entryPoint: 'index.tsx',
    },
    Chrono: {
        entryPath: 'projects/chrono/src',
        entryPoint: 'index.tsx',
    },
    Cardiaque: {
        entryPath: 'projects/cardiaque/src',
        entryPoint: 'index.tsx',
    }
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
