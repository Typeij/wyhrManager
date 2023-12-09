import { Message } from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/layout',
    name: 'layout',
    redirect: "/layout/druglist",
    component: () => import('../views/layout/layout.vue'),
    meta:{
        isAuth:true
    },
    //二级路由
    children: [
      { path: "druglist", component: () => import("@/views/druglist/Druglist"),meta:{
        isAuth: true
      } },
      {
        path: "stocklist", component: () => import("@/views/stocklist/Stocklist"), meta: {
          isAuth: true
        }},
      {
        path: "taglist", component: () => import("@/views/taglist/Taglist"), meta: {
          isAuth: true
        }},
      {
        path: "selldata", component: () => import("@/views/selldata/Selldata"), meta: {
          isAuth: true
        }},
      {
        path: "shoplist", component: () => import("@/views/yaodian/fendianList"), meta: {
          isAuth: true
        }
      },
      {
        path: "join", component: () => import("@/views/yaodian/fendianjoin"), meta: {
          isAuth: true
        }
      },
      {
        path: "doclist", component: () => import("@/views/yishiguanli/doclist"), meta: {
          isAuth: true
        }
      }
    ]
  },
  {
    path: "/",
    name: 'layout',
     redirect: "/layout/druglist",
     component: () => import('../views/layout/layout.vue'),
     meta:{
       isAuth: true
     }
  },
  {
    path: "/tagdet",
    name: 'tagDatial',
    component: () => import('../views/taglist/TagDatial.vue'),
    meta: {
      isAuth: false
    }
  },
  {//医师登录
    path: "/doctor",
    name: 'doctor',
    redirect: "/doctor/dotag",
    component: () => import('../views/yishi/doctor.vue'),
    meta: {
      isAuth: false
    },
    //医师登录二级路由
    children:[
      {path: "dotag", component: () => import("../views/yishi/doctorLIst/dotag.vue"), meta: {
          isAuth: false
        }
      },
      {
        path: "taglist",  component: () => import("../views/yishi/doctorLIst/taglist.vue"), meta: {
          isAuth: false
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta:{
      isAuth: false
    }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
    if(to.meta.isAuth){
        let token=localStorage.getItem('token')
        if(token){
          next()
        }else{
          Message.error('请登录')
          next('/login')
        }
    }else{
      next()
    }
})

export default router
