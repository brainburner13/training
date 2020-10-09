import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import {getUserProfile, getProfileStatus, updateProfileStatus, savePhoto, saveProfile} from '../../Redux/Profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/authRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/Redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getProfileStatus: (userId: number) => void;
  updateProfileStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
  userId: string;
};

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

  refrashProfile() {
    let userId: number | null = +this.props.match.params.userId;
    if(!userId) {
      userId = this.props.userId;
      if(!userId) {
        this.props.history.push('/login');
      };
    };

    if(!userId) {
      throw new Error('ID should exist in URI params or in state');  
    } else {
      this.props.getUserProfile(userId);
      this.props.getProfileStatus(userId);
    };
  };

  componentDidMount() {
    this.refrashProfile();
  };

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps,{getUserProfile, getProfileStatus, updateProfileStatus, savePhoto, saveProfile}),
  withRouter,
  WithAuthRedirect
) (ProfileContainer);