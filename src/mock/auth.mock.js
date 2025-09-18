import Mock from 'mockjs'

// 模拟登录接口
Mock.mock('/api/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body)

  // 模拟生成 token
  const token = Mock.Random.guid() // 生成一个唯一的 token（你可以根据需求调整生成方式）

  // 模拟登录验证
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: token, // 返回动态生成的 token
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
})

// 模拟登出接口
Mock.mock('/api/logout', 'post', () => {
  // 假设登出成功，清除本地会话等
  return {
    code: 200,
    message: '登出成功',
  }
})
