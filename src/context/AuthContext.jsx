import { apiCallerAuthGet } from "@/api/ApiCaller";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();
const profileContext = createContext();
// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
export const useProfile = () => useContext(profileContext);

// Enhanced AuthProvider
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState(null);
	const [profile, setProfile] = useState(null);

	// Persist token to local storage
	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		if (storedToken) {
			setToken(storedToken);
			setIsAuthenticated(true);
		}

		const storedProfile = JSON.parse(localStorage.getItem("profile"));
		if (storedProfile) {
			setProfile(storedProfile);
		}
	}, []);

	// Login function
	const login = ({ token }) => {
		setToken(token);
		setIsAuthenticated(true);
		localStorage.setItem("authToken", token); // Persist token
	};

	const setProfileData = (profile) => {
		setProfile(profile);
		localStorage.setItem("profile", JSON.stringify(profile));
	}

	const getProfileData = () => {
		const storedProfile = localStorage.getItem("profile");
		if (storedProfile) {
			setProfile(JSON.parse(storedProfile));
		}
	}

	const updateProfile = (token) => {
		apiCallerAuthGet("/api/users/profile", token).then((res) => {
			if (res.status === 200) {
				setProfileData(res.data);
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	// Logout function
	const logout = () => {
		setToken(null);
		setIsAuthenticated(false);
		localStorage.removeItem("authToken"); // Clear token
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, token, login, logout, profile, setProfileData, updateProfile }}>
			{children}
		</AuthContext.Provider>
	);
};
