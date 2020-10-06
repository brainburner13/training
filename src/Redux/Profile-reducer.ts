import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/profile-api';
import { InferActionTypes, BaseThunkType } from './Redux-store';
import {ProfileType, PhotosType} from '../types/types';

type PostType = {
  id: number,
  message: string,
  likesCount: number,
};

let initialState = {
  posts: [
    {id: 1, message: 'Hi, fresh meat', likesCount: 3},
    {id: 2, message: 'How are you?', likesCount: 5}
  ] as Array<PostType>,
  status: '',
  profile: null as ProfileType | null,
  newPostText: '',
};

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
      case 'my/profilePage/ADD_POST': {
        let newPost = {
          id: 3,
          message: action.newPostText,
          likesCount: 0,
        };
        return {...state, posts: [...state.posts, newPost], newPostText: ''};
      };
      case 'my/profilePage/SET_USER_PROFILE': {
        return {...state, profile: action.profile};
      }
      case 'my/profilePage/SET_STATUS': {
        return {...state, status: action.status};
      }
      case 'my/profilePage/UPDATE_STATUS': {
        return {...state, status: action.status};
      }
      case 'my/profilePage/DELITE_POST': {
        return {...state, posts: state.posts.filter(p => p.id !== action.postId)};
      }
      case 'my/profilePage/SAVE_PHOTO': {
        return {...state, profile: {...state.profile, photos: action.photos} as ProfileType};
      }
      default: {
        return {...state};
      }
    }
};

export const actions = {
  addPostCreater: (newPostText: string) => ({type: 'my/profilePage/ADD_POST', newPostText} as const),
  delitePost: (postId: number) => ({type: 'my/profilePage/DELITE_POST', postId} as const),
  setUserProfile: (profile: ProfileType) => ({type: 'my/profilePage/SET_USER_PROFILE', profile} as const),
  setStatus: (status: string) => ({type: 'my/profilePage/SET_STATUS', status} as const),
  updateStatus: (status: string) => ({type: 'my/profilePage/UPDATE_STATUS', status} as const),
  savePhotoSuccess: (photos: PhotosType) => ({type: 'my/profilePage/SAVE_PHOTO', photos} as const),
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
};

export const saveProfile = (formData: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(formData);
  if (data.resultCode === 0) {
    if(userId !== null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error('userId can`t be null')
    };
  } else {
    dispatch(stopSubmit("edit-profile", { _error: data.messages[0]}));
    return Promise.reject(data.messages[0]);
  };
};

export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const savePhoto = (photos: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(photos);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  };  
};

export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
      dispatch(actions.updateStatus(status));
    }
  } catch(error) {
    debugger;
  };
};

export default profileReducer;