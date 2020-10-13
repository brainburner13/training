import { instance, APIResponseType } from './api';
import {GetItemsType} from './api';

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 100, term: string =  '', friend: null | boolean = null) {
        return  instance
        .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
        .then(response => {
            return response.data
        });
    },

    follow<APIResponseType>(userId: number) {
        return instance
        .post(`follow/${userId}`, null).then(response => response.data)
    },

    unfollow(userId: number) {
        return instance
        .delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>
    },
};