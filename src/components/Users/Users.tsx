import React from 'react';
import { UserType } from '../../types/types';
import Paginator from '../Common/Preloader/Paginator/Paginator';
import User from './User';

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (pageNumber: number) => void,
  portionSize?: number,
  users: Array<UserType>,
  followingInProgress: Array<number>,
  unfollow: (userId: number) => void,
  follow: (userId: number) => void,
};

let Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
  return (
    <div>
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
            followingInProgress={props.followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;