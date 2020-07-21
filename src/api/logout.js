import request from '@/utils/request'

export  function logout(token) {
  return request({
     method: 'post',
     url: '/user/logout',
     data: {
       token
     }
   })
}