import Vue from 'vue'
import Router from 'vue-router'
import Entrance from '@/components/entrance/'
import Login from '@/components/login/'
import Password from '@/components/password/'
import Register from '@/components/register/'
import Main from '@/components/home/'
import Home from '@/components/home/home.vue'
import ManageList from '@/components/manage/manage-list/'
import ManageAdd from '@/components/manage/manage-add/'
import ManageSet from '@/components/manage/manage-set/'
import ManageEdit from '@/components/manage/manage-edit/'
import Sale from '@/components/sale/'
import SaleList from '@/components/sale/sale-list/'
import SaleAdd from '@/components/sale/sale-add/'
import Bill from '@/components/bill/'
import BillList from '@/components/bill/bill-list/'
import System from '@/components/system/'
import SystemList from '@/components/system/system-list/'
import SystemAdd from '@/components/system/system-add/'
import SystemSet from '@/components/system/system-set/'
import SystemEdit from '@/components/system/system-edit/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Entrance,
      redirect: '/entrance'
    },
    {
      path: '/entrance',
      component: Entrance,
      redirect: '/entrance/login',
      children: [
        {
          path: '/entrance/login',
          component: Login
        },
        {
          path: '/entrance/password',
          component: Password
        },
        {
          path: '/entrance/register',
          component: Register
        }
      ]
    }, {
      path: '/main',
      component: Main,
      redirect: '/main/home',
      children: [
        {
          path: '/main/home',
          component: Home,
          redirect: '/main/home/manage-list',
          children: [
            {
              path: '/main/home/manage-list',
              component: ManageList,
              name: '列表'
            },
            {
              path: '/main/home/manage-add',
              component: ManageAdd,
              name: '添加'
            },
            {
              path: '/main/home/manage-set',
              component: ManageSet
            },
            {
              path: '/main/home/edit/:id',
              component: ManageEdit
            }
          ]
        },
        {
          path: '/main/sale',
          component: Sale,
          redirect: '/main/sale/sale-list',
          children: [
            {
              path: '/main/sale/sale-list',
              component: SaleList
            },
            {
              path: '/main/sale/sale-add',
              component: SaleAdd
            }
          ]
        },
        {
          path: '/main/bill',
          component: Bill,
          redirect: '/main/bill/bill-list',
          children: [
            {
              path: '/main/bill/bill-list',
              component: BillList
            }
          ]
        },
        {
          path: '/main/system',
          component: System,
          redirect: '/main/system/system-list',
          children: [
            {
              path: '/main/system/system-list',
              component: SystemList
            },
            {
              path: '/main/system/system-add',
              component: SystemAdd
            },
            {
              path: '/main/system/system-set',
              component: SystemSet
            },
            {
              path: '/main/home/edit/:id',
              component: SystemEdit
            }
          ]
        }
      ]
    }
  ]
})
