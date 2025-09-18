import Mock from 'mockjs'

Mock.mock('/api/user-info', 'get', {
  code: 200,
  message: '请求成功',
  data: {
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
  },
})
