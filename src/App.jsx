import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import Layout from './pages/Layout/layout';
import ContactUs from './pages/ContactUs';
import { Courses } from './pages/Courses';
import { About } from './pages/About';
import TrainingTeam from './pages/OurTrainingTeam';
import InternshipsSection from './pages/Internship';
import InternshipForm from './pages/IntershipForm';
import TcsNqtCourse from './pages/AllCourses/TcsNqtCourse/TcsNqtCoursedescri';
import NotFound from './pages/NotFound';
import Dummy from './pages/dummy';
import Sidebar from './pages/Layout/Sidebar';
import { useNavigate } from 'react-router-dom';
import First from './pages/Sidebarpages/First';
import Second from './pages/Sidebarpages/Second';
import Third from './pages/Sidebarpages/Third';
import TCSNQT from './pages/AllCourses/TcsNqtCourse/StartTcsNqt';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/trainingteam" element={<TrainingTeam />} />
          <Route path="/internship" element={<InternshipsSection />} />
          <Route path="/internshipform" element={<InternshipForm />} />
          <Route path="/tcsnqtcourse" element={<TcsNqtCourse />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dummy" element={<Dummy />} />
           {/* hellozdcdzx */}
          {/* Nested Routes with Sidebar */}
          <Route element={<SidebarLayout />}>
            <Route path="/home1" element={<First />} />
            <Route path="/about1" element={<Second />} />
            <Route path="/services1" element={<Third />} />
            <Route path="/starttcsnqt" element={<TCSNQT />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

const SidebarLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <Routes>
          <Route path="/home1" element={<First />} />
          <Route path="/about1" element={<Second />} />
          <Route path="/services1" element={<Third />} />
          <Route path="/starttcsnqt" element={<TCSNQT />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;





