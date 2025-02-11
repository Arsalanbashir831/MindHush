import  { useState } from "react";
import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Image,
	Input,
	Separator,
	Text,
	VStack,
	useBreakpointValue,
	HStack,
	Spinner,
} from "@chakra-ui/react";
import { apiCallerAuthGet, setAuthToken } from "@/api/ApiCaller";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import { InputGroup } from "@/components/ui/input-group";
import { LuKey, LuMail } from "react-icons/lu";
import { PasswordInput } from "@/components/ui/password-input";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router";
import Logo from "@/components/Logo";
import { apiCallerPost } from "@/api/ApiCaller";
import { authState } from "@/atom/state";
import { useRecoilState } from "recoil";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";


const SignInPage = () => {

	const navigate = useNavigate();
	// const { login,  setProfileData } = useAuth();
const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState)
	const flexDirection = useBreakpointValue({ base: "column", md: "row" });
	const formWidth = useBreakpointValue({ base: "100%", md: "40%" });
	const formAlignItems = useBreakpointValue({ base: "center" });
	const formJustifyContent = useBreakpointValue({
		base: "center",
		md: "flex-start",
	});
	const logoWidth = useBreakpointValue({ base: "270px", md: "270px" });

	// Form state
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	// Handle input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Handle form submission
	const handleSubmit = async () => {
		setIsLoading(true);
		setError("");
		try {
			const response = await apiCallerPost("/api/token/", formData);
		
			if (response?.status === 200 && response?.data?.access) {
				// Save token in auth context or local storage
				// login({ token: response.data.access });
        		setAuthToken(response.data.access); // Set token globally
				localStorage.setItem('authToken', response.data.access)
				localStorage.setItem('refreshToken',response.data.refresh)
				setIsAuthenticated(true)
				navigate("/c/new");
				
				// const responseProfile = await apiCallerAuthGet("/api/users/profile/", response.data.access);

				// if (responseProfile?.status === 200) {
				// 	setProfileData(responseProfile.data);
				// 	console.log(responseProfile.data);
				// 	navigate("/c/new");
				// }
				// else{
				// 	throw new Error("Login failed. Please check your credentials.");
				// }
				
			} else {
				throw new Error("Login failed. Please check your credentials.");
			}
		} catch (err) {
			setError(err.response?.data?.detail || "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLoginSuccess = async (response) => {
		console.log("Google Login Successful:", response);
		try {
		apiCallerPost("/api/users/google-auth/", { id_token: response.credential }).then((res) => {
			if (res.status === 200) {
				console.log("Login Successful:", res.data);
				localStorage.setItem("authToken", res.data.access);
				localStorage.setItem("refreshToken", res.data.refresh);
				setIsAuthenticated(true)
				navigate("/c/new");
			} else {
				console.error("Backend Error:", res.data.error);
				throw new Error(res.data.error || "Google Login failed");
			}
		})
		} catch (err) {
		  console.error("Error:", err.message || "Google Login failed");
		  setError(err.message || "Google Login failed");
		} 
	  };



	
	
	return (
		<Container maxW='100vw' h='100vh' p={0} position='relative'>
			<Box alignSelf='flex-start' w={logoWidth} mx={10} mt={4} mb={0}>
				<Logo />
			</Box>
			{/* Sign In Button */}
			{isLoading ? <> <Flex justify={'center'} height={'100vh'} alignItems={'center'}>
									<Spinner size={'xl'}/>
								</Flex>  </>:<>
			<Flex
				h='full'
				direction={flexDirection}
				align={formAlignItems}
				justify={formJustifyContent}>
				{/* Left side with image */}
				<Box
					w={{ base: "100%", md: "60%" }}
					h='90%'
					display={{ base: "none", md: "flex" }}
					alignSelf='stretch'
					alignItems='center'
					justifyContent='center'
					position='relative'
					overflow='hidden'
					p={5}>
					<Image
						src='/signup-bg.png'
						alt='AI Assistant Illustration'
						objectFit='cover'
						w='full'
						h='full'
						borderRadius={{ base: "none", md: "18px" }}
					/>
				</Box>

				{/* Right side with form */}
				<Box
					w={formWidth}
					py={{ base: 6, md: 8 }}
					px={{ base: 6, md: 0 }}
					h='100vh'
					my='auto'
					overflowY='auto'
					css={{
						"&::-webkit-scrollbar-thumb": {
							background: "transparent",
						},
					}}>
					<VStack maxW='400px' mx='auto' gapY={10}>
						<VStack align='stretch' spaceY={{ base: 6, md: 8 }} w='full'>
							{/* Form Header */}
							<Box textAlign='left'>
								<Heading
									color='white'
									fontWeight='bold'
									fontSize={{ base: "4xl", md: "6xl" }}
									mb={10}
									mt={{ base: 6, md: 0 }}>
									SIGN IN
								</Heading>
								<Text
									color='white'
									fontWeight='bold'
									fontSize={{ base: "sm", md: "md" }}
									mb={4}>
									Sign in with your email address
								</Text>

								<Text fontSize='sm' color='gray.400'>
									Dont have account ?{" "}
									<Text as='span' color='purple.600'>
										<Link to='/signup'>Register</Link>
									</Text>
								</Text>
							</Box>

							{/* Form Fields */}
							<VStack gapY={4} align='stretch'>
								{/* Email Input */}
								<InputGroup
									flex='1'
									startElement={<LuMail />}
									w='full'
									size='lg'>
									<Input
										name='email'
										placeholder='Yourname@gmail.com'
										size='lg'
										variant='filled'
										bg='secondary.50'
										border='1px solid #8692A6'
										w='full'
										onChange={handleChange}
									/>
								</InputGroup>

								{/* Password Input */}
								<InputGroup flex='1' startElement={<LuKey />} w='full'>
									<PasswordInput
										name='password'
										placeholder='Password'
										size='lg'
										variant='filled'
										bg='secondary.50'
										border='1px solid #8692A6'
										w='full'
										onChange={handleChange}
									/>
								</InputGroup>

								{/* Error Message */}
								{error && (
									<Text color='red.500' fontSize='sm' textAlign='center'>
										{error}
									</Text>
								)}

								
									<Button
									w='full'
									size='lg'
									color='white'
									border='none'
									bg='linear-gradient(to right, #7B2C97, #008080)'
									_hover={{
										opacity: 0.9,
									}}
									mt={2}
									onClick={handleSubmit}>
									Sign in
								</Button>
							
								
								<Text onClick={()=>{navigate('/forget-password')}} cursor={'pointer'} textAlign={'right'} color={'purple.600'}>Forget Password</Text>

								{/* Separator */}
								<Separator my={4} borderColor='secondary.30' />

								<Text fontSize='sm'>Or continue with</Text>

								{/* Social Login Buttons */}
								<HStack gap={4} justify="center" w="full">
      {/* Custom Google Login Button */}
     

	  <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={()=>{console.log('Login Failed')}}/>
    </HStack>

								{/* Terms and Conditions */}
								<Text fontSize='sm' mt={4}>
									By signing in you agree to our{" "}
									<a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: "#805AD5" }}>
		Terms and Conditions
	</a>
									<br/>
									 <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#805AD5" }}>
		Privacy Policy
	</a>
								</Text>
							</VStack>
						</VStack>
					</VStack>
				</Box>
			</Flex>
			</>}
								
		</Container>
	);
};

export default SignInPage;
