import React from 'react'
import { useState,useEffect } from 'react'
import { Api, updateLikes } from "../API/Api"
import "./home.css"
import { NavLink,useNavigate,useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import { format } from 'timeago.js';

export const Home = () => {
    const [posts, setposts] = useState([]);
    const [forceRender, setForceRender] = useState(0);
    const navigate = useNavigate();
    const user = window.localStorage.getItem("userLogin");
    const location = useLocation();
    const { pathname } = location;
    const param = pathname.split("/")[1];
    console.log(param)

    //setting the posts data in state and added states of button, button color to every post data
    useEffect(()=>{
        collectData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceRender]);
    
    const collectData = async() => {
        const fetchedData=await Api();
        console.log(sort(fetchedData));
        setposts(sort(fetchedData));
    }

    const btnChange = async(id) => {
        let data = posts[id];
        let response;
        console.log(data);
        if (data.liked) {
            data.liked = false;
            data.likes--;
            response = await updateLikes(id + 1, data);
        }
        else {
            data.liked = true;
            data.likes++;
            response=await updateLikes(id+1,data);
        }
        if (response) {
            setForceRender(forceRender + 1);
        } else {
            alert("Something went wrong");
        }
    }


    function sort(posts){
        for(var x=1;x<posts.length;x++){
            let key=posts[x].likes;
            let ans=posts[x];
            let y=x-1;

            while(y>=0 && posts[y].likes<key){

                posts[y+1]=posts[y];
                y-=1;
            }
            posts[y+1]=ans;
        }
        return posts;
    }

    //Storing postId and UserId in local storage for Api fetching purpose
    const sendPostId=(id,userId)=>{
        navigate(`/post/${id}`,{state:{postId:id,userId:userId}});
    }

    const gotoCommentsPage = (id) => { 
        navigate(`/comments/${id}`);
    }

    return (
        <div>
            <Header/>
            {posts.length ? 

                <div className="posts">
                    {posts.map((post,index)=>{
                        return(
                            <div className="card col-11 col-xs-11 col-sm-11 col-md-5 col-lg-3 cardBox" key={post.id}>

                                <span className="badge bg-light text-dark">{format(new Date(post.createdAt).getTime())}</span>

                                <div className="card-body">
                                    <h5 className="card-title text-primary" onClick={()=>sendPostId(post.id,post.userId)} style={{cursor:"pointer"}}>{post.title}</h5>
                                    <p className="card-text">{post.body}</p>
                                    <span className="badge bg-info text-light">{post.likes}</span>
                                    {user==="true" ? <button className={`mx-3 btn ${post.liked?"btn-danger":"btn-success"}`} onClick={()=>btnChange(index)}>{post.liked?"Unlike":"Like"}</button>:<span></span>}
                                    
                                    <button className="btn btn-primary my-3 mx-2" onClick={()=>gotoCommentsPage(post.id)}>View Comments</button>
                                </div>

                            </div>
                        
                        );
                    })}
                </div>
            :
                <div className="d-flex justify-content-center col-10 mx-5 my-5">
                    No feeds found
                {/* <strong>Loading...</strong>
                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div> */}
            </div>}

        </div>
        
    )
}
