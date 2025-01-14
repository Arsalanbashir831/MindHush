import React from "react";
import {
	Box,
	Container,
	Grid,
	Heading,
	Text,
	VStack,
	Image,
	Stack,
} from "@chakra-ui/react";

const FeatureCard = ({ icon, title, description }) => {
	return (
		<Box
			p={{ base: 4, md: 6 }}
			bg='#09090C'
			borderRadius='lg'
			boxShadow='0 4px 6px #754b9e'
			_hover={{
				transform: "scale(1.05)",
			}}
			transition='all 0.3s'>
			<Stack spacing={4} alignItems='flex-start'>
				<Image
					src={icon}
					alt={title}
					w={{ base: 6, md: 8 }}
					h={{ base: 6, md: 8 }}
					mb={4}
				/>
				<Heading
					size={{ base: "sm", md: "md" }}
					color='white'
					fontWeight='semibold'>
					{title}
				</Heading>
				<Text color='gray.400' fontSize={{ base: "xs", md: "sm" }}>
					{description}
				</Text>
			</Stack>
		</Box>
	);
};

export default function FeaturesSection() {
	const features = [
		{
			icon: "/medical-icon.png",
			title: "Empathy-Driven Technology",
			description:
				"Our AI isn't just smart - it's designed to understand and empathize, creating a human-like connection.",
		},
		{
			icon: "/medical-icon.png",
			title: "Evidence-Based Support",
			description:
				"Grounded in research, built for your peace of mind.",
		},
		{
			icon: "/medical-icon.png",
			title: "Always Accessible",
			description:
				"Available anytime, anywhere, providing consistent support for your mental health journey.",
		},
	];

	return (
		<Box py={{ base: 12, md: 16 }} minH='100vh' position='relative'>
			<Container maxW='6xl'>
				<VStack textAlign='center' gap={0} mb={8}>
					<Heading
						textAlign='center'
						fontSize={{ base: "sm", md: "lg" }}
						fontWeight='light'
						color='gray.400'>
						Features
					</Heading>
					<Text
						textAlign='center'
						fontSize={{ base: "2xl", md: "4xl" }}
						fontWeight='bold'
						lineHeight='1.2'>
						Why Us? <br />
						<Text as='span' color='teal.400'>
							Through your AI Companion
						</Text>
					</Text>
				</VStack>

				<Grid
					templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" }}
					gap={8}>
					<Image
						src='/stars_bg.svg'
						alt='Background Stars'
						position='absolute'
						top={-10}
						left='50%'
						transform='translate(-50%, -50%)'
						zIndex={-1}
						w={{ base: "80%", md: "50%" }}
						opacity={0.5}
					/>

					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</Grid>
			</Container>
		</Box>
	);
}
