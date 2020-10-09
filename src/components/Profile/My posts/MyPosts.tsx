import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { InjectedFormProps, reduxForm } from 'redux-form';
import {requiredField, maxLengthCreator} from '../../../utils/validators/validators';
import { createField, GetStringCase, Textarea } from '../../Common/Preloader/FormsControls/FormsControls';
import { PostType } from '../../../Redux/Profile-reducer';

const maxLength10 = maxLengthCreator(10);

type PropsType = {};

export type MapPropsType = {
  newPostText: string;
  posts: Array<PostType>;
};

export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};

export type AddPostValueFormProps = {
  newPostText: string;
  addPost: (newPostText: string) => void;
  posts: Array<PostType>;
};

type AddPostValuesFormKeysType = GetStringCase<AddPostValueFormProps>;

const AddNewPostForm: React.FC<InjectedFormProps<AddPostValueFormProps, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostValuesFormKeysType>("Enter your post", "newPostText", Textarea, [requiredField, maxLength10])}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm<AddPostValueFormProps, PropsType>({form: "profileAddNewPostForm"})(AddNewPostForm);

const MyPosts: React.FC<AddPostValueFormProps & DispatchPropsType> = React.memo(props => {

  let onAddPost = (values: AddPostValueFormProps) => {
    props.addPost(values.newPostText);
  };

  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id}/>
  ));

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.post}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;