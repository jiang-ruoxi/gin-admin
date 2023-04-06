import service from '@/utils/request'

// @Tags Like
// @Summary 创建Like
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Like true "创建Like"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /like/createLike [post]
export const createLike = (data) => {
  return service({
    url: '/like/createLike',
    method: 'post',
    data
  })
}

// @Tags Like
// @Summary 删除Like
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Like true "删除Like"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /like/deleteLike [delete]
export const deleteLike = (data) => {
  return service({
    url: '/like/deleteLike',
    method: 'delete',
    data
  })
}

// @Tags Like
// @Summary 删除Like
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除Like"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /like/deleteLike [delete]
export const deleteLikeByIds = (data) => {
  return service({
    url: '/like/deleteLikeByIds',
    method: 'delete',
    data
  })
}

// @Tags Like
// @Summary 更新Like
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Like true "更新Like"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /like/updateLike [put]
export const updateLike = (data) => {
  return service({
    url: '/like/updateLike',
    method: 'put',
    data
  })
}

// @Tags Like
// @Summary 用id查询Like
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Like true "用id查询Like"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /like/findLike [get]
export const findLike = (params) => {
  return service({
    url: '/like/findLike',
    method: 'get',
    params
  })
}

// @Tags Like
// @Summary 分页获取Like列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取Like列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /like/getLikeList [get]
export const getLikeList = (params) => {
  return service({
    url: '/like/getLikeList',
    method: 'get',
    params
  })
}
