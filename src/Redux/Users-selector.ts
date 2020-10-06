import { createSelector } from "reselect";
import { AppStateType } from "./Redux-store";

export const getUsersData = (state: AppStateType) => {
  return state.usersPage.users
};

export const getUsersSuperSelector = createSelector(getUsersData, (users) => {
  return users.filter(u => true)
});

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
};

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress
};