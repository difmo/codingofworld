import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AlldetailCourese from "../pages/AlldetailCourese";
import CourseDetails from "../pages/CourseDetails";
import InternshipDetails from "../pages/InternshipDetails";
import Courses from "../pages/Courses";
import ShowCourseDetails from "../pages/ShowTuteCourses/Pages/ShowCourseDetail";
import ShowTopicDetailPage from "../pages/ShowTuteCourses/Pages/Topics/ShowTopicDetailPage";
import ShowCourseLayout from "../pages/ShowTuteCourses/Layout/ShowCourseLayout";
import NotFound from "../pages/NotFound";
import CreateCourseLayout from "../pages/CreateCourses/Layout/CreateCourseLayout";
import AllCoursesPage from "../pages/CreateCourses/Pages/AllCoursesPage";
import TopicDetailPage from "../pages/CreateCourses/Pages/Topics/TopicDetailPage";
import CreateNewCourse from "../pages/CreateCourses/Pages/CreateNewCourse";
import AddTopicPage from "../pages/CreateCourses/Pages/Topics/AddTopicPage";
import SubtopicDetailPage from "../pages/CreateCourses/Pages/Topics/SubtopicDetailPage";
import SubtopicPage from "@/pages/ShowTuteCourses/Pages/Topics/ShowSubTopicDetailsPage";
import RouteConstants from "@/constants/routeConstants/RouteConstants";

const CourseRoutes = () => {
  const [isUserLogin, setIsUserLogin] = useState(null);

  return <>
    <Routes>
      <Route path={RouteConstants.COURSEROUTE.COURSE} element={<Courses />} />
      {/* <Route path={RouteConstants.COURSEROUTE.ALLCOURSES} element={<AlldetailCourese />} /> */}
      <Route path="/details/:id" element={<CourseDetails />} />
      <Route path="/internship/:id" element={<InternshipDetails />} />
      <Route element={<ShowCourseLayout />}>

        <Route
          path="/show-courses/:courseId"
          element={<ShowCourseDetails />}
        />
        <Route
          path="/show-courses/:courseId/topic/:topicId"
          element={<ShowTopicDetailPage />}
        />
        <Route
          path="/show-courses/:courseId/topic/:topicId/subtopic/:subtopicId"
          element={<SubtopicPage />}
        />
      </Route>


      {isUserLogin ? (
        <Route element={<CreateCourseLayout />}>
          <Route path="/all-course" element={<AllCoursesPage />} />
          <Route path="/create-course" element={<CreateNewCourse />} />
          <Route
            path="/usercourse/:courseId/add-topic"
            element={<AddTopicPage />}
          />
          <Route
            path="/usercourse/:courseId/topic/:topicId"
            element={<TopicDetailPage />}
          />
          <Route
            path="/usercourse/:courseId/topic/:topicId/subtopic/:subtopicId/*"
            element={<SubtopicDetailPage />}
          />
        </Route>
      ) : (
        <Route path="*" element={<NotFound />} />
      )}
    </Routes>
  </>
}



export default CourseRoutes;
