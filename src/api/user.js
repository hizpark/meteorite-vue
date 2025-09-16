import users from '@/mocks/users.json'

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
