import React,{useState,useEffect} from 'react'
import { NavLink,useLocation } from 'react-router-dom';
import { addNewComment, queryGetter } from '../API/Api';
import { format } from 'timeago.js';

export default function Comments() {
    
    //Using react hooks to set states for changeable items
    const [comments,setcomments]=useState([]);
    const [user,setuser]=useState(false);
    const [typedComment, settypedComment] = useState("");
    const location = useLocation();
    const param = location.pathname.split("/")[2];
    const userName = window.localStorage.getItem("userName");

    //Fetches Comment data from API
    useEffect(() => {
        getComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const getComments = async () => {
        let response = await queryGetter(param, "comments");
        response===false?alert("Failed to fetch comments"):setcomments(response);
        // console.log(response);
    }

    //Storing the values to typedComment state while typing
    const handleChange =(event)=>{
        settypedComment(event.target.value);
    }

    //when user clicks add comment comment gets posted in comments section.
    const addComment=async()=>{
        let obj={};
        obj.name=userName;
        obj.body=typedComment;
        obj.id = comments.length + 1;
        obj.postedAt=new Date();

        let res = comments;;
        res.push(obj);
        let response = await addNewComment(param, res);
        response===false?alert("Failed to add comment"):setcomments(response);
        
        // setcomments([...comments,...res]);
        settypedComment("");

    }

    //Function to add comment when submit button was clicked
    const handleSubmit=(event)=>{
        event.preventDefault();
        addComment();
    }
    

    return (
        
        <div style={{width:"100%"}} className="d-flex flex-column justify-content-center">
            {comments.length ? (
                    <div>
                        <h3 className="commentHeadTitle text-center">Comments</h3>

                        <div className="commentsSection container">

                            {comments.map((comment)=>{
                                return(
                                    <div className="comment bg-light" key={comment.id}>
                                        <h5 className="text-dark px-3 pt-3">{comment.body}</h5>
                                        <h6 className="commentTitle px-3 text-dark">Posted by:<strong style={{ color: "teal" }} className="px-2">{comment.name}</strong></h6>
                                        <h6 className='px-3 text-dark pb-3'>CreatedAt:<strong style={{color:"teal"}} className="px-2">{format(new Date(comment.postedAt).getTime())}</strong></h6>
                                    </div>
                                );
                            })}



                        </div>

                    </div>
            ):
                <div className='text-center'>No comments found</div>}
            
                {user && <div className="d-flex  justify-content-center">
                    <form className="text-center col-6 mx-5 my-5" onSubmit={(event)=>handleSubmit(event)}>
                        <input type="text" className="form-control" value={typedComment} onChange={(event)=>handleChange(event)}/>
                        <input type="submit" className="btn btn-success my-3" />
                    </form>

                </div>}
                <div className='text-center'>
                    <button className="btn btn-warning text-white text-center my-3" onClick={()=>setuser(true)}>Add Comment</button>
                    <NavLink to="/"><button className="btn btn-secondary mx-3 my-3">Home</button></NavLink>
                </div>
            </div>
    )
}
