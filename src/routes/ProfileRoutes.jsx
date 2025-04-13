import ProfileLayout from "@/pages/ProfilePages/ProfileLayout";
import CommunitySection from "@/pages/ProfilePages/ProfilePages/CummunityPages";
import EditProfileForm from "@/pages/ProfilePages/ProfilePages/EditProfile";
import UserProfile from "@/pages/ProfilePages/UserProfile";
import { Route, Routes } from "react-router-dom";



const UserProfileRoute = () => {


  return (
    <Routes>
      <Route element={<ProfileLayout />}>
        <Route path="/" element={<UserProfile />} />
        <Route path="/community-section" element={<CommunitySection />} />
        <Route path="/edit-profile" element={<EditProfileForm />} />
        <Route path="/certificates" element={<CommunitySection />} />
      </Route>

    </Routes>
  );
};

export default UserProfileRoute;
