import request from '@/utils/request' //封装的axios

//name为plop命令行传过来的参数 拼接以区分不同页面模块 避免一个页面引入同多个同类型接口的时候冲突
export function gettest2List(params) {
  return request.get('/api/v1/test2', params)
}

export function createtest2(params) {
  return request.post('/api/v1/test2', params)
}

export function edittest2(id) {
  return request.get('/api/v1/test2/' + id + '/edit')
}

export function updatetest2(id,params) {
  return request.put('/api/v1/test2/' + id, params)
}

export function deletetest2(id) {
  return request.delete('/api/v1/test2/' + id)
}