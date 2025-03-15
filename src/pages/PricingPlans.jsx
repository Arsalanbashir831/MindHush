import React from "react";
import {
	Box,
	Container,
	Heading,
	Text,
	VStack,
	HStack,
	Separator,
	SimpleGrid,
} from "@chakra-ui/react";
import AuthButtons from "@/components/AuthButtons";
import PricingFeature from "@/components/PricingFeature";
import PricingCards from "@/components/PricingCards";
import { PRICING_PLANS } from "@/constants";
import Logo from "@/components/Logo";

const PricingPlans = () => {
	const features = [
		{
			text: "Unlimited Chat Windows",
			description: "Rest assured, you will get unlimited chat windows",
		},
		{
			text: "24/7 Priority Support",
			description:
				"Always here for you, day or night, to ensure your peace of mind",
		},
		{
			text: "Unlimited Token Usage",
			description: "Unlock the power unlimited chats with unlimited tokens",
		},
	];

	return (
		<Box height="100vh" overflowY="auto" bg="gray.900">
			<HStack
				justifyContent="space-between"
				alignItems="center"
				px={{
					base: 2,
					md: 8,
				}}
				py={2}>
				<Logo />
				<AuthButtons />
			</HStack>
			<Container maxW="breakpoint-xl" pt={8}>
				<VStack spaceY={8} mb={16}>
					<VStack>
						<Heading
							fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
							fontWeight="bold"
							color="white"
							textAlign="center"
							mb={3}>
							Pricing Plans
						</Heading>
						<Text
							fontSize={{ base: "sm", md: "md" }}
							color="gray.400"
							textAlign="center"
							maxW={450}>
							Want to get more out of Mind Hush? Subscribe to one of our
							professional plans.
						</Text>
					</VStack>

					<PricingCards pricingPlans={PRICING_PLANS} />

					<Box width="100%" mt={16}>
						<HStack mb={8}>
							<Text
								color="white"
								fontSize={{ base: "md", lg: "lg" }}
								fontWeight="bold"
								textWrap="nowrap"
								mr={6}>
								PREMIUM PACKAGE
							</Text>
							<Separator />
						</HStack>
						<SimpleGrid
							columns={{ base: 1, sm: 2, lg: 3 }}
							width="100%"
							gap={8}>
							{features.map((feature, index) => (
								<PricingFeature key={index} {...feature} />
							))}
						</SimpleGrid>
					</Box>
				</VStack>
			</Container>
		</Box>
	);
};

export default PricingPlans;
