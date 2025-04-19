// src/context/Providers.js
import React from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "./Providers/AuthContext";
import { ProfileProvider } from "./Providers/ProfileContext";
import { store } from "@/features/store";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </AuthProvider>
    </Provider>
  );
};

export default Providers;
