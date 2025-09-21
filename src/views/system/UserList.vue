<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="toolbar-card no-border">
      <!-- 添加按钮 + 搜索 -->
      <div class="toolbar">
        <!-- 左侧搜索框 -->
        <el-input
          v-model="search"
          placeholder="搜索用户名"
          clearable
          @clear="onSearch"
          @keyup.enter="onSearch"
          class="search-input"
        >
          <template #append>
            <el-button size="small" type="primary" @click="onSearch">搜索</el-button>
          </template>
        </el-input>

        <!-- 右侧添加按钮 -->
        <el-button type="primary" class="add-button" @click="addUser">
          <el-icon><Plus /></el-icon>
        </el-button>
      </div>
    </el-card>
  </div>

  <div class="data-table">
    <el-card class="base-table-card no-border" ref="tableWrapper">
      <!-- 表格 -->
      <BaseTable
        :data="userStore.userList"
        :columns="userStore.columns"
        :loading="userStore.loading.list"
      >
        <template #actions="{ row }">
          <el-button size="small" @click="editUser(row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="confirmDelete(row.id)">删除</el-button>
        </template>
      </BaseTable>
    </el-card>

    <el-card class="pager-card no-border">
      <div class="pager-card-inner">
        <!-- 模式开关 -->
        <div
          class="pagination-mode-switch"
          style="margin-bottom: 8px; display: flex; justify-content: center"
          :title="appendMode ? '追加模式 / 翻页数据追加到尾部' : '传统分页 / 翻页替换表格'"
        >
          <el-switch
            v-model="appendMode"
            active-color="#409EFF"
            inactive-color="#C0C4CC"
            @change="onModeChange"
          />
        </div>

        <!-- 分页组件 -->
        <div style="text-align: right">
          <el-pagination
            class="vertical-pagination"
            :current-page="userStore.currentPage"
            :page-size="userStore.pageSize"
            :total="userStore.totalCount"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/system/user'
import { smoothScroll } from '@/utils/smoothScroll.js'
import BaseTable from '@/components/common/BaseTable.vue'
import router from '@/router'

const userStore = useUserStore()
const search = ref('')

// 获取列表函数，保留搜索关键词
const fetchUserList = (page = userStore.currentPage) => {
  return userStore.getUserList({
    page,
    limit: userStore.pageSize,
    search: search.value.trim(),
  })
}

const addUser = () => router.push('/admin/users/new')
const editUser = (id) => router.push(`/admin/users/${id}/edit`)

// 页面加载时获取列表
onMounted(() => fetchUserList())

// 搜索方法，搜索时页面回到第一页
const onSearch = () => {
  if (appendMode.value) userStore.clearUserListCache()
  fetchUserList(1).then((res) => {
    if (appendMode.value && res.code === 200) {
      userStore.userList = [...userStore.userList, ...res.data]
    }
  })
}

// 分页回调，支持追加模式
const appendMode = ref(false)

// 引用表格容器
const tableWrapper = ref(null)

/** 复用版 handlePageChange */
const handlePageChange = async (page) => {
  const wrapper = tableWrapper.value?.$el || tableWrapper.value
  let prevScrollHeight = 0

  if (appendMode.value && wrapper) {
    // 记录追加前的总高度
    prevScrollHeight = wrapper.scrollHeight
  }

  const res = await userStore.getUserList({ page, limit: userStore.pageSize })

  if (res.code === 200) {
    if (appendMode.value && wrapper) {
      nextTick(() => {
        if (wrapper) {
          smoothScroll(wrapper, prevScrollHeight, 500) // 500ms 平滑滚动
        }
      })
    }
  }
}

// 切换分页模式
const onModeChange = () => {
  userStore.setAppendMode(appendMode.value)
}

// 删除用户
const confirmDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该用户吗？此操作不可撤销。', '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await userStore.deleteUser(id)
    ElMessage.success('删除成功')
  } catch (err) {
    if (err !== 'cancel') {
      console.error(err)
      ElMessage.error('删除失败')
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.toolbar-card {
  margin-bottom: 10px;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.search-input {
  flex: 1 1 200px;
  max-width: 400px;
  min-width: 180px;
}

.add-button {
  flex: 0 0 auto;
}

.base-table-card {
  flex-grow: 1;
  min-height: 0; /* 同样保证内部滚动生效 */
  overflow-y: auto;
}

.data-table {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  min-height: 0; /* 允许子元素溢出滚动，flex 父级必须加这个 */
}

.pager-card {
  flex-shrink: 0; /* 不允许压缩 */
}

.pager-card-inner {
  display: flex;
  gap: 10px;
}

@media (min-width: 1200px) {
  .data-table {
    flex-direction: row;
  }
  .vertical-pagination {
    display: flex;
    flex-direction: column;
    align-items: center; /* 可选，居中分页按钮 */
  }

  .pager-card-inner {
    flex-direction: column;
  }

  ::v-deep(.vertical-pagination .el-pager) {
    display: flex !important;
    flex-direction: column !important;
    align-items: center; /* 可选 */
  }

  ::v-deep(.vertical-pagination .el-pager li) {
    display: block !important; /* 让 li 垂直排列 */
    margin: 4px 0; /* 间距可调 */
  }

  ::v-deep(.vertical-pagination .btn-prev),
  ::v-deep(.vertical-pagination .btn-next) {
    transform: rotate(90deg);
    display: inline-block; /* 确保旋转生效 */
  }

  ::v-deep(.vertical-pagination .btn-quickprev),
  ::v-deep(.vertical-pagination .btn-quicknext) {
    position: relative !important;
    margin-left: -6px !important;
    transform: rotate(90deg);
  }
}
</style>
