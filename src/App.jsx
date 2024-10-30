import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import Layout from './pages/Layout/layout';
import ContactUs from './pages/ContactUs';
import { Courses } from './pages/Courses';
import { About } from './pages/About';
import TrainingTeam from './pages/OurTrainingTeam';
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
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
