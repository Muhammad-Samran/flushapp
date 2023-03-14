import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, createContext, useState, useEffect } from "react";
import CreatePost from "./Pages/Feed/Post/create/CreatePost";
import "./App.css";
import Signup from "./Pages/Signup/Signup";
import Signin from "./Pages/Signin/Signin";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import Home from "./Pages/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import OnBoarding from "./Components/PersonalOnboarding/OnBoarding";
import PersonalProfile from "./Pages/PersonalProfile/PersonalProfileRouter";
import { authorize } from "./Redux/AuthSlice";
import Feed from "./Pages/Feed/Feed";
import "react-toastify/dist/ReactToastify.css";
import Page404 from "./Pages/Page404/Page404";
import BusinessProfile from "./Pages/BusinessProfile/BusinessProfileRouter";
import Loader from "./Components/UI/Loader/Loader";
import Layout from "./Components/global/Dashboard/Layouts/Layout";
import Text from "./Text";
// import JobListing from "./Pages/JobListing/JobListing";
// import JobListingGrid from "./Pages/JobListingGrid/JobListingGrid";
// import JobListingDetail from "./Pages/JobListingDetail/JobListingDetail";
// import SavedJobs from "./Pages/SavedJobs/SavedJobs";
// import AppliedJobs from "./Pages/AppliedJobs/AppliedJobs";
import AppliedJobsEdit from "./Pages/AppliedJobsEdit/AppliedJobsEdit";
import JobPossitionPage from "./Pages/JobPossitionPage/JobPossitionPage";
import JobArchitecturePage from "./Pages/JobArchitecturePage/JobArchitecturePage";
import JobArchitectureDetailPage from "./Pages/JobArchitectureDetailPage/JobArchitectureDetailPage";
import Jobs from "./Pages/Jobs/JobsRouter";
import TrendingBusinessesPage from "./Pages/TrendingBusinessesPage/TrendingBusinessesPage";
import FindFriendsPage from "./Pages/FindFriendsPage/FindFriendsPage";
import AddMembersPage from "./Pages/AddMembersPage/AddMembersPage";
import UpcomingEventPage from "./Pages/UpcomingEventPage/UpcomingEventPage";
import CommunityPage from "./Pages/CommunityPage/CommunityPage";
import ContactFormModel from "./Pages/ContactFormModel/ContactFormModel";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import ChatPage from "./Pages/ChatPage/ChatPage";
import CreateJobPage from "./Pages/CreateJobPage/CreateJobPage";
import EditJobPage from "./Pages/EditJobPage/EditJobPage";
import RatingPage from "./Pages/RatingPage/RatingPage";
import ServicesDetailPage from "./Pages/ServicesDetailPage/ServicesDetailPage";
import CommunityAnswers from "./Pages/CommunityAnswers/CommunityAnswers";
import JobArchivePage from "./Pages/JobArchivePage/JobArchivePage";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
const CreateBusiness = React.lazy(() =>
  import("./Pages/CreateBusiness/CreateBusiness")
);
const Services = React.lazy(() => import("./Pages/Services/ServicesRouter"));
export const BuildContext = createContext();
function App() {
  const [build] = React.useState(process.env.NODE_ENV);

  const dispatch = useDispatch();
  // useEffect(() => {
  (async function () {
    dispatch(authorize());
  })();
  // }, [dispatch]);
  const userId = useSelector((state) => state.auth.userId);

  return (
    <BuildContext.Provider value={build}>
      <div className="App">
        <Routes>
          <Route path="/test/" element={<Text />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Signin />} />
          <Route path="/on-boarding/*" element={<OnBoarding />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/business/*" element={<BusinessProfile />} />
          <Route path="/profile/*" element={<PersonalProfileRouter />} />
          <Route path="/jobs/*" element={<Jobs />} />
          <Route path="/applied-jobs-edit" element={<AppliedJobsEdit />} />
          <Route path="/jobs-position" element={<JobPossitionPage />} />
          <Route path="/jobs-applicants" element={<JobArchitecturePage />} />
          <Route path="/trending" element={<TrendingBusinessesPage />} />
          <Route path="/find_friends" element={<FindFriendsPage />} />
          <Route path="/add_members" element={<AddMembersPage />} />
          <Route path="/upcoming_events" element={<UpcomingEventPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/contact" element={<ContactFormModel />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/create-job" element={<CreateJobPage />} />
          <Route path="/edit-job" element={<EditJobPage />} />
          <Route path="/rating" element={<RatingPage />} />
          {/* <Route path="/services-detail" element={<ServicesDetailPage />} /> */}
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/answer-form" element={<CommunityAnswers />} />
          {/* <Route path="/upload-resume" element={<UploadResume />} /> */}
          {/* <Route path="/archiveJobs" element={<JobArchivePage />} /> */}
          <Route
            path="/job-applicants-detail"
            element={<JobArchitectureDetailPage />}
          />
          <Route
            path="/create-business/*"
            element={
              <Suspense fallback={<Loader />}>
                <CreateBusiness />
              </Suspense>
            }
          />
          <Route
            path="/services/*"
            element={
              <Suspense fallback={<Loader />}>
                <Services />
              </Suspense>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
    </BuildContext.Provider>
  );
}
const PersonalProfileRouter = () => {
  const { authorizing, isAuthorized, userId } = useSelector(
    (state) => state.auth
  );
  if (authorizing) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route
        path=""
        element={<Navigate to={userId ? `/profile/${userId}` : "/login"} />}
      />
      <Route path=":id/*" element={<PersonalProfile />} />
    </Routes>
  );
};
export default App;
