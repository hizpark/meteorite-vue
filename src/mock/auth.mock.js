// src/mock/auth.mock.js
export default [
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body

      // 模拟生成 token
      const token = Math.random().toString(36).slice(2, 18)

      // 模拟登录验证
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            token,
            userInfo: {
              username: 'admin',
              email: 'admin@example.com',
              role: 'admin',
            },
          },
        }
      }

      return {
        code: 400,
        message: '用户名或密码错误',
      }
    },
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: '登出成功',
      }
    },
  },
]
