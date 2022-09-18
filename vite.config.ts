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
        GITHUB_PAGES: _envString(env.GITHUB_PAGES),
        __mode: _envString(mode),
        __timed: _envString(timed()),
    }

    config['envPrefix'] = 'VITE_'
    config['plugins'] = [
        preact({
            devtoolsInProd: true,
        })
    ];

    config['publicDir'] = _envString(env.GITHUB_PAGES);

    if (command === 'serve') {
        // dev specific config
        // config['key'] = 'value'
    } else {
        // command === 'build'
        // build specific config
        // config['key'] = 'value'
    }

    return config
})
