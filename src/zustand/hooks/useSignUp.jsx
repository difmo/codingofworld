import useAuthStore from "../store/authStore";
import { signUpWithEmail } from "../firebase/authService";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const navigate = useNavigate();
  const { setLoading, setError, setSuccess, resetMessages } = useAuthStore();

  const waitForEmailVerification = async (user) => {
    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(interval);
        setSuccess("Email successfully verified!");
        navigate("/loginscreen");
      }
    }, 5000);
  };

  const handleSignUp = async (name, email, password) => {
    resetMessages();
    setLoading(true);
    try {
      const user = await signUpWithEmail(name, email, password);
      setSuccess("Verification email sent! Please check your inbox.");
      waitForEmailVerification(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp };
};

export default useSignUp;
