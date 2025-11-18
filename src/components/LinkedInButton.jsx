import { loginWithLinkedin } from "../services/apis";

const LinkedInButton = () => (
    <button type="button" onClick={() => loginWithLinkedin()} className="cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 py-2 my-2 rounded-lg hover:bg-gray-100 transition">
      <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="Linkedin" className="w-5 h-5" />
      <span>Continue with LinkedIn</span>
    </button>
  );
  
  export default LinkedInButton;