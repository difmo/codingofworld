// src/context/Providers.js
import { AuthProvider } from "../context/Providers/AuthContext";
import { ProfileProvider } from "../context/Providers/ProfileContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
        {children}
      </ProfileProvider>
    </AuthProvider>
  );
};

export default Providers;
