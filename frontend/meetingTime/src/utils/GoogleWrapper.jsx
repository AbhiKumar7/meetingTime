import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginFront from "../pages/GoogleLoginFront";
import LoginPage from "../pages/LoginPage";


function GoogleWrapper() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      
      <LoginPage />
     
    </GoogleOAuthProvider>
  );
}

export default GoogleWrapper;
