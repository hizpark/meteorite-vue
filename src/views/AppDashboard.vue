<template>
  <el-row :gutter="20">
    <!-- 用户数图表 - 柱状图 -->
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <el-card shadow="hover" class="dashboard-card no-border">
        <v-chart :option="userChartOption" class="v-chart" autoresize />
      </el-card>
    </el-col>

    <!-- 内容数图表 - 面积图 -->
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <el-card shadow="hover" class="dashboard-card no-border">
        <v-chart :option="contentChartOption" class="v-chart" autoresize />
      </el-card>
    </el-col>

    <!-- 销售图表 - 雷达图 -->
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <el-card shadow="hover" class="dashboard-card no-border">
        <v-chart :option="salesChartOption" class="v-chart" autoresize />
      </el-card>
    </el-col>

    <!-- 用户分析图表 - 饼图 -->
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
      <el-card shadow="hover" class="dashboard-card no-border">
        <v-chart :option="userAnalysisChartOption" class="v-chart" autoresize />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, RadarChart, ScatterChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  RadarComponent,
} from 'echarts/components'

// 注册必要的组件
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  RadarComponent,
])

// 用户数图表配置 - 柱状图
const userChartOption = ref({
  title: {
    text: '用户数',
    left: 'center',
    textStyle: {
      fontSize: 14,
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '用户数',
      type: 'bar',
      data: [120, 200, 150, 80, 70],
      itemStyle: {
        color: '#5470c6',
      },
    },
  ],
  grid: {
    top: '20%',
    left: '5%',
    right: '5%',
    bottom: '15%',
    containLabel: true,
  },
})

// 内容数图表配置 - 面积图
const contentChartOption = ref({
  title: {
    text: '内容数趋势',
    left: 'center',
    textStyle: {
      fontSize: 14,
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '内容数',
      type: 'line',
      data: [50, 100, 80, 60, 120, 150],
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(145, 204, 117, 0.6)',
            },
            {
              offset: 1,
              color: 'rgba(145, 204, 117, 0.1)',
            },
          ],
        },
      },
      itemStyle: {
        color: '#91cc75',
      },
      lineStyle: {
        width: 3,
      },
    },
  ],
  grid: {
    top: '20%',
    left: '5%',
    right: '5%',
    bottom: '15%',
    containLabel: true,
  },
})

// 销售图表配置 - 雷达图
const salesChartOption = ref({
  title: {
    text: '产品能力评估',
    left: 'center',
    textStyle: {
      fontSize: 14,
    },
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    data: ['产品A', '产品B'],
    bottom: 0,
  },
  radar: {
    // 雷达图的指示器，用来指定雷达图中的多个变量
    indicator: [
      { name: '销售', max: 100 },
      { name: '管理', max: 100 },
      { name: '技术', max: 100 },
      { name: '客服', max: 100 },
      { name: '研发', max: 100 },
      { name: '市场', max: 100 },
    ],
    radius: '55%',
  },
  series: [
    {
      name: '产品能力雷达图',
      type: 'radar',
      data: [
        {
          value: [85, 70, 60, 75, 80, 90],
          name: '产品A',
          itemStyle: {
            color: '#5470c6',
          },
          areaStyle: {
            color: 'rgba(84, 112, 198, 0.3)',
          },
        },
        {
          value: [70, 85, 90, 60, 75, 80],
          name: '产品B',
          itemStyle: {
            color: '#91cc75',
          },
          areaStyle: {
            color: 'rgba(145, 204, 117, 0.3)',
          },
        },
      ],
    },
  ],
})

// 用户分析图表配置 - 环形饼图
const userAnalysisChartOption = ref({
  title: {
    text: '用户分布',
    left: 'center',
    textStyle: {
      fontSize: 14,
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'horizontal',
    bottom: 0,
  },
  series: [
    {
      name: '用户分布',
      type: 'pie',
      radius: ['40%', '60%'], // 设置为环形
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: true,
        formatter: '{b}: {c}',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '14',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 50, name: '18-25岁' },
        { value: 40, name: '26-35岁' },
        { value: 30, name: '36-45岁' },
        { value: 20, name: '46岁以上' },
      ],
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666'],
    },
  ],
})
</script>

<style scoped>
.dashboard-card {
  text-align: center;
  height: 100%;
}

.v-chart {
  width: 100%;
  height: 280px;
}

/* 确保卡片高度一致 */
.el-col {
  margin-bottom: 20px;
}

/* 调整卡片内边距 */
:deep(.el-card__body) {
  padding: 16px;
}
</style>
