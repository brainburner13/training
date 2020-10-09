import React from 'react';
import styles from './Users.module.css';
import unknownUser from '../../assets/images/unknownUser.png';
import {NavLink} from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
          <div>
            <span>
              <div>
                <NavLink to={'/profile' + user.id}>
                  <img
                    src={user.photos.small != null ? user.photos.small : unknownUser}
                    className={styles.usersPhoto} 
                    alt=''
                  />
                </NavLink>
              </div>
              <div>
                {user.followed ? (
                  <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                      unfollow(user.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                      follow(user.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
              </span>
              <span>
                <div>{"u.location.cauntry"}</div>
                <div>{"u.location.city"}</div>
              </span>
            </span>
          </div>
    )
};

export default User;