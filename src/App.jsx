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
import JobForm from './Components/JobForm';
import QuizPlay from './Components/QuizPlay';
import JobList from './Components/Joblist';
import ApplicantsList from './Components/ApplicantsList';
import MyPostedJobs from './Components/MyPostedJobs';
import SendMessage from './Components/SendMessage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/:id/recruiter-home" element={<RecruiterHome />} />
                <Route path="/:id/user-home" element={<UserHome />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/notification' element={<Notifi />} />
                <Route path='/usernav' element={<UserNav />} />
                <Route path='/userNoti' element={<UserNoti />} />
                <Route path="/quiz/:quizId" element={<QuizPlay />} />
                <Route path='/joblist' element={<JobList />} />
                <Route path='/quiz' element={<Quiz />} />
                <Route path='/hackathons' element={<Hackathons />} />
                <Route path='/internship' element={<Internship />} />
                <Route path='/jobform' element={<JobForm />} />
                <Route path='/sendmessage' element={<SendMessage />} />
                
                {/* Updated routes */}
                <Route path="/:id/recruiter-home/my-posted-jobs" element={<MyPostedJobs />} />
               
                <Route path="/job/:jobId/applicants" element={<ApplicantsList />} />

            </Routes>
        </Router>
    );
};

export default App;
