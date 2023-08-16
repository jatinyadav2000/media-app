import { auth, provider } from "../configuration/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      
      // You can add navigation logic here after successful login
      navigate('/dashboard'); // Replace '/dashboard' with the appropriate route
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="center-container">
      <div>
        <p>Sign In With <span>Google To Continue</span></p>
        <div className="btn-box">
            <button className="btn" onClick={signInWithGoogle}>Sign In</button>
        </div>
      </div>
    </div>
  );
};
