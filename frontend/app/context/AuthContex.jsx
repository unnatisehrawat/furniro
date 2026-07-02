"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                
                await axios.get("http://localhost:5000/api/auth/verify", {
                    withCredentials: true // MUST send cookies
                });
                setIsAuthenticated(true);
            } catch (error) {
                
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
            setIsAuthenticated(false);
            router.push("/admin");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);

export const AuthGuard = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/admin");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl font-medium text-gray-600 animate-pulse">Verifying Access...</div>
            </div>
        );
    }

    
    if (!isAuthenticated) {
        return null; 
    }

    
    return children;
};
