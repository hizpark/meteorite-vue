// 导入 mock 数据
import '@/mock/auth.mock'
import '@/mock/user.mock'
import '@/mock/menu.mock'
// 可以根据需要继续添加更多的 mock 数据文件

// 让 MockJS 在应用启动时启动
import Mock from 'mockjs'

Mock.setup({
  timeout: '200-600', // 模拟延时，避免请求响应过快
})
