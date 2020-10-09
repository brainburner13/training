import { actions } from '../../../Redux/Profile-reducer';
import MyPosts, { MapPropsType, DispatchPropsType } from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../Redux/Redux-store';

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostCreater}) (MyPosts);

export default MyPostsContainer;