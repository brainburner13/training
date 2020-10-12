import { Dispatch } from 'redux';
import { InferActionTypes, BaseThunkType } from './Redux-store';
import { UserType } from './../types/types';
import { usersAPI } from '../api/users-api';
import { updateObjectInArray } from '../utils/object-helpers';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
      case "my/usersPage/FOLLOW":
        return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})};
      case "my/usersPage/UNFOLLOW":
        return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})};
        case "my/usersPage/SET_CURRENT_PAGE":
        return {...state, currentPage: action.currentPage};
        case "my/usersPage/SET_USERS":
          return {...state, users: action.users};
        case "my/usersPage/SET_TOTAL_USERS_COUNT":
          return {...state, totalUsersCount: action.totalCount};
        case "my/usersPage/TOOGLE_IS_FETCHING":
          return {...state, isFetching: action.isFetching};
        case "my/usersPage/TOOGLE_IS_FOLLOWING_PROGRESS":
          return action.followingInProgress 
           ? {...state, followingInProgress: [...state.followingInProgress, action.userId]}
           : {...state, followingInProgress: [...state.followingInProgress.filter(id => id !== action.userId)]};
      default: {
        return {...state};
      }
    };
};

export const actions = {
  followSuccess: (userId: number) => ({type: 'my/usersPage/FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'my/usersPage/UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'my/usersPage/SET_USERS', users} as const),
  setCurrentPage: (currentPage: number) => ({type: 'my/usersPage/SET_CURRENT_PAGE', currentPage} as const),
  setTotalUsersCount: (totalCount: number) => ({type: 'my/usersPage/SET_TOTAL_USERS_COUNT', totalCount} as const),
  setIsFetchingt: (isFetching: boolean) => ({type: 'my/usersPage/TOOGLE_IS_FETCHING', isFetching} as const),
  setFollowingInPropgress: (followingInProgress: boolean, userId: number) => ({type: 'my/usersPage/TOOGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId} as const),
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreater: (userId: number) => ActionsTypes) => {
  dispatch(actions.setFollowingInPropgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreater(userId));
  };
  dispatch(actions.setFollowingInPropgress(false, userId));
};

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.setIsFetchingt(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.setIsFetchingt(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), actions.followSuccess);
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), actions.unfollowSuccess);
  };
};

export default usersReducer;