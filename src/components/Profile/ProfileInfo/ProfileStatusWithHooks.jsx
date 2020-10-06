import React from 'react';
import { useState, useEffect } from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true)
    };

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateProfileStatus(status)
    };

    const onStatusChange = (e) => {
          setStatus(e.currentTarget.value)
    };

    return (
        <>
            {!editMode && (
            <div>
               <b>Status: <span onDoubleClick={activateEditMode}>{status || '---'}</span></b>
            </div>
            )}
            {editMode && (
             <div>
                <input onChange={onStatusChange} value={status} autoFocus={true} onBlur={deactivateEditMode}></input>
            </div>
            )}
        </>
    )
};

export default ProfileStatusWithHooks;