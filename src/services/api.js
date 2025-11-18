import { toast } from "react-hot-toast";
import { superbase } from "../utils/superbase"

export const registerUser = async (email, password) => {
    const { data, error } = await superbase.auth.signUp({
        email, password
    })
    if (error) {
        toast.error(error.message);
    }
    return data;
}

export const loginuser = async (email, password) => {
    const { data, error } = await superbase.auth.signInWithPassword({
        email, password
    })
    if (error) {
        toast.error(error.message)
    }
    return data;
}

export const loginWithGoogle = async () => {
    const { data, error } = await superbase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: '/'
        }
    })
    if (error) {
        toast.error(error.message)
    }
    return data;
}

export const loginWithLinkedin = async () => {
    const { data, error } = await superbase.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: {
            redirectTo: 'https://lgbdxcyyyoljcfhufqft.supabase.co/auth/v1/callback'
        }
    })
    if (error) {
        toast.error(error.message)
    }
    return data;
}