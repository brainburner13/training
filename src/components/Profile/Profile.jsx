import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './My posts/MyPostsContainer';

const Profile = (props) => {

    return (
      <div>
      <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateProfileStatus={props.updateProfileStatus}/>
      <MyPostsContainer/>
    </div>
    )
};

export default Profile;