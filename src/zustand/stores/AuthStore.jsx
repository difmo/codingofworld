import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: "",
  success: "",

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
  resetMessages: () => set({ error: "", success: "" }),
  clearUser: () => set({ user: null }),
}));

export default useAuthStore;
