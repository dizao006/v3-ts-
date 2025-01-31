// 用于管理用户相关的api接口
import request from "@/utils/request";
import type { resUserList, SaveUser, ResUser, resAssignRoleList, doAssignRole, editUser } from './type'

enum API {
    USER_LIST = '/admin/acl/user/', // 用户分页列表
    SAVE_USER = '/admin/acl/user/save', // 新增用户
    ASSIGN_ROLE_LIST = '/admin/acl/user/toAssign/', // 当前用户可分配的角色列表
    DO_ASSIGN_ROLE = '/admin/acl/user/doAssignRole', // 为当前用户分配角色
    EDIT_USER = '/admin/acl/user/update', //修改用户信息
    DELETE_USER = '/admin/acl/user/remove/', // 删除用户
    BATCH_DELETE_USER = '/admin/acl/user/batchRemove', // 批量删除用户
}

// 获取用户分页列表
export const reqGetUserList = (page: number, limit: number, keyword: string | null) => request.get<any, resUserList>(API.USER_LIST + `${page}/${limit}/?username=${keyword}`)

// 新增用户
export const reqSaveUser = (data: SaveUser) => request.post<any, ResUser>(API.SAVE_USER, { data: data })

// 获取当前用户可分配的角色列表
export const reqAssignRoleList = (userId: number) => request<any, resAssignRoleList>(API.ASSIGN_ROLE_LIST + `${userId}`)

// 为当前用户分配角色
export const reqDoAssignRole = (data: doAssignRole) => request.post<any, ResUser>(API.DO_ASSIGN_ROLE, { data: data })

// 修改用户信息
export const reqEditUser = (data: editUser) => request.put<any, ResUser>(API.EDIT_USER, { data: data })

// 删除用户
export const reqDeleteUser = (id: number) => request.delete<any, ResUser>(API.DELETE_USER + `${id}`)

// 根据id列表删除用户
export const reqBatchDeleteUser = (idList: number[]) => request.delete<any, ResUser>(API.BATCH_DELETE_USER, { data: idList })


import type {
    UserResponseData,
    User,
    AllRoleResponseData,
    SetRoleData,
} from './type'

enum API {
    ALLUSER_URL = '/admin/acl/user/',
    ADDUSER_URL = '/admin/acl/user/save',
    UPDATEUSER_URL = '/admin/acl/user/update',
    ALLROLEURL = '/admin/acl/user/toAssign/',
    SETROLE_url = '/admin/acl/user/doAssignRole',
    DELETEUSER_URL = '/admin/acl/user/remove/',
    DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserInfo = (page: number, limit: number, username: string) =>
    request.get<any, UserResponseData>(
        API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
    )

export const reqAddOrUpdateUser = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}

export const reqAllRole = (userId: number) =>
    request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)

export const reqSetUserRole = (data: SetRoleData) =>
    request.post<any, any>(API.SETROLE_url, data)

export const reqRemoveUser = (userId: number) =>
    request.delete<any, any>(API.DELETEUSER_URL + userId)

export const reqSelectUser = (idList: number[]) =>
    request.delete(API.DELETEALLUSER_URL, { data: idList })
