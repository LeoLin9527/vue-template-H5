/**
* @desc 路由
* @author 180496
* @date 2020/5/14
*/
import Main from '@/views/Main.vue';


// 无权限公用路由表
export const constantRouterMap = [
  {
    path: '/401',
    name: 'error401',
    component: () => import(/* webpackChunkName: "error403-page" */ '../views/error-pages/error401.vue'),
  },
  {
    path: '/408',
    name: 'error408',
    component: () => import(/* webpackChunkName: "error408-page" */ '../views/error-pages/error408.vue'),
  },
  {
    path: '/500',
    name: 'error500',
    component: () => import(/* webpackChunkName: "error500-page" */ '../views/error-pages/error500.vue'),
  },
];

// 404需要在挂载完动态路由后，最后挂载
export const error404Router = [
  {
    path: '*',
    name: 'error404',
    component: () => import(/* webpackChunkName: "error404-page" */ '../views/error-pages/error404.vue'),
  },
];

// 动态重定向不同主页
export const rootHomeRouter = homepage => [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: () => homepage,
  },
];

// 需要权限判断的动态路由表(异步挂载)
export const asyncRouterMap = [
  {
    path: '/company',
    name: 'company',
    redirect: '/company/index',
    component: Main,
    children: [
      {
        meta: { title: '公司', cached: true },
        path: 'index',
        name: 'companyIndex',
        component: () => import(/* webpackChunkName: "company-page" */ '@/views/company/company.vue'),
      },
    ],
  },

  {
    path: '/department',
    name: 'department',
    redirect: '/department/index/list',
    component: Main,
    children: [
      {
        meta: { title: '部门/分厂', cached: true },
        path: 'index',
        name: 'departmentIndex',
        redirect: '/department/index/list',
        component: () => import(/* webpackChunkName: "department-page" */ '@/views/department/department.vue'),
        children: [
          {
            meta: { title: '班次出勤', cached: true },
            path: 'list',
            name: 'departmentList',
            component: () => import(/* webpackChunkName: "department-list-page" */ '@/views/department/department-list.vue'),
          },
          {
            meta: { title: '缺勤统计', cached: true },
            path: 'chart',
            name: 'departmentChart',
            component: () => import(/* webpackChunkName: "department-chart-page" */ '@/views/department/department-chart.vue'),
          },
          {
            meta: { title: '技能工出勤', cached: true },
            path: 'worker',
            name: 'departmentWorker',
            component: () => import(/* webpackChunkName: "department-worker-page" */ '@/views/department/department-chart.vue'),
          },
          {
            meta: { title: '请假排名', cached: true },
            path: 'leave',
            name: 'departmentLeave',
            component: () => import(/* webpackChunkName: "department-leave-page" */ '@/views/department/department-chart.vue'),
          },
        ],
      },
      {
        meta: { title: '部门/分厂详细', cached: true },
        path: 'detail',
        name: 'departmentDetail',
        component: () => import(/* webpackChunkName: "department-detail-page" */ '@/views/department/department-detail.vue'),
      },
    ],
  },

  {
    path: '/team',
    name: 'team',
    redirect: '/team/index/list',
    component: Main,
    children: [
      {
        meta: { title: '科室/班组', cached: true },
        path: 'index',
        name: 'teamIndex',
        redirect: '/team/index/list',
        component: () => import(/* webpackChunkName: "team-page" */ '@/views/team/team.vue'),
        children: [
          {
            meta: { title: '班次出勤', cached: true },
            path: 'list',
            name: 'teamList',
            component: () => import(/* webpackChunkName: "team-list-page" */ '@/views/team/team-list.vue'),
          },
          {
            meta: { title: '缺勤统计', cached: true },
            path: 'chart',
            name: 'teamChart',
            component: () => import(/* webpackChunkName: "team-chart-page" */ '@/views/team/team-chart.vue'),
          },
          {
            meta: { title: '小组配置', cached: true },
            path: 'group',
            name: 'teamGroup',
            component: () => import(/* webpackChunkName: "team-group-page" */ '@/views/team/team-group.vue'),
          },
          {
            meta: { title: '技能工出勤', cached: true },
            path: 'worker',
            name: 'teamWorker',
            component: () => import(/* webpackChunkName: "team-worker-page" */ '@/views/team/team-chart.vue'),
          },
          {
            meta: { title: '请假排名', cached: true },
            path: 'leave',
            name: 'teamLeave',
            component: () => import(/* webpackChunkName: "team-leave-page" */ '@/views/team/team-chart.vue'),
          },
        ],
      },
      {
        meta: { title: '科室/班组详细', cached: true },
        path: 'detail',
        name: 'teamDetail',
        component: () => import(/* webpackChunkName: "team-detail-page" */ '@/views/team/team-detail.vue'),
      },
      {
        meta: { title: '出勤点名', cached: true },
        path: 'call',
        name: 'teamCall',
        component: () => import(/* webpackChunkName: "team-call-page" */ '@/views/team/team-call.vue'),
      },
      {
        meta: { title: '人员分配', cached: true },
        path: 'assign',
        name: 'teamAssign',
        component: () => import(/* webpackChunkName: "team-assign-page" */ '@/views/team/team-assign.vue'),
      },
    ],
  },
];
