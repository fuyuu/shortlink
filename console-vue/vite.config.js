import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      /**
       * 短链接跳转：/{短码} -> 网关(8000) -> 短链接服务
       * 1. 后端 restoreUrl() 用 request.getServerName() + ":" + getServerPort() + "/" + shortUri
       *    拼出 fullShortUrl 去查缓存/DB，所以必须 changeOrigin: false 保留原始 Host(localhost:5173)，
       *    网关侧同时要配 PreserveHostHeader，否则后端拼成 127.0.0.1:8000/xxx 会 302 notfound。
       * 2. 只匹配 /{base62短码}，并排除 /home、/login、/api 等前端自身路由，避免破坏 SPA。
       */
      '^/(?!home$|login$|api$)[0-9A-Za-z]{1,6}(\\?.*)?$': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false
      },
      // 短链不存在/已删除/已过期时，后端 302 到 /page/notfound，这里要转发才能显示兜底页
      '/page': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: false
      },
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
})
