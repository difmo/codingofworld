import React from "react";
import { Route, Routes } from "react-router-dom";
import JobsOfferPage from "../pages/JobsOfferPages/JobsOfferPage";

const JobsOfferRoute = () => (
    <>
        <Routes>
            <Route path="/all-jobs" element={<JobsOfferPage />} />
        </Routes>
    </>
);

export default JobsOfferRoute;
