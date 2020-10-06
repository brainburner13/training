import React from 'react';
import { reduxForm } from 'redux-form';
import {createField, Input, Textarea} from '../../Common/Preloader/FormsControls/FormsControls';
import s from './ProfileInfo.module.css';
import style from '../../Common/Preloader/FormsControls/FormsControls.module.css';

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
        <div>
          <button>Save</button>
        </div>
        {error && <div className={style.formSummaryError}>{error}</div>}
        <div>
          <div>
            <b>Full name:</b> {createField('Full name', 'fullname', Input, [])}
          </div>
          <div>
            <b>About me:</b> {createField('About me', 'aboutMe', Textarea, [])}
          </div>
          <div>
            <b>Looking for a job:</b> {createField('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
          </div>
          <div>
            <b>My professional skills:</b> {createField('My professional skills', 'lookingForAJobDescription', Textarea, [])}
          </div>
          <div>
            <b>Contacts:</b>{" "}
            {Object.keys(profile.contacts).map((key) => {
              return (
                <div key={key} className={s.contact}>
                    <b>{key}:</b> {createField(key, 'contacts.' + key, Input, [])}
                </div>
              );
            })}
          </div> 
        </div>
      </form>
    )
};

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataReduxForm;