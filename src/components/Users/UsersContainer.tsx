import { connect } from 'react-redux';
import { follow, unfollow, getUsers, FilterType} from '../../Redux/Users-reducer'; // setCurrentPage, setFollowingInPropgress,
import React from 'react';
import Users from './Users';
import Preloader from '../Common/Preloader/Preloader';
import { WithAuthRedirect } from '../../hoc/authRedirect';
import { compose } from 'redux';
import { getUsersSuperSelector, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersFilter } from '../../Redux/Users-selector';
import { UserType } from '../../types/types';
import { AppStateType } from '../../Redux/Redux-store';

type MapStatePropsType = {
  currentPage: number,
  pageSize: number,
  isFetching: boolean,
  totalUsersCount: number,
  users: Array<UserType>,
  followingInProgress: Array<number>,
  filter: FilterType,
};

type MapDispatchPropsType = {
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  getUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void,
};

type OwnPropsType = {
  pageTitle: string,
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    const {currentPage, pageSize, filter} = this.props
    this.props.getUsers(currentPage , pageSize, filter);
  };

  onPageChanged = (pageNumber: number) => {
    const {pageSize, filter} = this.props
    this.props.getUsers(pageNumber, pageSize, filter);
  };

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props
    this.props.getUsers(1, pageSize, filter);
  };

  render() {
    return (
      <>
      <h2>{this.props.pageTitle}</h2>
      {this.props.isFetching ? <Preloader/> : null}
      <Users 
        totalUsersCount={this.props.totalUsersCount}
        onFilterChanged={this.onFilterChanged}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}/>
      </>
    );
  };
};

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   }
// };

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    //users: getUsersData(state),
    users: getUsersSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  }
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps, {follow, unfollow, getUsers}),
  WithAuthRedirect
) (UsersContainer) as React.ComponentType<OwnPropsType>;

