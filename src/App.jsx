import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import PricingPlans from "./pages/PricingPlans";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import BlogPost from "./pages/BlogPost";
import ForgetPassword from "./pages/ForgetPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import Emergency from "./pages/Emergency";
import TermsCondition from "./pages/TermsCondition";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState, userState } from "./atom/state";
import { apiCallerAuthGet } from "./api/ApiCaller";
import Feedback from "./pages/Feedback";
import BlogList from "./pages/BlogList";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import PrivacyPolicy from "./pages/PrivacyPolicy";

import ReactGA from "react-ga4";
import PrivacyPolicy from "./pages/PrivacyPolicy";

ReactGA.initialize("G-YFLEKGC5XY");

const App = () => {
	const [profile, setProfile] = useRecoilState(userState);
	const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
	useEffect(() => {
		const updateProfile = () => {
			const token = localStorage.getItem("authToken");
			if (token) {
				apiCallerAuthGet("/api/users/profile/", token)
					.then((res) => {
						if (res.status === 200) {
							setProfile(res.data);
							setIsAuthenticated(true);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				setProfile(null);
			}
		};
		updateProfile();
	}, []);

	return (
		<Flex direction="column" height="100vh" overflow="hidden">
			{/* <Header /> */}
			<Box as="main" overflow="auto">
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/terms" element={<TermsCondition />} />
					<Route path='/privacy-policy' element={<PrivacyPolicy />} />
					<Route path="/emergency" element={<Emergency />} />
					<Route path="/forget-password" element={<ForgetPassword />} />
					<Route path="/otp-verification" element={<OtpVerification />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route path="/feedback" element={<Feedback />} />

					<Route
						path="/c/new"
						element={
							<AuthProvider>
								<Dashboard isNewChart={true} />
							</AuthProvider>
						}
					/>
					<Route
						path="/c/:id"
						element={
							<AuthProvider>
								<Dashboard />
							</AuthProvider>
						}
					/>

					<Route
						path="/login"
						element={
							<GoogleOAuthProvider clientId="73746778952-o30s5ivnkpq9hm6f8e5kqkod9pdksj0b.apps.googleusercontent.com">
								<SignInPage />
							</GoogleOAuthProvider>
						}
					/>

					<Route
						path="/signup"
						element={
							<>
								<GoogleOAuthProvider clientId="73746778952-o30s5ivnkpq9hm6f8e5kqkod9pdksj0b.apps.googleusercontent.com">
									<SignUpPage />
								</GoogleOAuthProvider>
							</>
						}
					/>
					<Route path="/pricing-plans" element={<PricingPlans />} />
					<Route path="/blogs-list" element={<BlogList />} />
					<Route path="/blogs/:id" element={<BlogPost />} />
				</Routes>
			</Box>
		</Flex>
	);
};

export default App;
