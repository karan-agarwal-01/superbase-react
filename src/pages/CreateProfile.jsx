import { useForm } from "react-hook-form";
import AuthLayout from "../layout/AuthLayout";
import { useState } from "react";
import { superbase } from "../utils/superbase";
import { toast } from "react-hot-toast";

const CreateProfile = () => {

    const { register, handleSubmit, formState: {errors, isSubmitting}  } = useForm();
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } 
    };

    const onSubmit = async (data) => {
        try {
            const { data: { user } } = await superbase.auth.getUser();
            if (!user) {
                toast.error("You must be logged in")
                return;
            }

            const profileImage = data.image[0];
            const filename = `${user.id}-${Date.now()}`;

            const { error: imageError } = await superbase.storage.from("profile-images").upload(filename, profileImage);
            
            if (imageError) {
                console.log(imageError);
                toast.error("Image upload error")
            }

            const { data: publicUrl } = superbase.storage.from("profile-images").getPublicUrl(filename);
            const avatarUrl = publicUrl.publicUrl;

            const { error: insertError } =  await superbase.from("profiles").insert({
                uuid: user.id,
                name: data.fullname,
                bio: data.bio,
                avatar_url: avatarUrl
            })

            if (insertError) {
                console.log(insertError);
                toast.error("profile saving failed");
                return;
            }

            toast.success('Profile created successfully');
            window.location.href = "/";
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <AuthLayout title={"Create Profile"} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input type="text" {...register("fullname", {required: "fullname is required"})} className={`w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none ${errors.fullname ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500 border-gray-300" }`} />
                {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea {...register("bio", {required: "bio is required"})} rows={4} className={`w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none ${errors.bio ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500 border-gray-300" }`}></textarea>
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <input type="file" accept="image/*" {...register("image", {required: "profile image is required"})} onChange={handleImageChange} className={`w-full cursor-pointer border rounded-lg px-3 py-2 focus:ring-2 outline-none ${errors.image ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500 border-gray-300" }`} />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                { imagePreview && (
                    <div className="mt-3">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                    </div>
                )}
            </div>
            <button type="submit" className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70" disabled={isSubmitting}>Create Profile</button>
        </AuthLayout>
    );
}

export default CreateProfile;