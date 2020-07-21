import Vue from "vue";
import VueRouter from "vue-router";
import Login from '@/views/login'
import Layout from '@/components/layout.vue'
import Member from '@/views/member'
import Supplier from '@/views/supplier'
import Goods from '@/views/goods'
import Staff from '@/views/staff'

Vue.use(VueRouter);

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'layout',
    path: '/',
    component: Layout,
    children: [
      {
        name: 'member',
        path: '/member/',
        component: Member,
        meta:{
          title: '会员管理'
        }
      },
      {
        name: 'supplier',
        path: '/supplier/',
        component: Supplier,
        meta:{
          title: '供应商管理'
        }
      },
      {
        name: 'goods',
        path: '/goods/',
        component: Goods,
        meta:{
          title: '商品管理'
        }
      },
      {
        name: 'staff',
        path: '/staff/',
        component: Staff,
        meta:{
          title: '员工管理'
        }
      }
    ]
  }
  
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

