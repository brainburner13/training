import { stopSubmit } from 'redux-form';
import { InferActionTypes, BaseThunkType } from './Redux-store';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import { ResultCodesEnum, ResultCodeFromCaptchaEnum } from '../api/api';

let initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  isAuth: false,
  captchaUrl: null as null | string,
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
      case 'my/auth/SET_USER-DATA': {
        return {...state, ...action.payload};
      }
      case 'my/auth/GET_CAPTCHA-URL': {
        return {...state, ...action.payload};
      }
      default: {
        return {...state};
      }
    }
};

const actions = {
  setUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: 'my/auth/SET_USER-DATA', payload: {userId, email, login, isAuth}} as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'my/auth/GET_CAPTCHA-URL', payload: {captchaUrl}} as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCodesEnum.success) {
    const { id, email, login } = meData.data;
    dispatch(actions.setUserData(id, email, login, true));
  };
};

export const login = (login: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const loginData = await authAPI.login(login, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCodesEnum.success) {
    dispatch(getAuthUserData());
  } else {
    if(loginData.resultCode === ResultCodeFromCaptchaEnum.captchaIsRequired) {
      dispatch(getCaptcha());
    };
    const message =
    loginData.messages.length > 0
        ? loginData.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  };
};

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setUserData(null, null, null, false));
  };
};

export const getCaptcha = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;