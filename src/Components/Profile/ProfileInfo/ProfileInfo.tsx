import React, {ChangeEvent, FC, useState} from "react";
import s from './ProfileInfo.module.css';
import {ContactsType, ProfileType} from "../../../Redux/Store";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user-avatar.jpg";
import Preloader from "../../common/Preloader/Preloader";
import ProfileDataForm from "./ProfileDataForm";

export type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: () => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: React.FC<PropsType> = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then()
        setEditMode(false)
    }

    return (
        <div>
            <div>
                <img
                    src={'https://static9.depositphotos.com/1594308/1110/i/600/depositphotos_11107478-stock-photo-fantasy.jpg'}
                    alt={'#'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile?.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }}
                                   isOwner={isOwner} profile={profile}/>}

                <ProfileStatusWithHooks
                    profile={profile} status={status} updateStatus={updateStatus}/>
            </div>

        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean,
    goToEditMode: () => void
}
const ProfileData : FC<ProfileDataPropsType>= ({profile, isOwner, goToEditMode}) => {
    return <div>

        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}

        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {
            profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key}
                            contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}

        </div>
    </div>

}

const Contact = ({contactTitle, contactValue}: any) => {
    return <div className={s.contact}><b>{contactTitle}</b>:{contactValue}</div>
}

export default ProfileInfo