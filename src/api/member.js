import request from '@/utils/request'

export default  {
  getMemberList() { 
    return request({
       method: 'get',
       url: '/member/list',
    })
  },
  search(page, size, searchMap) {
    return request({
      method: 'post',
      url: `/member/list/search/${page}/${size}`,
      data: searchMap
    })
  }
}