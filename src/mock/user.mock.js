// src/mock/user.mock.js
import Mock from 'mockjs'

// ----------- 模拟数据库 -----------
let usersDB = []

// 初始化 50 个用户
for (let i = 1; i <= 500; i++) {
  usersDB.push({
    id: i,
    username: `user${i}`,
    email: `user${i}@example.com`,
  })
}

// 工具函数：获取 ID
const getNextId = () => (usersDB.length ? Math.max(...usersDB.map((u) => u.id)) + 1 : 1)

// 工具函数：分页并倒序
function paginateAndReverse(list, page = 1, limit = 10) {
  const total = list.length
  const start = (page - 1) * limit
  const end = start + limit
  return {
    total,
    users: list.slice().reverse().slice(start, end),
  }
}

// ----------- 获取用户列表（分页 + 搜索 + 倒序） -----------
Mock.mock(/\/api\/users(\?.*)?$/, 'get', (options) => {
  const urlParams = new URLSearchParams(options.url.split('?')[1] || '')
  const page = Math.max(parseInt(urlParams.get('page')) || 1, 1)
  const limit = Math.min(Math.max(parseInt(urlParams.get('limit')) || 10, 1), 50)
  const search = urlParams.get('search') || ''

  let filtered = usersDB
  if (search) {
    filtered = filtered.filter((u) => u.username.includes(search))
  }

  const { total, users } = paginateAndReverse(filtered, page, limit)

  return { code: 200, message: '请求成功', data: { total, users } }
})

// ----------- 获取单个用户信息 -----------
Mock.mock(/\/api\/users\/\d+$/, 'get', (options) => {
  const id = parseInt(options.url.split('/').pop())
  const user = usersDB.find((u) => u.id === id)
  return user
    ? { code: 200, message: '请求成功', data: user }
    : { code: 404, message: '用户不存在', data: {} }
})

// ----------- 创建用户 -----------
Mock.mock('/api/users', 'post', (options) => {
  const body = JSON.parse(options.body)
  const newUser = { id: getNextId(), ...body }
  usersDB.push(newUser) // 插入数据库末尾，列表接口会倒序显示
  return { code: 200, message: '创建成功', data: newUser }
})

// ----------- 更新用户 -----------
Mock.mock(/\/api\/users\/\d+$/, 'put', (options) => {
  const id = parseInt(options.url.split('/').pop())
  const body = JSON.parse(options.body)
  const index = usersDB.findIndex((u) => u.id === id)
  if (index !== -1) {
    usersDB[index] = { ...usersDB[index], ...body }
    return { code: 200, message: '更新成功', data: usersDB[index] }
  }
  return { code: 404, message: '用户不存在', data: {} }
})

// ----------- 删除用户 -----------
Mock.mock(/\/api\/users\/\d+$/, 'delete', (options) => {
  const id = parseInt(options.url.split('/').pop())
  const index = usersDB.findIndex((u) => u.id === id)
  if (index !== -1) {
    usersDB.splice(index, 1)
    return { code: 200, message: '删除成功', data: {} }
  }
  return { code: 404, message: '用户不存在', data: {} }
})
