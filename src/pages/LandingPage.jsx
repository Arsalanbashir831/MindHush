import React from "react";
import {
	Badge,
	Box,
	Button,
	Container,
	Grid,
	Heading,
	HStack,
	Stack,
	Text,
	VStack,
	Flex,
	Image,
	Link,
	IconButton,
} from "@chakra-ui/react";
import AuthButtons from "@/components/AuthButtons";
import StepCard from "@/components/StepCard";
import AboutUsSection from "@/components/AboutUsSection";
import TestimonialSection from "@/components/TestimonialSection";
import PricingCards from "@/components/PricingCards";
import { PRICING_PLANS } from "@/constants";
import BlogsSection from "@/components/BlogsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Logo from "@/components/Logo";
import { useNavigate } from "react-router";
import { BiLogoTiktok } from "react-icons/bi";

const LandingPage = () => {
	const navigate = useNavigate();
	return (
		<Box
			bg='#040608'
			minH='100vh'
			h='100vh'
			color='white'
			overflowY='auto'
			position='relative'
			zIndex={1}
			_before={{
				content: '""',
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				backgroundImage: "url('/robot.svg')",
				backgroundRepeat: "no-repeat",
				transform: "rotateY(180deg)",
				height: "450px",
				backgroundSize: "contain",
				backgroundPositionX: "100%",
				zIndex: -1,
			}}
			_after={{
				content: '""',
				position: "absolute",
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: "url('/robot.svg')",
				backgroundRepeat: "no-repeat",
				height: "450px",
				backgroundSize: "contain",
				backgroundPositionX: "100%",
				zIndex: -1,
			}}>
			<Image
				src='/stars_bg.svg'
				alt=''
				position='absolute'
				top={0}
				left='50%'
				transform='translate(-50%, -50%)'
				zIndex={-1}
			/>
			{/* Header */}
			<HStack justifyContent='flex-end' p={2}>
				<AuthButtons />
			</HStack>

			<Container pt={20} px={0}>
				{/* Hero Section */}
				<VStack
					h='100vh'
					w='full'
					textAlign='center'
					position='relative'
					bg='linear-gradient(to bottom, #04060800, #040608)'>
					<VStack
						alignItems='center'
						justifyContent='center'
						bg='rgba(0, 0, 0, 0.6)'
						h={{ base: "auto", sm: "70vh" }}
						w={{ base: "auto", sm: "100%" }}
						maxW='breakpoint-sm'
						backgroundImage="url('/hero-section-bg.png')"
						backgroundSize='cover'
						p={8}>
						<Badge
							bg='#040608'
							color='white'
							rounded='full'
							px={2}
							py={1}
							display='flex'
							alignItems='center'
							size='xs'>
							<Box
								as='span'
								bg='white'
								w='3'
								h='3'
								display='flex'
								alignItems='center'
								justifyContent='center'
								rounded='full'>
								<Box
									as='span'
									bg='#A064DA'
									w='1.5'
									h='1.5'
									display='inline-block'
									rounded='full'
								/>
							</Box>
							Free version Available
						</Badge>

						<Heading as='h1' size='5xl' lineHeight='1.2'>
							Your Path to Peace of Mind Starts Here
						</Heading>
						<Text fontSize='xs' color='gray.400' mx='auto'>
							Your trusted companion for mental wellness.
							<br />
							Offering simple, heartfelt support to guide you toward a calmer,
							happier you.
						</Text>

						<Stack
							direction={{ base: "column", sm: "row" }}
							justify='center'
							my={10}>
							<Button
								bg='primary'
								color='white'
								rounded='full'
								_hover={{ bg: "teal.500" }}
								onClick={() => navigate("/login")}>
								Get Started
							</Button>
							<Button
								bg='gray.800'
								color='white'
								rounded='full'
								_hover={{ bg: "gray.700" }}
								onClick={() => navigate("/pricing-plans")}>
								View Pricing
							</Button>
						</Stack>
					</VStack>
				</VStack>

				{/* Steps Section */}
				<Box py={{ base: 12, md: 16 }} px={{ base: 4, md: 8 }}>
					{/* Section Header */}
					<VStack textAlign='center' mb={16}>
						<Heading size='sm' fontWeight='light' color='gray.400' mb={2}>
							How it works
						</Heading>
						<Text
							fontSize={{ base: "2xl", md: "4xl" }}
							fontWeight='bold'
							lineHeight='1.2'>
							Just 3 easy steps to get <br />
							<Text as='span' color='teal.400'>
								everything you need
							</Text>
						</Text>
					</VStack>

					{/* Steps Grid */}
					<Grid
						templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
						gap={{ base: 6, md: 8 }}>
						<StepCard
							title='Get Registered'
							description='Get registered and get your identity'
							image='/steps/step-1.svg'
						/>
						<StepCard
							title='Talk Your Heart Out'
							description='Let your mind find peace by having unlimited chats'
							image='/steps/step-2.svg'
						/>
						<StepCard
							title='Step into a calmer happier you'
							description="You'll get the best response and solution"
							image='/steps/step-3.svg'
						/>
					</Grid>
				</Box>
			</Container>

			<Box
				backgroundImage="url('/bg_grid_lines_image.svg')"
				backgroundSize='cover'
				backgroundPosition='center'
				minH='100vh'>
				{/* Overlay to reduce opacity */}
				<Box
					position='absolute'
					top={0}
					left={0}
					width='100%'
					height='100%'
					bg='blackAlpha.700'
					zIndex={-1}
				/>

				{/* Features Section */}
				<FeaturesSection />

				{/* About Us Section */}
				<AboutUsSection />

				{/* Testimonial Section */}
				<TestimonialSection />

				{/* Pricing Section */}
				<Box position='relative' overflow='hidden'>
					<Image
						src='/tech_bg.svg'
						alt=''
						position='absolute'
						top={{ base: "10%", md: "20%" }}
						right='-10%'
						zIndex={-1}
						h={{ base: "100%", md: "90%" }}
					/>
					<Box minH='100vh' bg='#09090C' py={8} mb='96' id='pricing'>
						<VStack textAlign='center' spacing={4} mb={12}>
							<Heading
								textAlign='center'
								fontSize={{ base: "sm", md: "lg" }}
								fontWeight='light'
								color='gray.400'>
								Pricing
							</Heading>
							<Text
								textAlign='center'
								fontSize={{ base: "2xl", md: "4xl" }}
								fontWeight='bold'
								lineHeight='1.2'>
								Top-tier talent at competitive <br />
								<Text as='span' color='teal.400'>
									prices that set us apart.
								</Text>
							</Text>
						</VStack>
						<PricingCards pricingPlans={PRICING_PLANS} />
					</Box>
				</Box>

				{/* Blogs Section */}
				<BlogsSection />
			</Box>

			{/* Footer Section */}
			<Box bg='rgba(0, 24, 24, 0.95)' py={{ base: 12, md: 20 }}>
				<Container maxW='7xl'>
					<Grid
						templateColumns={{ base: "1fr", md: "1.25fr 1fr" }}
						gap={{ base: 8, md: 16 }}>
						{/* Left Column */}
						<Box>
							{/* Logo Section */}
							<Logo />

							{/* Description */}
							<Text color='gray.400' mb={8} maxW='400px'>
								Your Path to Peace of Mind Starts Here.
							</Text>

							{/* More About Us Link */}
							<Link
								color='white'
								fontSize='sm'
								position='relative'
								_after={{
									content: '""',
									position: "absolute",
									bottom: 2,
									right: -4,
									width: "8px",
									height: "8px",
									borderRadius: "full",
									bg: "white",
								}}>
								More about us
							</Link>

							{/* Social Icons */}
							<VStack align='flex-start' spacing={4} mt={16}>
								<HStack gap={2}>
									<IconButton
										aria-label='TikTok'
										variant='ghost'
										color='white'
										rounded='full'
										_hover={{ bg: "whiteAlpha.200" }}>
										<BiLogoTiktok
											style={{
												backgroundColor: "white",
												color: "black",
												padding: "10px",
												width: "40px",
												height: "40px",
												borderRadius: "100%",
											}}
										/>
									</IconButton>
									<IconButton
										aria-label='Instagram'
										variant='ghost'
										color='white'
										rounded='full'
										_hover={{ bg: "whiteAlpha.200" }}>
										<Image src='/icons/instagram_icon.svg' alt='Instagram' />
									</IconButton>
								</HStack>
							</VStack>
						</Box>

						{/* Right Column */}
						<Box>
							{/* Navigation Links */}
							<HStack
								gap={8}
								mb={4}
								justify={{ base: "center", md: "flex-start" }}
								flexWrap='wrap'>
								<Link
									color='gray.400'
									_hover={{ color: "white" }}
									href='#our-mission'
									fontSize={{ base: "sm", md: "md" }}>
									About.
								</Link>
								<Link
									color='gray.400'
									_hover={{ color: "white" }}
									href='#testimonials'
									fontSize={{ base: "sm", md: "md" }}>
									Testimonials.
								</Link>
								<Link
									color='gray.400'
									_hover={{ color: "white" }}
									href='#pricing'
									fontSize={{ base: "sm", md: "md" }}>
									Pricing.
								</Link>
							</HStack>

							{/* Contact Section */}
							<VStack align='flex-start' gap={8}>
								<Box>
									<Heading
										color='white'
										fontSize={{ base: "lg", md: "2xl" }}
										mb={4}>
										Contact Us
									</Heading>
									<Text color='gray.400'>+1 (999) 888-77-66</Text>
									<Text color='gray.400'>hello@mindhush.com</Text>
								</Box>
							</VStack>
						</Box>
					</Grid>

					{/* Copyright */}
					<VStack
						alignItems='center'
						justifyContent='center'
						gap={0}
						color='#8F9FA3'
						fontSize='sm'
						mt={16}>
						<Text>© {new Date().getFullYear()} — Copyright</Text>
						<Text ml={4}>All Rights reserved</Text>
					</VStack>
				</Container>
			</Box>
		</Box>
	);
};

export default LandingPage;
