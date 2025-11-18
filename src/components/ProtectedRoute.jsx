import { useEffect, useState } from "react";
import { superbase } from "../utils/superbase";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: {session} } = await superbase.auth.getSession();
            setSession(session);
            setLoading(false);
        };
        setTimeout(() => {
            getSession();
        }, 1000)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-400">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session) return <Navigate to={'/login'} replace />

    return children
}

export default ProtectedRoute;