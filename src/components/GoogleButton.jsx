import { loginWithGoogle } from "../services/apis";

const GoogleButton = () => (
    <button type="button" onClick={() => loginWithGoogle()} className="cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 py-2 my-2 rounded-lg hover:bg-gray-100 transition">
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
      <span>Continue with Google</span>
    </button>
  );
  
  export default GoogleButton;