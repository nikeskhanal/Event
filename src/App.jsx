import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import RecruiterHome from './Components/RecruiterHome';
import UserHome from './Components/UserHome';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import UserNav from './Components/UserNav';

import UserPorfile from './Components/UserPorfile';
import Quiz from './Components/Quiz';
import Hackathons from './Components/Hackathons';
import Internship from './Components/Internship';
import JobForm from './Components/JobForm';
import QuizPlay from './Components/QuizPlay';
import JobList from './Components/JobList';
import ApplicantsList from './Components/ApplicantsList';
import MyPostedJobs from './Components/MyPostedJobs';

import QuizResult from './Components/QuizResult';
import MyPostedQuiz from './Components/MyPostedQuiz';
import CreateHackathon from './Components/CreateHackathon';
import MyCreatedHackathon from './Components/MyCreatedHackathon';
import HackathonParticipantList from './Components/HackathonParticipantList';
import FetchProfile from './Components/Fetchprofile';
import AdminPage from './Components/AdminPage';
import AdminQuiz from './Components/AdminQuiz';
import AdminHackathons from './Components/AdminHackathons';
import AdminJob from './Components/AdminJob';
import UserResults from './Components/UserResults';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/recruiter-home" element={<RecruiterHome />} />
                <Route path="/user-home" element={<UserHome />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Profile route should be dynamic */}
                <Route path="/profile" element={<Profile />} />

                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin-quiz" element={<AdminQuiz />} />
                <Route path="/admin-hackathons" element={<AdminHackathons />} />
                <Route path="/admin-jobs" element={<AdminJob />} />





                <Route path="/profilees" element={<FetchProfile />} />
                <Route path="/usernav" element={<UserNav />} />
                <Route path="/userprofile" element={<UserPorfile />} />
               
                <Route path="/play-quiz" element={<QuizPlay />} />
                <Route path="/joblist" element={<JobList />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/hackathons" element={<Hackathons />} />
                <Route path="/internship" element={<Internship />} />
                <Route path="/jobform" element={<JobForm />} />

                <Route path="/my-quizzes" element={<MyPostedQuiz />} />
                <Route path="/my-hackathons" element={<MyCreatedHackathon />} />
                <Route path="/quiz/results/:quizId" element={<QuizResult />} />
                <Route path="/user/results/:quizId" element={<UserResults />} />
                <Route path="/create-hackathon" element={<CreateHackathon />} />
                <Route path="/hackathon/:hackathonId/participants" element={<HackathonParticipantList />} />

            
                <Route path="/my-posted-jobs" element={<MyPostedJobs />} />
                <Route path="/job/:jobId/applicants" element={<ApplicantsList />} />

                
                <Route path="/profile/:id" element={<FetchProfile />} />

            </Routes>
        </Router>
    );
};

export default App;
