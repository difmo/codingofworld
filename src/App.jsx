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
import StartTcsNqt from './pages/AllCourses/TcsNqtCourse/StartTcsNqt';
import FindSmallestElement from './pages/AllCourses/TcsNqtCourse/Questions/OnArray/FindSmallestElement';
// Import other pages as needed

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
          <Route path="/starttcsnqt" element={<StartTcsNqt />} />
          <Route path="/findsmallestelement" element={<FindSmallestElement />} />
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
