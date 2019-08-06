import http from '../utils/http'
const catalog = {
  list: '/front/catalog/list'
}
const information = {
  list: '/front/information/list'
}

const loginUrl = '/auth/login'

/**
 * 查询栏目列表
 * @param param
 * @returns {Promise<AxiosResponse<T>>}
 */
export const queryCatalogList = param => http.post(catalog.list, param)

/**
 * 查询资讯列表
 * @param param
 * @returns {Promise<AxiosResponse<T>>}
 */
export const queryInformationList = param => http.post(information.list, param)

export const login = param => http.post(loginUrl, param)
