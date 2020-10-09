import React, { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';

type PropsType = {
    status: string;
    updateProfileStatus: (status: string) => void;
};

const ProfileStatusWithHooks:React.FC<PropsType> = (props) => {

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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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