import React, { useState } from "react";
import {
	Box,
	Container,
	Flex,
	HStack,
	Heading,
	Image,
	Input,
	Separator,
	Text,
	VStack,
	useBreakpointValue,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { PasswordInput } from "@/components/ui/password-input";
import { FaGoogle } from "react-icons/fa";
import { LuKey, LuMail, LuUser } from "react-icons/lu";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router";
import Logo from "@/components/Logo";
import { apiCallerPost } from "@/api/ApiCaller";

const SignUpPage = () => {
	const navigate = useNavigate();
	const flexDirection = useBreakpointValue({ base: "column", md: "row" });
	const formWidth = useBreakpointValue({ base: "100%", md: "40%" });
	const formAlignItems = useBreakpointValue({ base: "center" });
	const formJustifyContent = useBreakpointValue({
		base: "center",
		md: "flex-start",
	});
	const logoWidth = useBreakpointValue({ base: "100px", md: "150px" });

	// Form state
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		first_name: "",
		last_name: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Handle form input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Submit handler
	const handleSubmit = async () => {
		setIsLoading(true);

		const { email, password, first_name, last_name } = formData;
		if (!email || !password || !first_name || !last_name) {
			setError("Please fill in all the required fields.");
			return;
		}

		const body = {
			"email": email,
			"password": password,
			"first_name": first_name,
			"last_name": last_name,
		};

		console.log(body);
		
		setError("");
		try {
			const response = await apiCallerPost("/api/users/register/", body);
			console.log(response);
			
			if (response.status === 201) {
				alert("Registration successful!");
				navigate("/login");
			} else {
				
				const error = JSON.stringify(response.response.data);
				throw new Error(error || "Registration failed");
			}
		} catch (err) {
			setError(err.message || "Something went wrong. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container maxW='100vw' h='100vh' p={0} position='relative'>
			<Flex
				h='full'
				direction={flexDirection}
				align={formAlignItems}
				justify={formJustifyContent}>
				{/* Left side with form */}
				<Box
					w={formWidth}
					p={{ base: 6, md: 8 }}
					my='auto'
					h='100vh'
					overflowY='auto'
					css={{
						"&::-webkit-scrollbar-thumb": {
							background: "transparent",
						},
					}}>
					<VStack maxW='400px' mx='auto' gapY={10}>
						<Box alignSelf='flex-start' w={logoWidth} mt={{ base: 10, md: 0 }}>
							<Logo />
						</Box>
						<VStack align='stretch' spaceY={{ base: 6, md: 8 }} w='full'>
							{/* Form Header */}
							<Box textAlign='left'>
								<Heading
									color='white'
									fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
									mb={2}>
									Create an Account{" "}
									<span role='img' aria-label='wave'>
										👋
									</span>
								</Heading>
								<Text color='gray.400' fontSize={{ base: "sm", md: "md" }}>
									Kindly fill in your details to create an account
								</Text>
							</Box>

							{/* Form Fields */}
							<VStack gapY={4} align='stretch'>
								<Field label='Your first name' required>
									<InputGroup
										flex='1'
										startElement={<LuUser />}
										w='full'
										size='lg'>
										<Input
											name='first_name'
											type='text'
											placeholder='Enter your first name'
											size='lg'
											variant='filled'
											bg='secondary.50'
											border='1px solid #8692A6'
											onChange={handleChange}
										/>
									</InputGroup>
								</Field>

								<Field label='Last Name' required>
									<InputGroup
										flex='1'
										startElement={<LuUser />}
										w='full'
										size='lg'>
										<Input
											name='last_name'
											type='text'
											placeholder='Enter your last name'
											size='lg'
											variant='filled'
											bg='secondary.50'
											border='1px solid #8692A6'
											onChange={handleChange}
										/>
									</InputGroup>
								</Field>

								<Field label='Email address' required>
									<InputGroup
										flex='1'
										startElement={<LuMail />}
										w='full'
										size='lg'>
										<Input
											name='email'
											type='email'
											placeholder='Enter your email'
											size='lg'
											variant='filled'
											bg='secondary.50'
											border='1px solid #8692A6'
											onChange={handleChange}
										/>
									</InputGroup>
								</Field>

								<Field label='Create a password' required>
									<InputGroup
										flex='1'
										startElement={<LuKey />}
										w='full'
										size='lg'>
										<PasswordInput
											name='password'
											placeholder='Password'
											size='lg'
											variant='filled'
											bg='secondary.50'
											border='1px solid #8692A6'
											onChange={handleChange}
										/>
									</InputGroup>
								</Field>

								{/* Checkbox */}
								<Checkbox
									colorPalette='purple'
									size='md'
									color='gray.400'
									alignSelf='flex-start'
									fontSize={{ base: "sm", md: "md" }}>
									I agree to terms & conditions
								</Checkbox>

								{/* Error Message */}
								{error && (
									<Text color='red.500' fontSize='sm' textAlign='center'>
										{error}
									</Text>
								)}

								{/* Register Button */}
								<Button
									w='full'
									size='lg'
									bg='primary'
									color='white'
									_hover={{ bg: "teal.600" }}
									rounded='2xl'
									mt={2}
									isLoading={isLoading}
									onClick={handleSubmit}>
									Register Account
								</Button>
							</VStack>
						</VStack>
					</VStack>
				</Box>

				{/* Right side with illustration */}
				<Box
					w={{ base: "100%", md: "60%" }}
					h='full'
					display={{ base: "none", md: "flex" }}
					alignItems='center'
					justifyContent='center'
					position='relative'
					overflow='hidden'>
					<Image
						src='/signin-bg.png'
						alt='Sign-in Illustration'
						objectFit='cover'
						w='full'
						h='full'
						scale={1.1}
					/>
				</Box>
			</Flex>
		</Container>
	);
};

export default SignUpPage;
