export default defineNuxtConfig({
  modules: ['../src/module.ts'],
  build: {
    transpile: ['jsonwebtoken']
  },
  auth: {
    baseURL: '/api/v1/auth',
    provider: {
      refreshOnlyToken: false,
      signInWithFormData: true,
      type: 'refresh',
      endpoints: {
        signIn: { path: '/jwt/login', method: 'post' },
        getSession: { path: '/me', method: 'get' },
        refresh: { path: '/jwt/refresh', method: 'post' },
        signOut: { path: '/logout', method: 'post' }
      },
      pages: {
        login: '/'
      },
      token: {
        signInResponseTokenPointer: '/accessToken',
        maxAgeInSeconds: 60 * 60, // 9 min
        sameSiteAttribute: 'strict'
      },
      refreshToken: {
        maxAgeInSeconds: 60 * 60, // 9 hours
        sameSiteAttribute: 'strict',
        signInResponseRefreshTokenPointer: '/refreshToken'
      }
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  },
  nitro: {
    devProxy: {
      '/api/v1/': {
        target: 'http://192.168.1.100:8010/api/v1/',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})
