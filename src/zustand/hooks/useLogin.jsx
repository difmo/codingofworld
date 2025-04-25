import useAuthStore from "../store/authStore";
import { loginWithEmail } from "../firebase/authService";

const useLogin = () => {
  const { setLoading, setError, resetMessages } = useAuthStore();

  const handleLogin = async (email, password) => {
    resetMessages();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin };
};

export default useLogin;
