import service from '@/utils/request'

// @Tags Baike
// @Summary 创建Baike
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Baike true "创建Baike"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /baike/createBaike [post]
export const createBaike = (data) => {
  return service({
    url: '/baike/createBaike',
    method: 'post',
    data
  })
}

// @Tags Baike
// @Summary 删除Baike
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Baike true "删除Baike"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /baike/deleteBaike [delete]
export const deleteBaike = (data) => {
  return service({
    url: '/baike/deleteBaike',
    method: 'delete',
    data
  })
}

// @Tags Baike
// @Summary 删除Baike
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Baike"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /baike/deleteBaike [delete]
export const deleteBaikeByIds = (data) => {
  return service({
    url: '/baike/deleteBaikeByIds',
    method: 'delete',
    data
  })
}

// @Tags Baike
// @Summary 更新Baike
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Baike true "更新Baike"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /baike/updateBaike [put]
export const updateBaike = (data) => {
  return service({
    url: '/baike/updateBaike',
    method: 'put',
    data
  })
}

// @Tags Baike
// @Summary 用id查询Baike
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Baike true "用id查询Baike"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /baike/findBaike [get]
export const findBaike = (params) => {
  return service({
    url: '/baike/findBaike',
    method: 'get',
    params
  })
}

// @Tags Baike
// @Summary 分页获取Baike列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Baike列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /baike/getBaikeList [get]
export const getBaikeList = (params) => {
  return service({
    url: '/baike/getBaikeList',
    method: 'get',
    params
  })
}
