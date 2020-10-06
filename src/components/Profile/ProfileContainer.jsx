import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {getUserProfile, getProfileStatus, updateProfileStatus, savePhoto, saveProfile} from '../../Redux/Profile-reducer';
import { withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/authRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  refrashProfile() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = this.props.userId;
      if(!userId) {
        userId = this.props.history.push('/login');
      };
    };
    this.props.getUserProfile(userId);
    this.props.getProfileStatus(userId);
  };

  componentDidMount() {
    this.refrashProfile();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refrashProfile();
    };
  };

  render() {
    return (
      <Profile {...this.props} 
        savePhoto={this.props.savePhoto}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile} 
        status={this.props.status} 
        updateProfileStatus={this.props.updateProfileStatus}
        saveProfile={this.props.saveProfile}/>
    )
  };
};

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps,{getUserProfile, getProfileStatus, updateProfileStatus, savePhoto, saveProfile}),
  withRouter,
  WithAuthRedirect
) (ProfileContainer);