import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import {requiredField, maxLengthCreator} from '../../../utils/validators/validators';
import { Textarea } from '../../Common/Preloader/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name={"newPostText"}
          placeholder={"Enter your post"}
          validate={[requiredField, maxLength10]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm({ form: "profileAddNewPostForm" })(
  AddNewPostForm
);

const MyPosts = React.memo(props => {

  let onAddPost = (values) => {
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