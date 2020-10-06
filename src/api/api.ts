import axios from 'axios';
import { UserType } from './../types/types';

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'cede8ea6-b5b3-46b2-b812-cfd445a2da72'},
});

export enum ResultCodesEnum {
    success = 0,
    error = 1,
};

export enum ResultCodeFromCaptchaEnum {
    captchaIsRequired = 10,
};

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null,
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC,
};

