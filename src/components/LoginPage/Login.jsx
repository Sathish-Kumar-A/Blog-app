import React,{useState} from 'react'
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import "./login.css";
import { NavLink,useNavigate } from 'react-router-dom';

//Storing users in the array when user logined
const users=[];
var userChecker=false;

export default function Login() {
    const location = useLocation();
    const { pathname } = location;
    console.log(pathname);
    const navigate = useNavigate();
    const[userName,setuserName]=useState("");

    //event to set username 
    const handleChange=(event)=>{
        setuserName(event.target.value);
    }

    //Storing users in users array
    const loginRegister=()=>{
        if(userName.length){
            if(users.length===0){
                users.push(userName);
                userChecker= true;
            }
            else{
                
                for (var x of users){
                    if(x===userName){
                        userChecker= true;
                    }
                    else if(x==users[users.length-1]){
                        users.push(userName);
                        userChecker= true;
                        
                    }
                }
            }
            //Setting the username and userPresent values in local storage to ensure user is present or not
            window.localStorage.setItem("userLogin",userChecker);
            window.localStorage.setItem("userName",userName);
            setuserName("");
            if (pathname === "/login") {
                navigate("/");
            }
            else {
                navigate(pathname);
            }
        }
        else {
            alert("Enter username")
        }

    }
    
    return (
        <div>

            <Header />

            <div className="loginBox ">

                <div className="loginContainer">

                    <div className="mb-3 inputBox">
                        <label for="exampleFormControlInput1" className="form-label loginLabel">Enter Username</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" value={userName} placeholder="eg.john Durai" onChange={(event)=>handleChange(event)} />
                    </div>

                    <div className="d-flex">
                    
                        <button className="loginBtn btn btn-primary mx-3 my-3" onClick={()=>loginRegister()}>Login</button>
                        <NavLink to="/"><button className="btn btn-secondary mx-3 my-3">Home</button></NavLink>

                    </div>

                </div>

            </div>
        </div>
    
    )
}
