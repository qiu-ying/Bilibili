import Vue from 'vue'
import Router from 'vue-router'
import register from '@/views/register.vue'
import login from '@/views/login.vue'
import userinfo from '@/views/userinfo'
import edit from '@/views/Edit.vue'
import Home from '@/views/Home.vue'
import article from '@/views/Article.vue'
import EditCategory from '@/views/EditCategory'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/userinfo',
    component: userinfo,
    meta: {
      istoken: true
    }
  },
  {
    path: '/edit',
    component: edit,
    meta: {
      istoken: true
    }
  },
  {
    path: '/article/:id',
    component : article
  },
  {
    path: '/editcategory',
    component: EditCategory
  }
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && !localStorage.getItem('id') && to.meta.istoken == true) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})

// router.beforeEach((to, from, next) => {
//   if((!sessionStorage.getItem("id") || !sessionStorage.getItem("token")) && to.meta.istoken == true) {
//     router.push('/login');
//     return
//   }
//   next();
// })

export default router
