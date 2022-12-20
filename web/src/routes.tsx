import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyInformation from "./pages/Company/CompanyInformation";
import CompanyJobs from "./pages/Company/CompanyJobs";
import CreateJob from "./pages/Company/CreateJob";
import CompanyDashboard from "./pages/Company/Dashboard";
import Home from "./pages/Home";
import JobCandidates from "./pages/Jobs/JobCandidates";
import CompanyJobPage from "./pages/Jobs/JobPage/CompanyJobPage";
import UserJobPage from "./pages/Jobs/JobPage/UserJobPage";
import CompanySearchJobs from "./pages/Jobs/JobSearchPages/CompanySearchJobs";
import UserSearchJobs from "./pages/Jobs/JobSearchPages/UserSearchJobs";
import LogIn from "./pages/LogIn";
import CompanySignUp from "./pages/SignUp/CompanySignUp";
import UserSignUp from "./pages/SignUp/UserSignUp";
import Certifications from "./pages/User/Certifications";
import UserDashboard from "./pages/User/Dashboard";
import Education from "./pages/User/Education";
import Experiences from "./pages/User/Experiences";
import UserInformation from "./pages/User/UserInformation";
import UserJobs from "./pages/User/UserJobs";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />

        <Route path="/sign-up/company" element={<CompanySignUp />} />
        <Route path="/sign-up/user" element={<UserSignUp />} />

        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/information" element={<CompanyInformation />} />
        <Route path="/company/jobs/create" element={<CreateJob />} />
        <Route path="/company/jobs/search" element={<CompanySearchJobs />} />
        <Route path="/company/MyJobs" element={<CompanyJobs />} />
        <Route path="/company/jobs/:id" element={<CompanyJobPage />} />
        <Route path="/company/jobs/:id/candidates" element={<JobCandidates />} />

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/information" element={<UserInformation />} />
        <Route path="/user/education" element={<Education />} />
        <Route path="/user/certification" element={<Certifications />} />
        <Route path="/user/experience" element={<Experiences />} />
        <Route path="/user/jobs/search" element={<UserSearchJobs />} />
        <Route path="/user/MyJobs" element={<UserJobs />} />
        <Route path="/user/jobs/:id" element={<UserJobPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;