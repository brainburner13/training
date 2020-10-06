import {instance, APIResponseType, ResultCodesEnum, ResultCodeFromCaptchaEnum} from './api';

type MeResponseDataType = {
    id: number, email: string, login: string,
};

type LoginResponseType = {
    id: number,
};

export const authAPI = {
    me() {
        return instance
        .get<APIResponseType<MeResponseDataType>>(`auth/me`).then(response => response.data);
    },

    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance
        .post<APIResponseType<LoginResponseType, ResultCodesEnum | ResultCodeFromCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha}).then(response => response.data);
    },

    logout() {
        return instance
        .delete(`auth/login`) 
    },
};