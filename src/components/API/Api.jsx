import React from 'react'
import axios from 'axios'

const url = "https://jsonplaceholder.typicode.com";
const newUrl = "https://625d83a14c36c753577625a4.mockapi.io/";


//Fetching data for posts and Single post
export const Api=async(id)=>{
    let changeableUrl;
    if(id){
        changeableUrl=`https://jsonplaceholder.typicode.com/posts/${id}`;
    }
    else{
        changeableUrl=`https://jsonplaceholder.typicode.com/posts`;
    }
    const fetchPosts = await axios.get(newUrl + "posts");
    console.log(fetchPosts);
   const {data}=fetchPosts;
   return data;
}

//Fetching data of Users to display in single Page
export const UserApi=async()=>{
    const userId=window.localStorage.getItem("userId");
    const fetchUserData= await axios.get(`${url}/users/${userId}`);
    const {data}=fetchUserData;
    return data;
}

//Fetching data of comments for a post
export const CommentApi=async()=>{
    try{
        const id=window.localStorage.getItem("postId");
        const fetchCommentData=await axios.get(`${url}/posts/${id}/comments`)
        const {data}=fetchCommentData;
        return data;
    }
    catch(err){
        console.log("Error Ocurred",err);
    }
}

export const addNewPost = async (postData) => {
    try {
        await axios.post(newUrl + "posts");
    }
    catch (err) {
        
    }
}