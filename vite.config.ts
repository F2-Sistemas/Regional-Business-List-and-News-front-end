import { defineConfig, loadEnv, UserConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const _envString = (value) => `"${value}"`
    const timed = () => {
        return (new Date + '')
    }

    let config: UserConfig = {};

    config['envPrefix'] = 'VITE_'

    config['define'] = {
        __APP_ENV__: _envString(env.APP_ENV),
        REPO_NAME_GITHUB_PAGES: _envString(env.REPO_NAME_GITHUB_PAGES),
        __mode: _envString(mode),
        __timed: _envString(timed()),
    }

    config['envPrefix'] = 'VITE_'
    config['plugins'] = [
        preact({
            devtoolsInProd: true,
        })
    ];

    if (command === 'serve') {
        // dev specific config
        // config['key'] = 'value'
    }

    if (command === 'build') {
        // command === 'build'
        // build specific config
        // config['key'] = 'value'

        config['build'] = {
            outDir: 'build',// _envString(env.BUILDED_DIR);
        }

        /**
        * (!) "base" option SHOULD start with a slash.
        * (!) "base" option SHOULD end with a slash.
        * @todo validate if base starts and ends with slash '/'
        * Use 'mode' param to decides
        * _envString(env.REPO_NAME_GITHUB_PAGES)
        */
        let basename = '/';

        if (mode != 'development') {
            basename = env.REPO_NAME_GITHUB_PAGES_BASE_DIR ? env.REPO_NAME_GITHUB_PAGES_BASE_DIR : '/';
        }

        config.define['__basename'] = _envString(basename);

        config['base'] = basename;
    }

    return config
})
