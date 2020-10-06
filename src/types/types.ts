export type contactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string;
  large: string;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: contactsType;
  photos: PhotosType;
};

export type UserType = {
  id: number;
  name: string;
  statu: string;
  ptotos: PhotosType;
};