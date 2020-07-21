import router from '@/router/index.js'

console.log(router);

router.beforeEach((to, from, next) => {

  // console.log(to, from);
  if(to.path === '/login') {
    next()
  }else  {
    if(!localStorage.getItem('msm-token')) {
      next('/login')
    }else{
      next()
    }
  }
})