import {instance, APIResponseType} from './api';
import { PhotosType, ProfileType } from '../types/types';

type SavePhotoResponseDataType = {
    photos: PhotosType,
};

export const profileAPI = {

    getProfile(userId: number) {
        return instance
        .get<ProfileType>(`profile/` + userId).then(response => response.data)
    },

    getStatus(userId: number) {
        return instance
        .get<string>(`profile/status/` + userId).then(response => response.data)
    },

    updateStatus(status: string) {
        return instance
        .put<APIResponseType>('profile/status', {status: status}).then(response => response.data)
    },

    savePhoto(photos: any) {
        const formData = new FormData();
        formData.append('image', photos)
        return instance
        .put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {headers: {'Content-type': 'multipart/form-data'}}).then(response => response.data)
    },

    saveProfile(profileData: ProfileType) {
        return instance
        .put<APIResponseType<PhotosType>>('profile', profileData).then(response => response.data)
    },
};