import { apiCallerAuthGet, apiCallerPost } from "@/api/ApiCaller";
import { authState, userState } from "@/atom/state";
import  { createContext, useContext, useState, useEffect } from "react";
import { useRecoilState } from "recoil";


// Create AuthContext
const AuthContext = createContext();
const profileContext = createContext();
// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
export const useProfile = () => useContext(profileContext);

// Enhanced AuthProvider
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
	const [token, setToken] = useState(null);
	const [profile, setProfile] = useRecoilState(userState);


	const verifyRefreshToken = async(token,refreshToken)=>{
		if(token && refreshToken){
		const response =	await apiCallerPost('/api/token/verify/',{
			 "token": token
		})
		if(response.status===200){
			setToken(token);
			updateProfile(token)
			setIsAuthenticated(true);
		}else{
			const refreshResponse = await apiCallerPost('/api/token/refresh/',{
				'refresh': refreshToken
			})
			if (refreshResponse.status===200) {
				setToken(refreshResponse.data.access);
				localStorage.setItem('authToken', refreshResponse.data.access)
				localStorage.setItem('refresh',refreshResponse.data.refresh)
				updateProfile(token)
				setIsAuthenticated(true);
			}
		}
		
		}else{
			window.location.href='/login'
		}
	}
	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		const refreshToken = localStorage.getItem('refreshToken')
		verifyRefreshToken(storedToken,refreshToken)

	}, []);

	const login = ({ token }) => {
		setToken(token);
		setIsAuthenticated(true);
		localStorage.setItem("authToken", token); // Persist token
	};

	const updateProfile = (token) => {
		apiCallerAuthGet("/api/users/profile/", token).then((res) => {
			if (res.status === 200) {
				setProfile(res.data);
			}
		}).catch((err) => {
			console.log(err);
		})
	}
	// Logout function
	const logout = () => {
		setToken(null);
		setIsAuthenticated(false);
		localStorage.removeItem("authToken"); 
		localStorage.removeItem("profile"); 
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, token,  logout, profile,  updateProfile,setToken }}>
			{children}
		</AuthContext.Provider>
	);
};
