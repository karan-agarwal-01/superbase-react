import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { superbase } from "../utils/superbase";

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            await superbase.auth.getSession();
            const { data: { user } } = await superbase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }
            
            if (user.app_metadata?.provider !== 'email') {
                setProfile({
                    name: user.user_metadata.name || user.user_metadata.full_name || "No Name",
                    avatar_url: user.user_metadata.avatar_url || user.user_metadata.picture,
                    bio: user.user_metadata.bio,
                    provider: user.app_metadata.provider,
                    email: user.user_metadata.email
                })
                setLoading(false);
                return;
            }
                
            const { data, error } = await superbase.from("profiles").select("*").eq("uuid", user.id).single();
            console.log(data)
            if (error) {
                setLoading(false);
                return;
            }
            setProfile({
                name: data.name,
                avatar_url: data.avatar_url,
                bio: data.bio,
                provider: user.app_metadata.provider,
                email: user.user_metadata.email
            })
            setLoading(false);
        };
        loadProfile();
    }, []);

    const handleLogout = async () => {
        await superbase.auth.signOut();
        toast.success("Logout successfully")
        window.location.href = "/login";
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-400">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-400">
                <div className="bg-white p-6 shadow-xl rounded-xl text-center max-w-sm w-full">
                    <h1 className="text-xl font-semibold text-gray-800">Profile not created</h1>
                    <a href="/create-profile" className="text-blue-600 mt-3 inline-block font-medium">Create your profile</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-400 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center relative">
                <div className="flex justify-center">
                    <img src={profile.avatar_url} alt="avatar" className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover -mt-20" />
                </div>
                <h1 className="text-2xl font-bold mt-6 text-gray-900">{profile.name}</h1>
                <h1 className="text-gray-600 mt-2 px-4">{profile.email}</h1>
                <p className="text-gray-600 mt-2 px-4">Signed in with {profile.provider || user.app_metadata.provider}</p>
                <p className="text-gray-600 mt-2 px-4">{profile.bio || "No bio added yet."}</p>
                <div className="my-6 border-b"></div>
                <div className="flex gap-4 justify-center">
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 cursor-pointer">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
