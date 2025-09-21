// src/mock/user.mock.js

// ----------- 模拟数据库 -----------
let usersDB = []

// 初始化 500 个用户
for (let i = 1; i <= 500; i++) {
  usersDB.push({
    id: i,
    username: `user${i}`,
    email: `user${i}@example.com`,
  })
}

// 工具函数：获取下一个 ID
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

// ----------- 导出 mock 配置 -----------
export default [
  // 获取用户列表（分页 + 搜索 + 倒序）
  {
    url: /\/api\/users(\?.*)?$/,
    method: 'get',
    response: ({ query }) => {
      const page = Math.max(parseInt(query.page) || 1, 1)
      const limit = Math.min(Math.max(parseInt(query.limit) || 10, 1), 50)
      const search = query.search || ''

      let filtered = usersDB
      if (search) {
        filtered = filtered.filter((u) => u.username.includes(search))
      }

      const { total, users } = paginateAndReverse(filtered, page, limit)
      return { code: 200, message: '请求成功', data: { total, users } }
    },
  },

  // 获取单个用户信息
  {
    url: /\/api\/users\/\d+$/,
    method: 'get',
    response: ({ query }) => {
      const id = Number(query.id)
      const user = usersDB.find((u) => u.id === id)
      return user
        ? { code: 200, message: '请求成功', data: user }
        : { code: 404, message: '用户不存在', data: {} }
    },
  },

  // 创建用户
  {
    url: '/api/users',
    method: 'post',
    response: ({ body }) => {
      const newUser = { id: getNextId(), ...JSON.parse(body) }
      usersDB.push(newUser) // 插入数据库末尾，列表接口会倒序显示
      return { code: 200, message: '创建成功', data: newUser }
    },
  },

  // 更新用户
  {
    url: /\/api\/users\/\d+$/,
    method: 'put',
    response: ({ body, query }) => {
      const id = Number(query.id)
      const bodyData = JSON.parse(body)
      const index = usersDB.findIndex((u) => u.id === id)
      if (index !== -1) {
        usersDB[index] = { ...usersDB[index], ...bodyData }
        return { code: 200, message: '更新成功', data: usersDB[index] }
      }
      return { code: 404, message: '用户不存在', data: {} }
    },
  },

  // 删除用户
  {
    url: /\/api\/users\/\d+$/,
    method: 'delete',
    response: ({ query }) => {
      const id = Number(query.id)
      const index = usersDB.findIndex((u) => u.id === id)
      if (index !== -1) {
        usersDB.splice(index, 1)
        return { code: 200, message: '删除成功', data: {} }
      }
      return { code: 404, message: '用户不存在', data: {} }
    },
  },
]
