import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '.'))
  return {
    resolve: {
      alias: {
        '@configs': path.join(__dirname, 'src/configs'),
        '@components': path.join(__dirname, 'src/components'),
        '@constants': path.join(__dirname, 'src/constants'),
        '@contexts': path.join(__dirname, 'src/contexts'),
        '@layouts': path.join(__dirname, 'src/layouts'),
        '@hooks': path.join(__dirname, 'src/hooks'),
        '@pages': path.join(__dirname, 'src/pages'),
        '@services': path.join(__dirname, 'src/services'),
        '@typings': path.join(__dirname, 'src/typings'),
        '@util': path.join(__dirname, 'src/utils'),
        '@utils': path.join(__dirname, 'src/utils'),
        '@redux': path.join(__dirname, 'src/redux'),
        '@assets': path.join(__dirname, 'src/assets')
      }
    },
    ssr: {
      noExternal: ['@nivo/*']
    },
    plugins: [react()],
    define: {
      __APP_ENV__: env
    }
  }
})
