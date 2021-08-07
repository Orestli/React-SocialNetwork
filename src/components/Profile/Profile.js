import React from "react";
import '../main.css'
import Preloader from "../common/Preloader/Preloader";

function Post(props) {
    return (
        props.posts.map(data => {
            return (
                <div><p>{data.value} (Views: {data.views})</p></div>
            )
        })
    )
}

function Profile(props) {
    if (!props.profile) {
        return <Preloader />
    }

    const newPostElement = React.createRef();

    function onAddPost() {
        const value = newPostElement.current.value;
        props.addPost(value);
    }

    function onChangPost() {
        const value = newPostElement.current.value;
        props.updatePost(value);
    }

    debugger
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
                <p>Status: {props.profile.aboutMe}</p>
            </div>
            <div>
                <textarea ref={newPostElement} onChange={onChangPost} value={props.newPostText} />
            </div>
            <div>
                <button onClick={onAddPost}>Click</button>
            </div>
            <Post posts={props.posts} />
        </div>
    )
}

export default Profile;
