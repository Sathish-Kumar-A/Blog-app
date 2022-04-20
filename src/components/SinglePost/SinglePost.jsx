import React from 'react';
import "./singlePost.css";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Api, UserApi } from '../API/Api';
import Comments from '../Comments/Comments';
import Header from '../Header/Header';

export default function SinglePost() {
    const [users,setusers]=useState({});
    const [post, setpost] = useState({});
    const location = useLocation();
    const {pathname } = location;
    const postId=pathname.split("/")[2];

    // const postId=window.localStorage.getItem("postId");

    //Fetching User data
    useEffect(() => {
        assignUsersData();
        getPostData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const assignUsersData = async() =>{
        setusers(await UserApi())
    }
    
    
    const getPostData = async () => {
        setpost(await Api(postId));
    }

    return (
        <div>
            <Header/>
            {post ? 
            (<div className="singlePost">
                <div>

                    <div className="userPhoto text-center my-4">
                        <i className="postProfilePhoto fas fa-user-circle"></i>
                        <h3 className="text-primary my-2">@anonymous_user</h3>
                        <h3 className="text-warning my-2">Learner</h3>
                    </div>

                    <div className="userDetails text-center">
                        <h5 className="userInfo my-1"><i className="mx-3 text-muted fab fa-searchengin"></i>blog.com</h5>
                        <h5 className="userInfo my-1"><i className="mx-3 text-muted fas fa-envelope-open-text"></i>anonymous@blogs.com</h5>
                        <h5 className="userInfo my-1"><i className="mx-3 text-muted fas fa-phone-alt"></i>0000007880</h5>
                    </div>
                    <hr className="container col-10" />

                </div>

                <div className="post my-5">
                    <h2 className="text-center text-primary" >{post.title}</h2>
                    <p className="postBody text-center">{post.body}</p>
                </div>

                <hr className="container col-10"/>

                <Comments />
            </div>

        ):<>Loading...</>}
        </div>
        
    )
}
