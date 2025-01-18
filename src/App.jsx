import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import RecruiterHome from './Components/RecruiterHome';
import UserHome from './Components/UserHome';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import UserNav from './Components/UserNav';
import UserNoti from './Components/UserNoti';
import UserPorfile from './Components/UserPorfile';
import Notifi from './Components/Notifi';
import Quiz from './Components/Quiz';
import Hackathons from './Components/Hackathons';
import Internship from './Components/Internship';
import Job from './Components/Job';
import TakeQuiz from './Components/Takequiz';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/recruiter-home" element={<RecruiterHome />} />
                <Route path="/user-home" element={<UserHome />} />
                <Route path="/signup" element={<Signup/>}/>
                <Route path='/Profile' element={<Profile/>}/>
                <Route path='/notification' element={<Notifi/>}/>
                <Route path='/usernav' element={<UserNav/>}/>
                <Route path='/userNoti' element={<UserNoti/>}/>
                <Route path='/quiz' element={<Quiz/>}/>
                <Route path='/hackathons' element={<Hackathons/>}/>
                <Route path='/internship' element={<Internship/>}/>
                <Route path='/job' element={<Job/>}/>
            </Routes>
        </Router>
    );
};

export default App;
