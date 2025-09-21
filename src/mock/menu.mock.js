// src/mock/menu.mock.js
export default [
  {
    url: '/api/menus',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '请求成功',
        data: [
          {
            index: 'dashboard',
            path: '/admin/dashboard',
            title: 'Dashboard',
            icon: 'mdi:monitor',
          },
          {
            index: 'users',
            path: '/admin/users',
            title: 'Users',
            icon: 'mdi:account-box',
            children: [
              { index: 'users', path: '/admin/users', title: 'All users' },
              { index: 'form-advanced', path: '/admin/users/new', title: 'New user' },
            ],
          },
          {
            index: 'tables',
            path: '/admin/tables',
            title: 'Tables',
            icon: 'mdi:list-box-outline',
            children: [
              { index: 'user-table', path: '/admin/tables/user', title: '用户列表' },
              { index: 'article-table', path: '/admin/tables/article', title: '文章列表' },
            ],
          },
          {
            index: 'forms',
            path: '/admin/forms',
            title: 'Forms',
            icon: 'mdi:text-box-edit',
            children: [
              { index: 'form-basic', path: '/admin/forms/basic', title: '基础表单' },
              { index: 'form-advanced', path: '/admin/forms/advanced', title: '复杂表单' },
            ],
          },
        ],
      }
    },
  },
]
