import React from "react";
import {Field, reduxForm} from "redux-form";
import '../common/FormsContorls/FormsControls.css'
import {Element} from "../common/FormsContorls/FormsContorls";

export const ProfileData = ({profile, isOwner, editMode}) => {
    return (
        <div>
            {isOwner && <div><button onClick={editMode}>Edit</button></div>}
            <p>Name: <b>{profile.fullName}({profile.userId})</b></p>
            <p>About me: <b>{profile.aboutMe}</b></p>
            <p>Looking for a job: <b>{profile.lookingForAJob ? "Yes" : "No"}</b></p>
            <p>Skills: <b>{profile.lookingForAJobDescription}</b></p>

            <div className="contacts">
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <p className={'contact-field'}><b>{key}:</b> {profile.contacts[key]}</p>
            })}
            </div>
        </div>
    )
}

const Input = Element("input");

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {
                error && <span className={'form-summary-error'}>{error}</span>
            }
            <div>
                <button>Save</button>
            </div>
            <p>Name: <Field name={'fullName'} component={'input'}/></p>
            <p>About me: <Field name={'aboutMe'} component={'textarea'}/></p>
            <p>Looking for a job: <Field name={'lookingForAJob'} component={'input'} type={'checkbox'}/></p>
            <p>Skills: <Field name={'lookingForAJobDescription'} component={'input'}/></p>

            <div className="contacts">
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <p>{key}: <Field name={`contacts.${key}`} component={Input}/></p>
            })}
            </div>
        </form>
    )
}

export const ProfileDataFormRedux = reduxForm({form: 'profile'})(ProfileDataForm)
