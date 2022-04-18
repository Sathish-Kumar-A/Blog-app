import './App.css';
import { BrowserRouter, Routes,Route,Navigate } from "react-router-dom";
import { Home } from "./components/home/Home";
import SinglePost from "./components/SinglePost/SinglePost";
import Login from "./components/LoginPage/Login";
import Comments from './components/Comments/Comments';
import Newpost from "./components/NewPost/Newpost";

const Authenicate = ({ children }) => {
  const userLogged =window.localStorage.getItem("userLogin");
  return (
  <div>
      {userLogged === "true" ?
        children : <Navigate to="/login" />}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={
            <Authenicate>
              <SinglePost />
            </Authenicate>}
          />

          <Route path="/comments" element={
            <Authenicate>
              <Comments />
            </Authenicate>}
          />

          <Route path="/newpost" element={
            <Authenicate>
              <Newpost />
            </Authenicate>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
