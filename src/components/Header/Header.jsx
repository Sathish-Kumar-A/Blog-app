import React,{useState,useEffect} from 'react'
import { Link} from 'react-router-dom';


export default function Header() {
    var userChecker=window.localStorage.getItem("userLogin");
    var userNameGet=window.localStorage.getItem("userName")
    const [user,setuser]=useState("Login");
    const [userName,setuserName]=useState("")
    
    //React hook to update login or logout and username in header section
    useEffect(()=>{
        if(userChecker==="true"){
            setuser("Logout");
            setuserName(userNameGet);
        }
        else{
            setuser("Login");
            setuserName("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userChecker]);

    //when logout button was clicked userLogin is set to false 
   const loginChange=()=>{
        if(userChecker==="true"){
            window.localStorage.setItem("userLogin",false);
            
        }
        
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className="container-fluid">
        
            <h3 className="navbar-brand">Feeds</h3>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/newpost">New Post</Link>
                </li>
            </ul>
            

            <form className="d-flex">
            <h5 className="text-primary mx-2 mt-1 align-middle">{userName}</h5>
            <Link to="/login"><button className="btn btn-outline-secondary" type="text" onClick={()=>loginChange()}>{user}</button></Link>
            </form>
            </div>
        </div>
</nav>
    )
}
