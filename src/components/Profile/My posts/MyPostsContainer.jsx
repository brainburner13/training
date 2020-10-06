import { actions } from '../../../Redux/Profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
};

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      let action = actions.addPostCreater(newPostText);
      dispatch(action);
    }
  }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;