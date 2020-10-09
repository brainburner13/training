import React from 'react';
import s from './Post.module.css';
import unknownUser from '../../../../assets/images/unknownUser.png';
//import { PostType } from '../../../../Redux/Profile-reducer';

type PropsType = {
  //item: PostType;
  message: string;
  likesCount: number;
  id: number;
};

const Post: React.FC<PropsType> = (props) => {
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