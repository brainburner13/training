import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import unknownUser from '../../../../src/assets/images/unknownUser.png';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({profile, status, updateProfileStatus, isOwner, savePhoto, saveProfile}) => {

  let [editMode, setEditMode] = useState(false);

  if(!profile) {
    return <Preloader/>
  };

  const onMainPhotoSelected = (e) => {
    if(e.target.files) {
      savePhoto(e.target.files[0])
    };
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    })
  };

  const ProfileData = ({ profile, isOwner, goToEditMode}) => {
    return (
      <div>
        {isOwner && 
        <div>
          <button onClick={goToEditMode}>Edit</button>
        </div>}
        <div>
          <div>
            <b>Full name:</b> {profile.fullName}
          </div>
          <div>
            <b>About me:</b> {profile.aboutMe}
          </div>
          <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}
          </div>
          {profile.lookingForAJob && (
            <div>
              <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
          )}
          <div>
            <b>Contacts:</b>{" "}
            {Object.keys(profile.contacts).map((key) => {
              return (
                <Contacns
                  key={key}
                  contactTitle={key}
                  contactValue={profile.contacts[key]}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const Contacns =({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
  };

  return (
    <div className={s.descriptionBlock}>
      <div>
        <img src={profile.photos.large || unknownUser} alt='' className={s.mainPhoto}/>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
        {editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> 
                  : <ProfileData goToEditMode={() => {setEditMode(true)}} 
                                 profile={profile} 
                                 isOwner={isOwner}/>}
      </div>
      <div>
          <ProfileStatusWithHooks
            status={status}
            updateProfileStatus={updateProfileStatus}
          />
      </div>
    </div>
  )
};

export default ProfileInfo;