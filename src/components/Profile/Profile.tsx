import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './My posts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
  saveProfile: (profile: ProfileType) => Promise<any>;
  savePhoto: (file: File) => void;
  isOwner: boolean;
  profile: ProfileType | null;
  status: string;
  updateProfileStatus:  (status: string) => void;
};

const Profile: React.FC<PropsType> = (props) => {

    return (
      <div>
      <ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateProfileStatus={props.updateProfileStatus}/>
      <MyPostsContainer/>
    </div>
    )
};

export default Profile;