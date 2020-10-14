import React, { useEffect } from "react";
import Paginator from "../Common/Preloader/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import { FilterType, getUsers, follow, unfollow } from '../../Redux/Users-reducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersSuperSelector, getUsersFilter, getFollowingInProgress } from "../../Redux/Users-selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from 'querystring';

type PropsType = {
  portionSize?: number;
};

type QueryParamsType = {term?: string, page?: string, friend?: string};

export const Users: React.FC<PropsType> = (props) => {

  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getUsersSuperSelector);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();

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
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    if(!!parsed.page) actualPage = Number(parsed.page);   
    if(!!parsed.term) actualFilter = {...filter, term: parsed.term as string};
    switch(parsed.friend) {
      case 'null':
        actualFilter = {...actualFilter, friend: null};
        break;
      case 'true':
        actualFilter = {...actualFilter, friend: true};
        break;
      case 'false':
        actualFilter = {...actualFilter, friend: false};
        break;
    };

    dispatch(getUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {

    const query: QueryParamsType = {};
    
    if(!!filter.term) query.term = filter.term;
    if(!!filter.friend !== null) query.friend = String(filter.friend);
    if(currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: '/users',
      search: queryString.stringify(query),
    })
  }, [filter, currentPage]);

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