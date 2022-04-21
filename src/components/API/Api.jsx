import axios from 'axios';

const url = "https://jsonplaceholder.typicode.com";
const newUrl = "https://625d83a14c36c753577625a4.mockapi.io/posts";


//Fetching data for posts and Single post
export const Api=async(id)=>{
    let changeableUrl;
    if(id){
        changeableUrl=`${newUrl}/${id}`;
    }
    else{
        changeableUrl=newUrl;
    }
    const fetchPosts = await axios.get(changeableUrl);
   const {data}=fetchPosts;
   return data;
}

export const updateLikes = async (id,data) => {
   
    const updateLikes = await axios.put(`${newUrl}/${id}`, data);
    if (updateLikes.status === 200) { 
        return true;
    }
    else {
        return false;
    }
}
//Fetching data of Users to display in single Page
export const UserApi=async()=>{
    const userId=window.localStorage.getItem("userId");
    const fetchUserData= await axios.get(`${url}/users/${userId}`);
    const {data}=fetchUserData;
    return data;
}

//Fetching data of comments for a post
export const queryGetter=async(id,queryParameter)=>{
    try {
        const {data}= await axios.get(newUrl + "/" + id);
        return data[queryParameter];
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export const addNewComment = async (id, newComment) => {
    const body = {
        comments:newComment
    }
    try {
        const {data} = await axios.put(newUrl+"/" + id, body);
        return data["comments"]
    } catch (error) {
        console.log(error);
        return false;
    }
}
export const addNewPost = async (postData) => {
    try {
        let response = await axios.post(newUrl + "/",postData);
        console.log(response);
        return response["status"];
    }
    catch (err) {
        console.log("Error Ocurred", err);
    }
}