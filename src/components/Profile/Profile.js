import React, {useState} from "react";
import '../main.css'
import Preloader from "../common/Preloader/Preloader";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Element} from "../common/FormsContorls/FormsContorls";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultAvatar from '../../assets/images/default_ava.png'
import {ProfileData, ProfileDataFormRedux} from "./ProfileData";

const Post = (props) => (
    [...props.posts].reverse().map(data => {
        return (
            <div><p>{data.value} (Views: {data.views})</p></div>
        )
    })
);

const Textarea = Element('textarea')
const maxLength10 = maxLengthCreator(10)

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'messageContent'} placeholder={'Enter your message'} validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Click</button>
            </div>
        </form>
    )
}

AddNewPostForm = reduxForm({form: 'AddNewPostForm'})(AddNewPostForm)

function Profile(props) {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader />
    }

    function addNewPost(value) {
        props.addPost(value.messageContent);
    }

    const updatePhoto = (e) => {
        props.updatePhoto(e.target.files[0])
    }

    const onSubmit = (formData) => {
        props.updateProfile(formData)
            .then(() => {
                setEditMode(false)
            })
    }

    return (
        <div style={{padding: "20px"}}>
            <div className="wallpaper">
                <figure className="td-figure">
                    <img src="https://wallpapercave.com/wp/wp4462545.jpg" alt="Image" className="img-main" />
                </figure>
            </div>
            <div className="author">
                <img className={'main-photo'} src={props.profile.photos.large || defaultAvatar} alt=""/>
                {props.isOwner && <input type={'file'} onChange={updatePhoto}/>}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
                {editMode ?
                    <ProfileDataFormRedux initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={props.profile} isOwner={props.isOwner} editMode={() => {setEditMode(true)}}/>}
            </div>
            <AddNewPostForm onSubmit={addNewPost}/>
            <Post posts={props.posts} />
        </div>
    )
}

export default Profile;
