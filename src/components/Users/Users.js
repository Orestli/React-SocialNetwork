import React from 'react';
import {NavLink} from "react-router-dom";

function Users(props) {
    return (
        <div className="users-wrapper">
            <div>
                {
                    props.pages.map(p => {
                        return (
                            <span className={props.currentPage === p && "selectedPage"}
                                  onClick={(e) => {props.onPageChanged(p)}}>{p} </span>
                        )
                    })
                }
            </div>
            <ul className="users-list">
                {
                    props.users.map(data => {
                        return (
                            <li className="dialog">
                                <div>
                                    <NavLink to={'/profile/' + data.id}>
                                        <img src={data.photos.small != null ? data.photos.small : null} alt='ava'
                                             className={data.photo}/>
                                    </NavLink>
                                </div>
                                <div className="dialog-button">
                                    {
                                        data.followed ?
                                            <button disabled={props.followingInProgress.some(id => id === data.id)} onClick={() => {props.unfollow(data.id)}}><b>UNFOLLOW</b></button> :
                                            <button disabled={props.followingInProgress.some(id => id === data.id)} onClick={() => {props.follow(data.id)}}><b>FOLLOW</b></button>
                                    }
                                </div>
                                <div className="dialog-name">
                                    <p>Name: <b>{data.name}</b></p>
                                </div>
                                <div className="dialog-status">
                                    <p>Status: <b>{data.status}</b></p>
                                </div>
                                <div className="dialog-country">
                                    <p>Country: <b>{'data.location.country'}</b></p>
                                </div>
                                <div className="dialog-city">
                                    <p>City: <b>{'data.location.city'}</b></p>
                                </div>
                                <hr/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Users;