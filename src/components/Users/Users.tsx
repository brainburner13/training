import React, { useEffect } from "react";
import Paginator from "../Common/Preloader/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, getUsers, follow, unfollow } from '../../Redux/Users-reducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersSuperSelector, getUsersFilter, getFollowingInProgress } from "../../Redux/Users-selector";
import { useDispatch, useSelector } from "react-redux";

type PropsType = {
  portionSize?: number;
};

export const Users: React.FC<PropsType> = (props) => {

  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUsersSuperSelector);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  };

  const followProp = (userId: number) => {
    dispatch(follow(userId));
  };

  const unfollowProp = (userId: number) => {
    dispatch(unfollow(userId));
  };

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter));
  }, []);

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User
            key={u.id}
            user={u}
            followingInProgress={followingInProgress}
            unfollow={unfollowProp}
            follow={followProp}
          />
        ))}
      </div>
    </div>
  );
};