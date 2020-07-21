import request from '@/utils/request'

export  function login(username, password) {
   return request({
      method: 'post',
      url: '/user/login',
      data: {
        username,
        password
      }
    })
}
export function getUserInfo(token) {
  return request({
    url: `/user/info/${token}`,
    method: 'get'
  })
}


