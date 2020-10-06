import React from 'react';
import s from './Post.module.css';
import unknownUser from '../../../../assets/images/unknownUser.png';

const Post = (props) => {
    return (
         <div className={s.item}>
           <img src={unknownUser} alt=''/>
          {props.message}
          <div>
          <span>Like</span>{props.likesCount}
          </div>
        </div>
    )
  };

export default Post;