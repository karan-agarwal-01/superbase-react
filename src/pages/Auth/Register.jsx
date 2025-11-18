import { useForm } from "react-hook-form";
import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import GoogleButton from "../../components/GoogleButton";
import LinkedInButton from "../../components/LinkedInButton";
import { registerUser } from "../../services/apis";

const Register = () => {

    const { register, handleSubmit, watch, formState: {errors, isSubmitting} } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await registerUser(data.email, data.password)
            if (res.user !== null) {
                toast.success('user registered successfully');
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthLayout title={'Register Account'} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" {...register("email", {required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }})} className={`w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none ${errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500 border-gray-300" }`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" {...register("password", {required: "Password is required", minLength: { value: 8, message: "At least 8 characters" }})} className={`w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none ${errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500 border-gray-300" }`} />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" {...register("cpassword", {required: "Please confirm your password", minLength: { value: 8, message: "At least 8 characters" }, validate: (value) => value === watch("password") || "Password do not match"})} className={`w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none ${errors.cpassword ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500 border-gray-300" }`} />
                {errors.cpassword && <p className="text-red-500 text-sm mt-1">{errors.cpassword.message}</p>}
            </div>
            <button type="submit" className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70" disabled={isSubmitting}>Register</button>
            <GoogleButton />
            <LinkedInButton />
            <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account ? <span onClick={() => navigate("/login")} className="text-indigo-600 cursor-pointer font-medium">Login</span>
            </p>
        </AuthLayout>
    );
}

export default Register;