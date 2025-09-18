import users from '@/mock/users.json'

export const loginApi = ({ username, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find((u) => u.username === username && u.password === password)
      if (user) {
        const token = btoa(`${username}:mock-token`)
        resolve({ success: true, token, username: user.username })
      } else {
        resolve({ success: false })
      }
    }, 1000) // 模拟 500ms 网络延迟
  })
}

export const getUserInfoApi = (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const [username] = atob(token).split(':')
        const user = users.find((u) => u.username === username)
        if (user) resolve({ success: true, username: user.username })
        else resolve({ success: false })
      } catch {
        resolve({ success: false })
      }
    }, 1000) // 模拟延迟
  })
}

export const logoutApi = (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        // 模拟解析 token
        const [username] = atob(token).split(':')
        if (username) {
          // 真实后端这里会把 token 加入黑名单，或清理 session
          resolve({ success: true })
        } else {
          resolve({ success: false, message: '无效的 token' })
        }
      } catch {
        resolve({ success: false, message: 'token 解析失败' })
      }
    }, 500) // 模拟网络延迟
  })
}

export const getUserListApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const list = users.map(({ id, username, email }) => ({ id, username, email }))
        resolve({ success: true, list })
      } catch {
        resolve({ success: false, list: [] })
      }
    }, 3000) // 模拟 1 秒网络延迟
  })
}
