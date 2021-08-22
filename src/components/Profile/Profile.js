import React from "react";
import '../main.css'
import Preloader from "../common/Preloader/Preloader";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Element} from "../common/FormsContorls/FormsContorls";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

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
    if (!props.profile) {
        return <Preloader />
    }

    function addNewPost(value) {
        props.addPost(value.messageContent);
    }

    return (
        <div style={{padding: "20px"}}>
            <div className="wallpaper">
                <figure className="td-figure">
                    <img src="https://wallpapercave.com/wp/wp4462545.jpg" alt="Image" className="img-main" />
                </figure>
            </div>
            <div className="author">
                <img src={props.profile.photos.large} alt=""/>
                <p>Name: {props.profile.fullName}</p>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
            <AddNewPostForm onSubmit={addNewPost}/>
            <Post posts={props.posts} />
        </div>
    )
}

export default Profile;
