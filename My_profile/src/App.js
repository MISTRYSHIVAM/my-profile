import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Friend from './components/Friend';
import Notification from './components/Notification';
import Job from './components/Job';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Post from './components/PostCreate';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import RegPersonalinfo from './components/RegPersonalinfo';
import RegStatusSkill from './components/RegStatusSkill';
import RegProfilePhoto from './components/RegProfilePhoto';
import Try from './components/Try';
import UserProfile from './components/UserProfile';
import Updateprofilepic from './components/Updateprofilepic';
import Pagereg from './pages/Pagereg';
import Admin from './components/Admin';
import Chat from './components/Chatwithfriends';
import Forgetpassword from './components/Forgetpassword';
import Aboutcompany from './components/Aboutcompany';

function App() {
  // const navbar1 = ["Friends","Job","Notifications","Me(Profile)"]
  return (
    <>
      <div className="font-mono">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Login />} ></Route>
            <Route exact path='/home' element={<Home />} ></Route>
            <Route exact path='/fpassword' element={<Forgetpassword />} ></Route>
            <Route exact path='/registration' element={<Registration />} ></Route>
            <Route exact path='/regpersonalinfo' element={<RegPersonalinfo />} ></Route>
            <Route exact path='/regstatusskill' element={<RegStatusSkill />} ></Route>
            <Route exact path='/regprofilephoto' element={<RegProfilePhoto />} ></Route>
            <Route exact path='/upprofilephoto' element={<Updateprofilepic />} ></Route>
            <Route exact path='/friends' element={<Friend />} ></Route>
            <Route exact path='/notifications' element={<Notification />} ></Route>
            <Route exact path='/jobs' element={<Job />} ></Route>
            <Route exact path='/post' element={<Post />} ></Route>
            <Route exact path='/profile' element={<Profile />} ></Route>
            <Route exact path='/try' element={<Try />} ></Route>
            <Route exact path='/userProfile' element={<UserProfile />} ></Route>
            <Route exact path='/pagereg' element={<Pagereg />} ></Route>
            <Route exact path='/admin' element={<Admin />} ></Route>
            <Route exact path='/chatroom' element={<Chat />} ></Route>
            <Route exact path='/about' element={<Aboutcompany />} ></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
